import { fabric } from 'fabric';
import { Observable } from 'rxjs';

/**
 * Canvas to present images, combination of another canvas...
 */
export class PresentationCanvas {
  canvas: fabric.Canvas;
  size = {
    width: 540,
    height: 810
  };

  constructor(options: any = {}) {
    const canvas = document.createElement('canvas');

    this.size.width = options.width || this.size.width;
    this.size.height = options.height || this.size.height;

    this.canvas = new fabric.Canvas(canvas, {
      selection: false
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  /**
   * Convert canvas to JPEG.
   *
   * @param options converting options.
   */
  toJPEG(options = {}): any {
    return this.canvas.toDataURL({ format: 'image/jpeg', quality: 1.0, ...options });
  }


  /**
   * Convert canvas to PNG.
   *
   * @param options converting options.
   */
  toPNG(options = {}): any {
    return this.canvas.toDataURL({format: 'png', quality: 1.0, ...options});
  }

  /**
   *
   * @param data Image Data.
   */
  loadImage(data: any): Observable<any> {
    return new Observable((observer) => {
      fabric.Image.fromURL(data, (img) => {
        observer.next(img);
      });
    });
  }

  /**
   * Set Main Image to Canvas.
   */
  setCanvasImageBase64(data: string, options: any = {}): Observable<any> {
    return new Observable((observer) => {
      fabric.Image.fromURL(data, (img) => {
        // add background image
        this.canvas.setBackgroundImage(img, () => {
          this.canvas.renderAll();
          observer.next();
        }, {
          scaleX: this.size.width / img.width,
          scaleY: this.size.height / img.height,
          ...options
        });

      });
    });
  }

  setCanvasImage(image: any, options: any = {}): Observable<fabric.Image> {
    return new Observable((observer) => {
      this.canvas.setBackgroundImage(image, () => {
        this.canvas.renderAll();
        observer.next();
      }, {
        scaleX: this.size.width / image.width,
        scaleY: this.size.height / image.height,
        ...options
      });
    });
  }

  /**
   * Set background to canvas.
   *
   * @param source image source ().
   */
  setCanvasBackground(source: any): Observable<any> {
    return new Observable((observer) => {
      this.canvas.setBackgroundColor(
        new fabric.Pattern({ source, repeat: 'no-repeat' }),
        () => {
          setTimeout(() => {
            this.canvas.renderAll();
            observer.next();
          }, 300);
        }
      );
    });
  }
}
