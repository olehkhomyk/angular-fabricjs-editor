import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { fabric } from 'fabric';
import { IEvent } from 'fabric/fabric-impl';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-editor-fabric-js',
  templateUrl: './angular-editor-fabric-js.component.html',
  styleUrls: ['./angular-editor-fabric-js.component.css'],
})
export class FabricjsEditorComponent implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

  @Input()
  canvasWidth: number;

  @Input()
  canvasHeight: number;

  @Output()
  objectOutBorder = new EventEmitter();

  private canvas: fabric.Canvas;
  public props = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: null,
    textBgColor: null,
    TextDecoration: ''
  };

  public isObjectOutOfCanvas = false;
  public textString: string;
  public url: string | ArrayBuffer = '';
  public size: any = {
    width: 540,
    height: 810
  };

  public json: any;
  private globalEditor = false;
  public textEditor = false;
  private imageEditor = false;
  public figureEditor = false;
  public selected: any;

  constructor() { }

  ngAfterViewInit(): void {
    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.canvas.on('object:moving', (e) => {});
    this.canvas.on('object:modified', (e) => {});
    // this.canvas.on('object:moving', this.handleMoving);

    this.canvas.on('selection:updated', this.updateSelection.bind(this));
    this.canvas.on('selection:created', this.updateSelection.bind(this));
    this.canvas.on('selection:cleared', (e) => {
      this.selected = null;
      this.resetPanels();
    });

    this.canvas.on('object:modified', this.handleObjectOutCanvas.bind(this));

    this.canvas.setWidth(this.canvasWidth || this.size.width);
    this.canvas.setHeight(this.canvasHeight || this.size.height);

    // get references to the html canvas element & its context
    this.canvas.on('mouse:down', (e) => {
      const canvasElement: any = document.getElementById('canvas');
    });
  }

  setWidth(value: number): void {
    this.canvas.setWidth(value);
  }

  setHeight(value: number): void {
    this.canvas.setHeight(value);
  }

  updateSelection(e: IEvent): void {
    const selectedObject = e.target;

    this.selected = selectedObject;
    selectedObject.hasRotatingPoint = true;
    selectedObject.transparentCorners = false;
    selectedObject.borderOpacityWhenMoving = 1;

    selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';

    this.resetPanels();

    if (selectedObject.type !== 'group' && selectedObject) {

      this.getId();
      this.getOpacity();

      switch (selectedObject.type) {
        case 'rect':
        case 'circle':
        case 'triangle':
          this.figureEditor = true;
          this.getFill();
          break;
        case 'i-text':
          this.textEditor = true;
          this.getLineHeight();
          this.getCharSpacing();
          this.getBold();
          this.getFill();
          this.getTextDecoration();
          this.getTextAlign();
          this.getFontFamily();
          break;
        case 'image':
          break;
      }
    }
  }

  toJPEG(options = {}): any {
    return this.canvas.toDataURL({ format: 'image/jpeg', quality: 1.0, ...options });
  }

  toPNG(options = {}): any {
    return this.canvas.toDataURL({format: 'png',  quality: 1.0, ...options});
  }

  toJSON() {
    return JSON.stringify(this.canvas.toJSON());
  }

  /*------------------------Block elements------------------------*/

  // Block "Size"

  changeSize() {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  // Block "Add text"

  addText() {
    if (this.textString) {
      const text = new fabric.IText(this.textString, {
        left: 10,
        top: 10,
        fontFamily: 'helvetica',
        textBackgroundColor: null,
        angle: 0,
        fill: '#000000',
        scaleX: 0.5,
        scaleY: 0.5,
        fontWeight: '',
        hasRotatingPoint: true
      });

      this.extend(text, this.randomId());
      this.canvas.add(text);
      this.selectItemAfterAdded(text);
      this.textString = '';
    }
  }

  // Block "Add images"
  getImgPolaroid(event: any) {
    const el = event.target;
    fabric.loadSVGFromURL(el.src, (objects, options) => {
      const image = fabric.util.groupSVGElements(objects, options);
      image.set({
        left: 10,
        top: 10,
        angle: 0,
        padding: 10,
        cornerSize: 10,
        hasRotatingPoint: true,
      });
      this.extend(image, this.randomId());
      this.canvas.add(image);
      this.selectItemAfterAdded(image);
    });
  }

  // Block "Upload Image"
  addImageOnCanvas(url, size: any = { width: 200, height: 200 }) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true
        });
        image.scaleToWidth(size.width);
        image.scaleToHeight(size.height);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.url = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  setBackgroundFile(event, callback?: () => void) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = (readerEvent) => {
        const data: any = readerEvent.target.result;

        fabric.Image.fromURL(data,
          (img) => {
          // add background image
            this.canvas.setBackgroundImage(img, () => {
              this.canvas.renderAll();
              callback();
            },
              {
            scaleX: this.size.width / img.width,
            scaleY: this.size.height / img.height
          });
        });
      };
      reader.readAsDataURL(file);
    }
  }

  setBackgroundImageRx(data, options: any = {}): Observable<fabric.Image> {
    return new Observable((observer) => {
      fabric.Image.fromURL(data,
        (img) => {
          // add background image
          this.canvas.setBackgroundImage(img, () => {
              this.canvas.renderAll();
              observer.next(img);
              observer.complete();
            },
            {
              scaleX: this.size.width / img.width,
              scaleY: this.size.height / img.height,
              ...options
            });
        }
      );
    });
  }

  removeWhite(url) {
    this.url = '';
  }

  // Block "Add figure"
  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#ff5722'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/

  cleanSelect() {
    this.canvas.discardActiveObject().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.setBackgroundColor(null, () => {
        this.canvas.backgroundColor = this.props.canvasFill;
        this.canvas.renderAll();
      });
    }
  }

  extend(obj, id) {
    obj.toObject = ((toObject) => {
      return function() {
        return fabric.util.object.extend(toObject.call(this), {
          id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage(image = this.props.canvasImage) {
    const self = this;
    if (image) {
      this.canvas.setBackgroundColor(new fabric.Pattern({ source: image, repeat: 'no-repeat' }), () => {
        self.props.canvasFill = '';

        setTimeout(() => {
          self.canvas.renderAll();
        }, 300);
      });
    }
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) { return ''; }

    if (object.getSelectionStyles && object.isEditing) {
      return (object.getSelectionStyles()[styleName] || '');
    } else {
      return (object[styleName] || '');
    }
  }

  setActiveStyle(styleName, value: string | number, object: fabric.IText) {
    object = object || this.canvas.getActiveObject() as fabric.IText;
    if (!object) { return; }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;

      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({underline: true});
        } else {
          object.setSelectionStyles({underline: false});
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({overline: true});
        } else {
          object.setSelectionStyles({overline: false});
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({linethrough: true});
        } else {
          object.setSelectionStyles({linethrough: false});
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();

    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
        object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  getActiveProp(name) {
    const object = this.canvas.getActiveObject();
    if (!object) { return ''; }

    return object[name] || '';
  }

  setActiveProp(name, value) {
    const object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getId() {
    this.props.id = this.canvas.getActiveObject().toObject().id;
  }

  setId() {
    const val = this.props.id;
    const complete = this.canvas.getActiveObject().toObject();
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  setTextBgColor() {
    this.setActiveStyle('textBackgroundColor', this.props.textBgColor, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    if (this.props.fontStyle) {
      this.setActiveStyle('fontStyle', 'italic', null);
    } else {
      this.setActiveStyle('fontStyle', 'normal', null);
    }
  }

  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }

  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    this.setActiveProp('fontFamily', this.props.fontFamily);
  }

  /*System*/
  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
  }

  bringToFront() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }

  sendToBack() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }

  confirmClear(callback?: () => void) {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
      this.canvas.renderAll();

      if (callback) {
        callback();
      }
    }
  }

  clear() {
    this.canvas.clear();
  }

  rasterize() {
    const image = new Image();
    image.src = this.canvas.toDataURL({format: 'png'});
    const w = window.open('');
    w.document.write(image.outerHTML);
  }

  rasterizeSVG() {
    const w = window.open('');
    w.document.write(this.canvas.toSVG());
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG());
  }

  loadCanvasFromJSON(jsonData, callback?: () => void) {
    // and load everything from the same json
    this.canvas.loadFromJSON(jsonData, () => {

      // making sure to render canvas at the end
      this.canvas.renderAll();

      if (callback) {
        callback();
      }
    });

  }

  rasterizeJSON(): any {
    return this.json = JSON.stringify(this.canvas, null, 2);
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }

  renderAll(): void {
    this.canvas.renderAll();
  }

  handleObjectOutCanvas(e): void {
    const obj = e.target;
    const boundingRect = obj.getBoundingRect(true);
    if (boundingRect.left < 0
      || boundingRect.top < 0
      || boundingRect.left + boundingRect.width > this.canvas.getWidth()
      || boundingRect.top + boundingRect.height > this.canvas.getHeight()) {
      this.objectOutBorder.emit();
      this.isObjectOutOfCanvas = true;
    } else {
      this.isObjectOutOfCanvas = false;
    }
  }

  private handleMoving(e): void {
    const obj = e.target;

    // if object is too big ignore
    if (obj.getScaledHeight() > obj.canvas.height || obj.getScaledWidth() > obj.canvas.width) {
      return;
    }

    obj.setCoords();
    // top-left  corner
    if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
      obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
      obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    }

    // bot-right corner
    if (obj.getBoundingRect().top + obj.getBoundingRect().height  > obj.canvas.height
      || obj.getBoundingRect().left + obj.getBoundingRect().width  > obj.canvas.width) {
      obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
      obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
    }
  }
}
