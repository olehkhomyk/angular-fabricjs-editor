import { ElementRef } from '@angular/core';
import { CropperPosition, Dimensions, MoveStart } from '../interfaces';
import { CropperSettings } from '../interfaces/cropper.settings';
export declare class CropperPositionService {
    resetCropperPosition(sourceImage: ElementRef, cropperPosition: CropperPosition, settings: CropperSettings): void;
    move(event: any, moveStart: MoveStart, cropperPosition: CropperPosition): void;
    resize(event: any, moveStart: MoveStart, cropperPosition: CropperPosition, maxSize: Dimensions, settings: CropperSettings): void;
    checkAspectRatio(position: string, cropperPosition: CropperPosition, maxSize: Dimensions, settings: CropperSettings): void;
    getClientX(event: any): number;
    getClientY(event: any): number;
}
