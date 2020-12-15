/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/cropper-position.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CropperPositionService {
    /**
     * @param {?} sourceImage
     * @param {?} cropperPosition
     * @param {?} settings
     * @return {?}
     */
    resetCropperPosition(sourceImage, cropperPosition, settings) {
        /** @type {?} */
        const sourceImageElement = sourceImage.nativeElement;
        if (settings.cropperStaticHeight && settings.cropperStaticWidth) {
            cropperPosition.x1 = 0;
            cropperPosition.x2 = sourceImageElement.offsetWidth > settings.cropperStaticWidth ?
                settings.cropperStaticWidth : sourceImageElement.offsetWidth;
            cropperPosition.y1 = 0;
            cropperPosition.y2 = sourceImageElement.offsetHeight > settings.cropperStaticHeight ?
                settings.cropperStaticHeight : sourceImageElement.offsetHeight;
        }
        else {
            /** @type {?} */
            const cropperWidth = Math.min(settings.cropperScaledMaxWidth, sourceImageElement.offsetWidth);
            /** @type {?} */
            const cropperHeight = Math.min(settings.cropperScaledMaxHeight, sourceImageElement.offsetHeight);
            if (!settings.maintainAspectRatio) {
                cropperPosition.x1 = 0;
                cropperPosition.x2 = cropperWidth;
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
            }
            else if (cropperWidth / settings.aspectRatio < cropperHeight) {
                cropperPosition.x1 = 0;
                cropperPosition.x2 = cropperWidth;
                /** @type {?} */
                const cropperHeightWithAspectRatio = cropperWidth / settings.aspectRatio;
                cropperPosition.y1 = (sourceImageElement.offsetHeight - cropperHeightWithAspectRatio) / 2;
                cropperPosition.y2 = cropperPosition.y1 + cropperHeightWithAspectRatio;
            }
            else {
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
                /** @type {?} */
                const cropperWidthWithAspectRatio = cropperHeight * settings.aspectRatio;
                cropperPosition.x1 = (sourceImageElement.offsetWidth - cropperWidthWithAspectRatio) / 2;
                cropperPosition.x2 = cropperPosition.x1 + cropperWidthWithAspectRatio;
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @return {?}
     */
    move(event, moveStart, cropperPosition) {
        /** @type {?} */
        const diffX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        const diffY = this.getClientY(event) - moveStart.clientY;
        cropperPosition.x1 = moveStart.x1 + diffX;
        cropperPosition.y1 = moveStart.y1 + diffY;
        cropperPosition.x2 = moveStart.x2 + diffX;
        cropperPosition.y2 = moveStart.y2 + diffY;
    }
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    resize(event, moveStart, cropperPosition, maxSize, settings) {
        /** @type {?} */
        const moveX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        const moveY = this.getClientY(event) - moveStart.clientY;
        switch (moveStart.position) {
            case 'left':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                break;
            case 'topleft':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'top':
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'topright':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'right':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                break;
            case 'bottomright':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'bottom':
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'bottomleft':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'center':
                /** @type {?} */
                const scale = event.scale;
                /** @type {?} */
                const newWidth = Math.min(Math.max(settings.cropperScaledMinWidth, (Math.abs(moveStart.x2 - moveStart.x1)) * scale), settings.cropperScaledMaxWidth);
                /** @type {?} */
                const newHeight = Math.min(Math.max(settings.cropperScaledMinHeight, (Math.abs(moveStart.y2 - moveStart.y1)) * scale), settings.cropperScaledMaxHeight);
                cropperPosition.x1 = moveStart.clientX - newWidth / 2;
                cropperPosition.x2 = moveStart.clientX + newWidth / 2;
                cropperPosition.y1 = moveStart.clientY - newHeight / 2;
                cropperPosition.y2 = moveStart.clientY + newHeight / 2;
                if (cropperPosition.x1 < 0) {
                    cropperPosition.x2 -= cropperPosition.x1;
                    cropperPosition.x1 = 0;
                }
                else if (cropperPosition.x2 > maxSize.width) {
                    cropperPosition.x1 -= (cropperPosition.x2 - maxSize.width);
                    cropperPosition.x2 = maxSize.width;
                }
                if (cropperPosition.y1 < 0) {
                    cropperPosition.y2 -= cropperPosition.y1;
                    cropperPosition.y1 = 0;
                }
                else if (cropperPosition.y2 > maxSize.height) {
                    cropperPosition.y1 -= (cropperPosition.y2 - maxSize.height);
                    cropperPosition.y2 = maxSize.height;
                }
                break;
        }
        if (settings.maintainAspectRatio) {
            this.checkAspectRatio(moveStart.position, cropperPosition, maxSize, settings);
        }
    }
    /**
     * @param {?} position
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    checkAspectRatio(position, cropperPosition, maxSize, settings) {
        /** @type {?} */
        let overflowX = 0;
        /** @type {?} */
        let overflowY = 0;
        switch (position) {
            case 'top':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'bottom':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : (overflowX / settings.aspectRatio);
                }
                break;
            case 'topleft':
                cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(0 - cropperPosition.x1, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x1 += (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'topright':
                cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(0 - cropperPosition.x1, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x1 += (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'center':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                /** @type {?} */
                const overflowX1 = Math.max(0 - cropperPosition.x1, 0);
                /** @type {?} */
                const overflowX2 = Math.max(cropperPosition.x2 - maxSize.width, 0);
                /** @type {?} */
                const overflowY1 = Math.max(cropperPosition.y2 - maxSize.height, 0);
                /** @type {?} */
                const overflowY2 = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX1 > 0 || overflowX2 > 0 || overflowY1 > 0 || overflowY2 > 0) {
                    cropperPosition.x1 += (overflowY1 * settings.aspectRatio) > overflowX1 ? (overflowY1 * settings.aspectRatio) : overflowX1;
                    cropperPosition.x2 -= (overflowY2 * settings.aspectRatio) > overflowX2 ? (overflowY2 * settings.aspectRatio) : overflowX2;
                    cropperPosition.y1 += (overflowY2 * settings.aspectRatio) > overflowX2 ? overflowY2 : overflowX2 / settings.aspectRatio;
                    cropperPosition.y2 -= (overflowY1 * settings.aspectRatio) > overflowX1 ? overflowY1 : overflowX1 / settings.aspectRatio;
                }
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getClientX(event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX) || 0;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getClientY(event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY) || 0;
    }
}
CropperPositionService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ CropperPositionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CropperPositionService_Factory() { return new CropperPositionService(); }, token: CropperPositionService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci1wb3NpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWNyb3BwZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY3JvcHBlci1wb3NpdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLdkQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7OztJQUVqQyxvQkFBb0IsQ0FBQyxXQUF1QixFQUFFLGVBQWdDLEVBQUUsUUFBeUI7O2NBQ2pHLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxhQUFhO1FBQ3BELElBQUksUUFBUSxDQUFDLG1CQUFtQixJQUFJLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMvRCxlQUFlLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QixlQUFlLENBQUMsRUFBRSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDakYsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7WUFDL0QsZUFBZSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkIsZUFBZSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ25GLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1NBQ2xFO2FBQU07O2tCQUNDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7O2tCQUN2RixhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1lBQ2hH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QVEsQ0FBQyxXQUFXLENBQUM7aUJBQ3pIO2dCQUNELE1BQU07U0FDVDtJQUNILENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQVU7UUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0YsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDOzs7WUFoTkYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENyb3BwZXJQb3NpdGlvbiwgRGltZW5zaW9ucywgTW92ZVN0YXJ0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDcm9wcGVyU2V0dGluZ3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Nyb3BwZXIuc2V0dGluZ3MnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDcm9wcGVyUG9zaXRpb25TZXJ2aWNlIHtcblxuICByZXNldENyb3BwZXJQb3NpdGlvbihzb3VyY2VJbWFnZTogRWxlbWVudFJlZiwgY3JvcHBlclBvc2l0aW9uOiBDcm9wcGVyUG9zaXRpb24sIHNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2VJbWFnZUVsZW1lbnQgPSBzb3VyY2VJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChzZXR0aW5ncy5jcm9wcGVyU3RhdGljSGVpZ2h0ICYmIHNldHRpbmdzLmNyb3BwZXJTdGF0aWNXaWR0aCkge1xuICAgICAgY3JvcHBlclBvc2l0aW9uLngxID0gMDtcbiAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiA9IHNvdXJjZUltYWdlRWxlbWVudC5vZmZzZXRXaWR0aCA+IHNldHRpbmdzLmNyb3BwZXJTdGF0aWNXaWR0aCA/XG4gICAgICAgIHNldHRpbmdzLmNyb3BwZXJTdGF0aWNXaWR0aCA6IHNvdXJjZUltYWdlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IDA7XG4gICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBzb3VyY2VJbWFnZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ID4gc2V0dGluZ3MuY3JvcHBlclN0YXRpY0hlaWdodCA/XG4gICAgICAgIHNldHRpbmdzLmNyb3BwZXJTdGF0aWNIZWlnaHQgOiBzb3VyY2VJbWFnZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjcm9wcGVyV2lkdGggPSBNYXRoLm1pbihzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4V2lkdGgsIHNvdXJjZUltYWdlRWxlbWVudC5vZmZzZXRXaWR0aCk7XG4gICAgICBjb25zdCBjcm9wcGVySGVpZ2h0ID0gTWF0aC5taW4oc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heEhlaWdodCwgc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgICBpZiAoIXNldHRpbmdzLm1haW50YWluQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxID0gMDtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gY3JvcHBlcldpZHRoO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSAwO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBjcm9wcGVySGVpZ2h0O1xuICAgICAgfSBlbHNlIGlmIChjcm9wcGVyV2lkdGggLyBzZXR0aW5ncy5hc3BlY3RSYXRpbyA8IGNyb3BwZXJIZWlnaHQpIHtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxID0gMDtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gY3JvcHBlcldpZHRoO1xuICAgICAgICBjb25zdCBjcm9wcGVySGVpZ2h0V2l0aEFzcGVjdFJhdGlvID0gY3JvcHBlcldpZHRoIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IChzb3VyY2VJbWFnZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gY3JvcHBlckhlaWdodFdpdGhBc3BlY3RSYXRpbykgLyAyO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBjcm9wcGVyUG9zaXRpb24ueTEgKyBjcm9wcGVySGVpZ2h0V2l0aEFzcGVjdFJhdGlvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gMDtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gY3JvcHBlckhlaWdodDtcbiAgICAgICAgY29uc3QgY3JvcHBlcldpZHRoV2l0aEFzcGVjdFJhdGlvID0gY3JvcHBlckhlaWdodCAqIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSAoc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldFdpZHRoIC0gY3JvcHBlcldpZHRoV2l0aEFzcGVjdFJhdGlvKSAvIDI7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiA9IGNyb3BwZXJQb3NpdGlvbi54MSArIGNyb3BwZXJXaWR0aFdpdGhBc3BlY3RSYXRpbztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlKGV2ZW50OiBhbnksIG1vdmVTdGFydDogTW92ZVN0YXJ0LCBjcm9wcGVyUG9zaXRpb246IENyb3BwZXJQb3NpdGlvbikge1xuICAgIGNvbnN0IGRpZmZYID0gdGhpcy5nZXRDbGllbnRYKGV2ZW50KSAtIG1vdmVTdGFydC5jbGllbnRYO1xuICAgIGNvbnN0IGRpZmZZID0gdGhpcy5nZXRDbGllbnRZKGV2ZW50KSAtIG1vdmVTdGFydC5jbGllbnRZO1xuXG4gICAgY3JvcHBlclBvc2l0aW9uLngxID0gbW92ZVN0YXJ0LngxICsgZGlmZlg7XG4gICAgY3JvcHBlclBvc2l0aW9uLnkxID0gbW92ZVN0YXJ0LnkxICsgZGlmZlk7XG4gICAgY3JvcHBlclBvc2l0aW9uLngyID0gbW92ZVN0YXJ0LngyICsgZGlmZlg7XG4gICAgY3JvcHBlclBvc2l0aW9uLnkyID0gbW92ZVN0YXJ0LnkyICsgZGlmZlk7XG4gIH1cblxuICByZXNpemUoZXZlbnQ6IGFueSwgbW92ZVN0YXJ0OiBNb3ZlU3RhcnQsIGNyb3BwZXJQb3NpdGlvbjogQ3JvcHBlclBvc2l0aW9uLCBtYXhTaXplOiBEaW1lbnNpb25zLCBzZXR0aW5nczogQ3JvcHBlclNldHRpbmdzKTogdm9pZCB7XG4gICAgY29uc3QgbW92ZVggPSB0aGlzLmdldENsaWVudFgoZXZlbnQpIC0gbW92ZVN0YXJ0LmNsaWVudFg7XG4gICAgY29uc3QgbW92ZVkgPSB0aGlzLmdldENsaWVudFkoZXZlbnQpIC0gbW92ZVN0YXJ0LmNsaWVudFk7XG4gICAgc3dpdGNoIChtb3ZlU3RhcnQucG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSBNYXRoLm1pbihNYXRoLm1heChtb3ZlU3RhcnQueDEgKyBtb3ZlWCwgY3JvcHBlclBvc2l0aW9uLngyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heFdpZHRoKSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluV2lkdGgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSBNYXRoLm1pbihNYXRoLm1heChtb3ZlU3RhcnQueDEgKyBtb3ZlWCwgY3JvcHBlclBvc2l0aW9uLngyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heFdpZHRoKSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluV2lkdGgpO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSBNYXRoLm1pbihNYXRoLm1heChtb3ZlU3RhcnQueTEgKyBtb3ZlWSwgY3JvcHBlclBvc2l0aW9uLnkyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heEhlaWdodCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbkhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gTWF0aC5taW4oTWF0aC5tYXgobW92ZVN0YXJ0LnkxICsgbW92ZVksIGNyb3BwZXJQb3NpdGlvbi55MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhIZWlnaHQpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5IZWlnaHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcHJpZ2h0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gTWF0aC5tYXgoTWF0aC5taW4obW92ZVN0YXJ0LngyICsgbW92ZVgsIGNyb3BwZXJQb3NpdGlvbi54MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhXaWR0aCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbldpZHRoKTtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gTWF0aC5taW4oTWF0aC5tYXgobW92ZVN0YXJ0LnkxICsgbW92ZVksIGNyb3BwZXJQb3NpdGlvbi55MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhIZWlnaHQpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5IZWlnaHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gTWF0aC5tYXgoTWF0aC5taW4obW92ZVN0YXJ0LngyICsgbW92ZVgsIGNyb3BwZXJQb3NpdGlvbi54MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhXaWR0aCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbldpZHRoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiA9IE1hdGgubWF4KE1hdGgubWluKG1vdmVTdGFydC54MiArIG1vdmVYLCBjcm9wcGVyUG9zaXRpb24ueDEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4V2lkdGgpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5XaWR0aCk7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IE1hdGgubWF4KE1hdGgubWluKG1vdmVTdGFydC55MiArIG1vdmVZLCBjcm9wcGVyUG9zaXRpb24ueTEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4SGVpZ2h0KSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluSGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBNYXRoLm1heChNYXRoLm1pbihtb3ZlU3RhcnQueTIgKyBtb3ZlWSwgY3JvcHBlclBvc2l0aW9uLnkxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heEhlaWdodCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbkhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSA9IE1hdGgubWluKE1hdGgubWF4KG1vdmVTdGFydC54MSArIG1vdmVYLCBjcm9wcGVyUG9zaXRpb24ueDIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4V2lkdGgpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5XaWR0aCk7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IE1hdGgubWF4KE1hdGgubWluKG1vdmVTdGFydC55MiArIG1vdmVZLCBjcm9wcGVyUG9zaXRpb24ueTEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4SGVpZ2h0KSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluSGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBjb25zdCBzY2FsZSA9IGV2ZW50LnNjYWxlO1xuICAgICAgICBjb25zdCBuZXdXaWR0aCA9IE1hdGgubWluKFxuICAgICAgICAgIE1hdGgubWF4KHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5XaWR0aCwgKE1hdGguYWJzKG1vdmVTdGFydC54MiAtIG1vdmVTdGFydC54MSkpICogc2NhbGUpLFxuICAgICAgICAgIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhXaWR0aCk7XG4gICAgICAgIGNvbnN0IG5ld0hlaWdodCA9IE1hdGgubWluKFxuICAgICAgICAgIE1hdGgubWF4KHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5IZWlnaHQsIChNYXRoLmFicyhtb3ZlU3RhcnQueTIgLSBtb3ZlU3RhcnQueTEpKSAqIHNjYWxlKSxcbiAgICAgICAgICBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4SGVpZ2h0KTtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxID0gbW92ZVN0YXJ0LmNsaWVudFggLSBuZXdXaWR0aCAvIDI7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiA9IG1vdmVTdGFydC5jbGllbnRYICsgbmV3V2lkdGggLyAyO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSBtb3ZlU3RhcnQuY2xpZW50WSAtIG5ld0hlaWdodCAvIDI7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IG1vdmVTdGFydC5jbGllbnRZICsgbmV3SGVpZ2h0IC8gMjtcbiAgICAgICAgaWYgKGNyb3BwZXJQb3NpdGlvbi54MSA8IDApIHtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLT0gY3JvcHBlclBvc2l0aW9uLngxO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoY3JvcHBlclBvc2l0aW9uLngyID4gbWF4U2l6ZS53aWR0aCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSAtPSAoY3JvcHBlclBvc2l0aW9uLngyIC0gbWF4U2l6ZS53aWR0aCk7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gbWF4U2l6ZS53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3JvcHBlclBvc2l0aW9uLnkxIDwgMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiAtPSBjcm9wcGVyUG9zaXRpb24ueTE7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChjcm9wcGVyUG9zaXRpb24ueTIgPiBtYXhTaXplLmhlaWdodCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSAtPSAoY3JvcHBlclBvc2l0aW9uLnkyIC0gbWF4U2l6ZS5oZWlnaHQpO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IG1heFNpemUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzZXR0aW5ncy5tYWludGFpbkFzcGVjdFJhdGlvKSB7XG4gICAgICB0aGlzLmNoZWNrQXNwZWN0UmF0aW8obW92ZVN0YXJ0LnBvc2l0aW9uLCBjcm9wcGVyUG9zaXRpb24sIG1heFNpemUsIHNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0FzcGVjdFJhdGlvKHBvc2l0aW9uOiBzdHJpbmcsIGNyb3BwZXJQb3NpdGlvbjogQ3JvcHBlclBvc2l0aW9uLCBtYXhTaXplOiBEaW1lbnNpb25zLCBzZXR0aW5nczogQ3JvcHBlclNldHRpbmdzKTogdm9pZCB7XG4gICAgbGV0IG92ZXJmbG93WCA9IDA7XG4gICAgbGV0IG92ZXJmbG93WSA9IDA7XG5cbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBjcm9wcGVyUG9zaXRpb24ueDEgKyAoY3JvcHBlclBvc2l0aW9uLnkyIC0gY3JvcHBlclBvc2l0aW9uLnkxKSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heChjcm9wcGVyUG9zaXRpb24ueDIgLSBtYXhTaXplLndpZHRoLCAwKTtcbiAgICAgICAgb3ZlcmZsb3dZID0gTWF0aC5tYXgoMCAtIGNyb3BwZXJQb3NpdGlvbi55MSwgMCk7XG4gICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLT0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgOiBvdmVyZmxvd1g7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxICs9IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyBvdmVyZmxvd1kgOiBvdmVyZmxvd1ggLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiA9IGNyb3BwZXJQb3NpdGlvbi54MSArIChjcm9wcGVyUG9zaXRpb24ueTIgLSBjcm9wcGVyUG9zaXRpb24ueTEpICogc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIG92ZXJmbG93WCA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi54MiAtIG1heFNpemUud2lkdGgsIDApO1xuICAgICAgICBvdmVyZmxvd1kgPSBNYXRoLm1heChjcm9wcGVyUG9zaXRpb24ueTIgLSBtYXhTaXplLmhlaWdodCwgMCk7XG4gICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLT0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgOiBvdmVyZmxvd1g7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyIC09IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyBvdmVyZmxvd1kgOiAob3ZlcmZsb3dYIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IGNyb3BwZXJQb3NpdGlvbi55MiAtIChjcm9wcGVyUG9zaXRpb24ueDIgLSBjcm9wcGVyUG9zaXRpb24ueDEpIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIG92ZXJmbG93WCA9IE1hdGgubWF4KDAgLSBjcm9wcGVyUG9zaXRpb24ueDEsIDApO1xuICAgICAgICBvdmVyZmxvd1kgPSBNYXRoLm1heCgwIC0gY3JvcHBlclBvc2l0aW9uLnkxLCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSArPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgKz0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSBjcm9wcGVyUG9zaXRpb24ueTIgLSAoY3JvcHBlclBvc2l0aW9uLngyIC0gY3JvcHBlclBvc2l0aW9uLngxKSAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heChjcm9wcGVyUG9zaXRpb24ueDIgLSBtYXhTaXplLndpZHRoLCAwKTtcbiAgICAgICAgb3ZlcmZsb3dZID0gTWF0aC5tYXgoMCAtIGNyb3BwZXJQb3NpdGlvbi55MSwgMCk7XG4gICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLT0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgOiBvdmVyZmxvd1g7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxICs9IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyBvdmVyZmxvd1kgOiBvdmVyZmxvd1ggLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIGNhc2UgJ2JvdHRvbXJpZ2h0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gY3JvcHBlclBvc2l0aW9uLnkxICsgKGNyb3BwZXJQb3NpdGlvbi54MiAtIGNyb3BwZXJQb3NpdGlvbi54MSkgLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgb3ZlcmZsb3dYID0gTWF0aC5tYXgoY3JvcHBlclBvc2l0aW9uLngyIC0gbWF4U2l6ZS53aWR0aCwgMCk7XG4gICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi55MiAtIG1heFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgLT0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gY3JvcHBlclBvc2l0aW9uLnkxICsgKGNyb3BwZXJQb3NpdGlvbi54MiAtIGNyb3BwZXJQb3NpdGlvbi54MSkgLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgb3ZlcmZsb3dYID0gTWF0aC5tYXgoMCAtIGNyb3BwZXJQb3NpdGlvbi54MSwgMCk7XG4gICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi55MiAtIG1heFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSArPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgLT0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gY3JvcHBlclBvc2l0aW9uLngxICsgKGNyb3BwZXJQb3NpdGlvbi55MiAtIGNyb3BwZXJQb3NpdGlvbi55MSkgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gY3JvcHBlclBvc2l0aW9uLnkxICsgKGNyb3BwZXJQb3NpdGlvbi54MiAtIGNyb3BwZXJQb3NpdGlvbi54MSkgLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3dYMSA9IE1hdGgubWF4KDAgLSBjcm9wcGVyUG9zaXRpb24ueDEsIDApO1xuICAgICAgICBjb25zdCBvdmVyZmxvd1gyID0gTWF0aC5tYXgoY3JvcHBlclBvc2l0aW9uLngyIC0gbWF4U2l6ZS53aWR0aCwgMCk7XG4gICAgICAgIGNvbnN0IG92ZXJmbG93WTEgPSBNYXRoLm1heChjcm9wcGVyUG9zaXRpb24ueTIgLSBtYXhTaXplLmhlaWdodCwgMCk7XG4gICAgICAgIGNvbnN0IG92ZXJmbG93WTIgPSBNYXRoLm1heCgwIC0gY3JvcHBlclBvc2l0aW9uLnkxLCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WDEgPiAwIHx8IG92ZXJmbG93WDIgPiAwIHx8IG92ZXJmbG93WTEgPiAwIHx8IG92ZXJmbG93WTIgPiAwKSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxICs9IChvdmVyZmxvd1kxICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYMSA/IChvdmVyZmxvd1kxICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pIDogb3ZlcmZsb3dYMTtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgLT0gKG92ZXJmbG93WTIgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1gyID8gKG92ZXJmbG93WTIgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgOiBvdmVyZmxvd1gyO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSArPSAob3ZlcmZsb3dZMiAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WDIgPyBvdmVyZmxvd1kyIDogb3ZlcmZsb3dYMiAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiAtPSAob3ZlcmZsb3dZMSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WDEgPyBvdmVyZmxvd1kxIDogb3ZlcmZsb3dYMSAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGdldENsaWVudFgoZXZlbnQ6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIChldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXNbMF0gPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC5jbGllbnRYKSB8fCAwO1xuICB9XG5cbiAgZ2V0Q2xpZW50WShldmVudDogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlc1swXSA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WSA6IGV2ZW50LmNsaWVudFkpIHx8IDA7XG4gIH1cbn1cbiJdfQ==