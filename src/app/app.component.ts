import { isNil } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FabricjsEditorComponent } from 'projects/angular-editor-fabric-js/src/public-api';
import photos from '../assets/data/photos.json';
import { PresentationCanvas } from './helpers/presentation-canvas';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { downloadImage, downloadJSON,
  downloadPDF } from './helpers/file';
import { icons, imageToPdfConfig } from './helpers/config';
import { MatDialog } from '@angular/material/dialog';
import { CropperModalComponent } from './cropper-modal/cropper-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public backgroundList: Array<{Name: string, FileName: string, Key: string, Active: boolean}>;
  public customImage: any;
  public mainImage: any = null;

  public isBgListDisplayed = false;
  public isBgOptionsDisplayed = false;
  public isStickerListDisplayed = false;
  public isFigureDisplayed = false;
  public isIconsDisplayed = false;
  public convertWidth = 2400;
  public convertHeight = 3600;
  public size = {
    width: 540,
    height: 810
  };
  public presentationCanvasSize = {
    width: 500,
    height: 770
  };

  public get isExportDisabled(): boolean {
    return (this.personalizationCanvas && this.personalizationCanvas.isObjectOutOfCanvas) || false;
  }

  public get isCropperDisabled(): boolean {
    return isNil(this.mainImage);
  }

  public iconList: Array<any>;

  @ViewChild('canvas', {static: false}) canvas: FabricjsEditorComponent;
  @ViewChild('personalizationCanvas', {static: false}) personalizationCanvas: FabricjsEditorComponent;


  constructor(public dialog: MatDialog) {
    this.backgroundList = photos.PhotoBackgrounds.filter(({Active}) => Active);
    this.iconList = icons();
  }

  ngOnInit() {
  }

  handleObjectOutBorder(): void {
    alert('Element beyond the editing area, please move the element inside!');
  }

  /**
   * Prepare full size canvas.
   */
  prepareFullCanvas(): Observable<any> {
    // Initialize presentation Canvas.
    const canvas = new PresentationCanvas({width: this.convertWidth, height: this.convertHeight});
    // Calculate multipliers for presentation and image canvas.
    const multiplier = (this.convertWidth / this.size.width);
    const personalizationMultiplier = ((multiplier * this.presentationCanvasSize.width) / (this.size.width));

    // Get both canvas as images.
    const bgPng = this.canvas.toPNG({multiplier});
    const personalizationPng = this.personalizationCanvas.toPNG({
      multiplier: personalizationMultiplier
    });

    return canvas.setCanvasBackground(bgPng)
      .pipe(
        switchMap(() => canvas.loadImage(personalizationPng)),
        switchMap((image) => canvas.setCanvasImage(image, {
          left: ((this.convertWidth - image.width) / 2),
          top: ((this.convertHeight - image.height) / 2),
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
    this.personalizationCanvas.cleanSelect();

    const imageData = this.personalizationCanvas.toPNG({
      multiplier: (this.convertWidth / this.canvas.size.width)
    });

    downloadImage(imageData, 'personalization');
  }


  /**
   * Export personalization to PDF.
   */
  exportPersonalizationToPDF(): void {
    this.personalizationCanvas.cleanSelect();

    const imageData = this.personalizationCanvas.toPNG({
      multiplier: (this.convertWidth / this.size.width)
    });

    downloadPDF({
      ...imageToPdfConfig,
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
   * Get background image path.
   *
   * @param key Image key.
   * @param fullSize if true than full size of picture.
   */
  getBackgroundPath(key: string, fullSize: boolean = false): string {
    return `../assets/backgrounds/${key}_${fullSize ? 'medium' : 'thumb'}.jpg`;
  }

  /**
   * Get background image path.
   *
   * @param name Icon name.
   */
  getIconPath(name: string): string {
    return `../assets/icons/${name}.png`;
  }

  /**
   * Set background image to canvas.
   *
   * @param key background image key.
   */
  setBackgroundImage(key: string): void {
    const image = this.getBackgroundPath(key, true);
    this.canvas.setCanvasImage(image);
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

  public rasterize() {
    this.canvas.rasterize();
  }

  public rasterizeSVG() {
    this.canvas.rasterizeSVG();
  }

  public confirmClear() {
    this.canvas.confirmClear(() => {
      this.customImage = null;
      this.mainImage = null;
      this.personalizationCanvas.clear();
      this.personalizationCanvas.renderAll();
    });
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

  public openCropperModal(imageData: any): any {
    return this.dialog.open(CropperModalComponent, {
      data: {
        imageData
      },
      width: '60vh',
      height: '90vh'
    });
  }

  /**
   * Set main image with cropper.
   * @param event Cropper Event.
   */
  public setMainImageRX(event): void {
    this.openCropperModal(event).afterClosed().pipe(
      switchMap((imageBase64) => this.canvas.setBackgroundImageRx(imageBase64)),
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
        switchMap((data) => this.canvas.setBackgroundImageRx(data)),
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
