import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { defaultRatio, ratios } from '../helpers/ratio';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.component.html',
  styleUrls: ['./cropper-modal.component.scss']
})
export class CropperModalComponent implements OnInit {
  imageChangedEvent: any = null;
  imageBase64: any = null;
  imageFile: any = null;
  croppedImage: any = '';
  isCropperReady = false;
  isImageLoaded = false;
  ratioList = ratios();
  selectedRatio = defaultRatio().value;

  public get isSaveAvailable(): boolean {
    return !!this.croppedImage;
  }

  public get isLoading(): boolean {
    return  !this.isCropperReady && !this.isImageLoaded;
  }

  constructor(public dialogRef: MatDialogRef<CropperModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.imageData instanceof Event) {
      this.imageChangedEvent = this.data.imageData;
    } else if (this.data.imageData instanceof File) {
      this.imageFile = this.data.imageData;
    } else if (this.data.imageData instanceof String) {
      this.imageBase64 = this.data.imageData;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: any) {
    this.isImageLoaded = true;
  }

  cropperReady() {
    // cropper ready
    this.isCropperReady = true;
  }

  loadImageFailed() {
    // show message
  }

  cropAndClose(): void {
    this.dialogRef.close({
      imageData: this.croppedImage,
      ratio: this.selectedRatio
    });
  }
}
