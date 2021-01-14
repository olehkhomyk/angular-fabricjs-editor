import { isNil, isEmpty } from 'lodash';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/angular-editor-fabric-js/src/public-api';
import photos from '../assets/data/photos.json';
import { PresentationCanvas } from './classes/presentation-canvas';
import { map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { downloadImage, downloadJSON,
  downloadPDF } from './helpers/file';
import { icons, imageToPdfConfig } from './helpers/config';
import { MatDialog } from '@angular/material/dialog';
import { CropperModalComponent } from './cropper-modal/cropper-modal.component';
import { getBackgroundPath } from './helpers/file';
import {
  calculatePrintSize,
  defaultPersonalizationSize,
  mainCanvasWidth,
  getMainCanvasSizeByRatio,
  getPersonalizationCanvasSize,
  exportedPersonalizationReduction, calculateFormat,
} from './helpers/size';
import { defaultAspectRatio } from './helpers/ratio';
import { BgItem } from './interface/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public backgroundList: Array<BgItem>;
  public customImage: any;
  public mainImage: any = null;

  // Sections visibility states.
  public isBgListDisplayed = false;
  public isBgOptionsDisplayed = false;
  public isStickerListDisplayed = false;
  public isFigureDisplayed = false;
  public isIconsDisplayed = false;

  // JUST FOR EXPORTING.
  public size = {
    width: 540,
    height: 810
  };

  // FOR EXPORTING AND BINDING.
  public presentationCanvasSize = defaultPersonalizationSize;

  public get isExportDisabled(): boolean {
    return (this.personalizationCanvas && this.personalizationCanvas.objectIsOutOfCanvas) || false;
  }

  public get isCropperDisabled(): boolean {
    return isNil(this.mainImage);
  }

  public iconList: Array<any>;

  public personalizationCanvasStyles: any = {};

  private ratio: number = defaultAspectRatio;

  @ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;
  @ViewChild('personalizationCanvas', {static: false}) personalizationCanvas: FabricjsEditorComponent;

  constructor(public dialog: MatDialog) {
    this.backgroundList = photos.PhotoBackgrounds
      .filter(({Active}) => Active)
      .map((item) => ({...item, path: getBackgroundPath(item.Key), fullSizePath: getBackgroundPath(item.Key, true)}));

    this.iconList = icons();
  }

  ngOnInit() {
    // Some logic must be here.
  }

  ngAfterViewInit() {
    this.updatePersonalizationCanvasOffsets();
    this.personalizationCanvas.onObjectOutOfBorder.subscribe(this.handleObjectOutBorder);
  }

  updatePersonalizationCanvasOffsets(): void {
    const topOffset = (this.canvas.size.height - this.personalizationCanvas.size.height) / 2;
    const leftOffset = (this.canvas.size.width - this.personalizationCanvas.size.width) / 2;

    const style = {
      top: `${topOffset}px`,
      left: `${leftOffset}px`
    };

    this.personalizationCanvasStyles = {
      ...style
    };
  }

  /**
   * Update canvases sizes belong to ratio.
   *
   * @param ratio Ratio.
   */
  private updateCanvasesSize(ratio: number): void {
    this.ratio = ratio;

    const mainCanvasSize = getMainCanvasSizeByRatio(ratio);
    const personalizationCanvasSize = getPersonalizationCanvasSize(mainCanvasSize);

    this.canvas.size.width = mainCanvasSize.width;
    this.canvas.size.height = mainCanvasSize.height;

    this.personalizationCanvas.size.width = personalizationCanvasSize.width;
    this.personalizationCanvas.size.height = personalizationCanvasSize.height;

    this.canvas.changeSize();
    this.personalizationCanvas.changeSize();

    this.updatePersonalizationCanvasOffsets();
  }

  handleObjectOutBorder(): void {
    alert('Element beyond the editing area, please move the element inside!');
  }

  /**
   * Expand and collapse Stickers section.
   */
  toggleStickerList(): void {
    this.isStickerListDisplayed = !this.isStickerListDisplayed;
  }

  /**
   * Expand and collapse Shapes section.
   */
  toggleFigureList(): void {
    this.isFigureDisplayed = !this.isFigureDisplayed;
  }

  /**
   * Expand and collapse Shapes section.
   */
  toggleIconList(): void {
    this.isIconsDisplayed = !this.isIconsDisplayed;
  }

  /**
   * Expand and collapse Background options section.
   */
  toggleBgOptions(): void {
    this.isBgOptionsDisplayed = !this.isBgOptionsDisplayed;
  }

  /**
   * Expand and collapse Backgrounds section.
   */
  toggleBgList(): void {
    this.isBgListDisplayed = !this.isBgListDisplayed;
  }

  /**
   * Clear all canvases.
   */
  public confirmClear() {
    this.canvas.confirmClear(() => {
      this.customImage = null;
      this.mainImage = null;
      this.personalizationCanvas.clear();
      this.personalizationCanvas.renderAll();
    });
  }

  public openCropperModal(imageData: any): any {
    return this.dialog.open(CropperModalComponent, {
      data: {
        imageData,
        ratio: this.ratio
      },
      width: '60vh',
      height: '90vh'
    });
  }

  /**
   * Prepare full size canvas.
   */
  prepareFullCanvas(): Observable<any> {
    const { width, height } = calculatePrintSize(this.ratio);

    // Initialize presentation Canvas.
    const canvas = new PresentationCanvas({width, height});

    // Calculate multiplier for main canvas.
    const multiplier = (width / mainCanvasWidth);

    // Calculate multipliers for personalization canvas.
    const personalizationMultiplier = multiplier - (multiplier * (exportedPersonalizationReduction / 8));

    // Get both canvas as images.
    const bgPng = this.canvas.toPNG({multiplier});
    const personalizationPng = this.personalizationCanvas.toPNG({
      multiplier: personalizationMultiplier
    });

    // Set two images on presentation canvas and convert it to png, for next steps.
    return canvas.setCanvasBackground(bgPng)
    .pipe(
      switchMap(() => canvas.loadImage(personalizationPng)),
      switchMap((image) => canvas.setCanvasImage(image, {
        left: (width - image.width) / 2,
        top: (height - image.height) / 2,
        scaleX: 1,
        scaleY: 1
      })),
      map(() => canvas.toPNG()),
      take(1)
    );
  }

  /**
   * Export full size canvas to PNG.
   */
  exportFullCanvasToPNG(): void {
    this.personalizationCanvas.cleanSelect();

    this.prepareFullCanvas()
    .pipe(
      tap((canvasPNG) => {
        downloadImage(canvasPNG, 'personalized_photo');
      })
    ).subscribe();
  }

  /**
   * Export full size canvas to PDF.
   */
  exportFullCanvasToPDF(): void {
    this.prepareFullCanvas()
    .pipe(
      tap((canvasPNG) => {
        downloadPDF({
          ...imageToPdfConfig,
          format: calculateFormat(this.ratio),
          imageData: canvasPNG,
          fileName: 'personalized_photo',
        });
      })
    ).subscribe();
  }

  /**
   * Export personalization to PNG.
   */
  exportPersonalizationToPNG(): void {
    /*const { width } = calculatePrintSize(this.ratio);
    const multiplier = (width / mainCanvasWidth);

    this.personalizationCanvas.cleanSelect();

    const imageData = this.personalizationCanvas.toPNG({multiplier});

    downloadImage(imageData, 'personalization');*/

    this.personalizationCanvas.updateObjectPosition();
  }

  /**
   * Export personalization to PDF.
   */
  exportPersonalizationToPDF(): void {
    const { width } = calculatePrintSize(this.ratio);
    const multiplier = (width / mainCanvasWidth);

    this.personalizationCanvas.cleanSelect();

    const imageData = this.personalizationCanvas.toPNG({multiplier});

    downloadPDF({
      ...imageToPdfConfig,
      format: calculateFormat(this.ratio),
      imageData,
      fileName: 'personalization',
    });
  }

  /**
   * Export personalization to JSON.
   */
  exportPersonalizationToJSON(): void {
    const data = this.personalizationCanvas.toJSON();
    window.localStorage.setItem('canvas', data);

    downloadJSON(data, 'personalization');
  }

  // ------- Canvases configuration -------.

  // Main Canvas.

  /**
   * Set background image to canvas.
   *
   * @param path background image path.
   */
  setBackgroundImage(path: string): void {
    this.canvas.setCanvasImage(path);
  }

  /**
   * Set custom background.
   */
  public setCustomBgImage() {
    this.canvas.setCanvasImage(this.customImage);
  }

  /**
   * Clear custom background.
   */
  public clearCustomBgImage() {
    this.customImage = null;
    this.canvas.setCanvasImage();
  }

  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public changeSize() {
    this.canvas.changeSize();
  }

  public readUrl(event) {
    this.canvas.readUrl(event);
  }

  public setMainImage(event) {
    this.canvas.setBackgroundFile(event, () => {
      event.target.value = '';
    });
  }

  /**
   * Upload custom background image.
   *
   * @param event input file event.
   */
  uploadCustomBgImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.customImage = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Set main image with cropper.
   * @param event Cropper Event.
   */
  public setMainImageRX(event): void {
    this.openCropperModal(event).afterClosed().pipe(
      skipWhile(data => isEmpty(data)),
      tap(({ratio}) => {
        if (this.ratio !== ratio) {
          this.updateCanvasesSize(ratio);
          this.personalizationCanvas.moveObjectsInsideTheCanvas();
        }
      }),
      switchMap(({ imageData }) => this.canvas.setBackgroundImageRx(imageData)),
      tap(() => {
        if (event.target.files && event.target.files[0]) {
          this.mainImage = event.target.files[0];
        }
        event.target.value = '';
      }),
      take(1)
    ).subscribe();
  }

  cropMainImage(): void {
    if (!!this.mainImage) {
      this.openCropperModal(this.mainImage).afterClosed().pipe(
        skipWhile(data => isEmpty(data)),
        tap(({ratio}) => {
          if (this.ratio !== ratio) {
            this.updateCanvasesSize(ratio);
            this.personalizationCanvas.moveObjectsInsideTheCanvas();
          }
        }),
        switchMap(({ imageData, ratio }) => this.canvas.setBackgroundImageRx(imageData)),
        take(1)
      ).subscribe();
    }
  }

  public removeWhite(url) {
    this.canvas.removeWhite(url);
  }

  public setId() {
    this.canvas.setId();
  }

  public setCanvasFill() {
    this.canvas.props.canvasImage = null;
    this.canvas.setCanvasFill();
  }

  // Personalization Canvas.

  /**
   * Upload and apply JSON personalization to canvas.
   *
   * @param event Input File Event.
   */
  loadPersonalizationFromJson(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent: any) => {
        const data = JSON.parse(readerEvent.target.result);
        this.personalizationCanvas.loadCanvasFromJSON(data);
        event.target.value = '';
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  public cleanSelect() {
    this.personalizationCanvas.cleanSelect();
  }

  public bringToFront() {
    this.personalizationCanvas.bringToFront();
  }

  public sendToBack() {
    this.personalizationCanvas.sendToBack();
  }

  public clone() {
    this.personalizationCanvas.clone();
  }

  public setFill() {
    this.personalizationCanvas.setFill();
  }

  public setTextBgColor() {
    this.personalizationCanvas.setTextBgColor();
  }

  public addText() {
    this.personalizationCanvas.addText();
  }

  public getImgPolaroid(event) {
    this.personalizationCanvas.getImgPolaroid(event);
  }

  public addImageOnCanvas(url) {
    this.personalizationCanvas.addImageOnCanvas(url);
  }

  public addIconOnCanvas(event) {
    this.personalizationCanvas.addImageOnCanvas(event.target.src, {width: 100, height: 100});
  }

  public addFigure(figure) {
    this.personalizationCanvas.addFigure(figure);
  }

  public removeSelected() {
    this.personalizationCanvas.removeSelected();
  }

  public setOpacity() {
    this.personalizationCanvas.setOpacity();
  }

  public setFontFamily() {
    this.personalizationCanvas.setFontFamily();
  }

  public setTextAlign(value) {
    this.personalizationCanvas.setTextAlign(value);
  }

  public setBold() {
    this.personalizationCanvas.setBold();
  }

  public setFontStyle() {
    this.personalizationCanvas.setFontStyle();
  }

  public hasTextDecoration(value) {
    this.personalizationCanvas.hasTextDecoration(value);
  }

  public setTextDecoration(value) {
    this.personalizationCanvas.setTextDecoration(value);
  }

  public setFontSize() {
    this.personalizationCanvas.setFontSize();
  }

  public setLineHeight() {
    this.personalizationCanvas.setLineHeight();
  }

  public setCharSpacing() {
    this.personalizationCanvas.setCharSpacing();
  }

  public rasterizeJSON() {
    this.canvas.rasterizeJSON();
  }
}
