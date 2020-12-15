/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/cropper-position.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var CropperPositionService = /** @class */ (function () {
    function CropperPositionService() {
    }
    /**
     * @param {?} sourceImage
     * @param {?} cropperPosition
     * @param {?} settings
     * @return {?}
     */
    CropperPositionService.prototype.resetCropperPosition = /**
     * @param {?} sourceImage
     * @param {?} cropperPosition
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, cropperPosition, settings) {
        /** @type {?} */
        var sourceImageElement = sourceImage.nativeElement;
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
            var cropperWidth = Math.min(settings.cropperScaledMaxWidth, sourceImageElement.offsetWidth);
            /** @type {?} */
            var cropperHeight = Math.min(settings.cropperScaledMaxHeight, sourceImageElement.offsetHeight);
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
                var cropperHeightWithAspectRatio = cropperWidth / settings.aspectRatio;
                cropperPosition.y1 = (sourceImageElement.offsetHeight - cropperHeightWithAspectRatio) / 2;
                cropperPosition.y2 = cropperPosition.y1 + cropperHeightWithAspectRatio;
            }
            else {
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
                /** @type {?} */
                var cropperWidthWithAspectRatio = cropperHeight * settings.aspectRatio;
                cropperPosition.x1 = (sourceImageElement.offsetWidth - cropperWidthWithAspectRatio) / 2;
                cropperPosition.x2 = cropperPosition.x1 + cropperWidthWithAspectRatio;
            }
        }
    };
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @return {?}
     */
    CropperPositionService.prototype.move = /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @return {?}
     */
    function (event, moveStart, cropperPosition) {
        /** @type {?} */
        var diffX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        var diffY = this.getClientY(event) - moveStart.clientY;
        cropperPosition.x1 = moveStart.x1 + diffX;
        cropperPosition.y1 = moveStart.y1 + diffY;
        cropperPosition.x2 = moveStart.x2 + diffX;
        cropperPosition.y2 = moveStart.y2 + diffY;
    };
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    CropperPositionService.prototype.resize = /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    function (event, moveStart, cropperPosition, maxSize, settings) {
        /** @type {?} */
        var moveX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        var moveY = this.getClientY(event) - moveStart.clientY;
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
                var scale = event.scale;
                /** @type {?} */
                var newWidth = Math.min(Math.max(settings.cropperScaledMinWidth, (Math.abs(moveStart.x2 - moveStart.x1)) * scale), settings.cropperScaledMaxWidth);
                /** @type {?} */
                var newHeight = Math.min(Math.max(settings.cropperScaledMinHeight, (Math.abs(moveStart.y2 - moveStart.y1)) * scale), settings.cropperScaledMaxHeight);
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
    };
    /**
     * @param {?} position
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    CropperPositionService.prototype.checkAspectRatio = /**
     * @param {?} position
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    function (position, cropperPosition, maxSize, settings) {
        /** @type {?} */
        var overflowX = 0;
        /** @type {?} */
        var overflowY = 0;
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
                var overflowX1 = Math.max(0 - cropperPosition.x1, 0);
                /** @type {?} */
                var overflowX2 = Math.max(cropperPosition.x2 - maxSize.width, 0);
                /** @type {?} */
                var overflowY1 = Math.max(cropperPosition.y2 - maxSize.height, 0);
                /** @type {?} */
                var overflowY2 = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX1 > 0 || overflowX2 > 0 || overflowY1 > 0 || overflowY2 > 0) {
                    cropperPosition.x1 += (overflowY1 * settings.aspectRatio) > overflowX1 ? (overflowY1 * settings.aspectRatio) : overflowX1;
                    cropperPosition.x2 -= (overflowY2 * settings.aspectRatio) > overflowX2 ? (overflowY2 * settings.aspectRatio) : overflowX2;
                    cropperPosition.y1 += (overflowY2 * settings.aspectRatio) > overflowX2 ? overflowY2 : overflowX2 / settings.aspectRatio;
                    cropperPosition.y2 -= (overflowY1 * settings.aspectRatio) > overflowX1 ? overflowY1 : overflowX1 / settings.aspectRatio;
                }
                break;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CropperPositionService.prototype.getClientX = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX) || 0;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CropperPositionService.prototype.getClientY = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY) || 0;
    };
    CropperPositionService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ CropperPositionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CropperPositionService_Factory() { return new CropperPositionService(); }, token: CropperPositionService, providedIn: "root" });
    return CropperPositionService;
}());
export { CropperPositionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci1wb3NpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWNyb3BwZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY3JvcHBlci1wb3NpdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJdkQ7SUFBQTtLQWlOQzs7Ozs7OztJQTlNQyxxREFBb0I7Ozs7OztJQUFwQixVQUFxQixXQUF1QixFQUFFLGVBQWdDLEVBQUUsUUFBeUI7O1lBQ2pHLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxhQUFhO1FBQ3BELElBQUksUUFBUSxDQUFDLG1CQUFtQixJQUFJLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMvRCxlQUFlLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QixlQUFlLENBQUMsRUFBRSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDakYsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7WUFDL0QsZUFBZSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkIsZUFBZSxDQUFDLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ25GLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDO1NBQ2xFO2FBQU07O2dCQUNDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7O2dCQUN2RixhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUMsWUFBWSxDQUFD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LENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO2lCQUN6SDtnQkFDRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7OztJQUVELDJDQUFVOzs7O0lBQVYsVUFBVyxLQUFVO1FBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdGLENBQUM7Ozs7O0lBRUQsMkNBQVU7Ozs7SUFBVixVQUFXLEtBQVU7UUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0YsQ0FBQzs7Z0JBaE5GLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OztpQ0FKaEM7Q0FxTkMsQUFqTkQsSUFpTkM7U0FoTlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3JvcHBlclBvc2l0aW9uLCBEaW1lbnNpb25zLCBNb3ZlU3RhcnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENyb3BwZXJTZXR0aW5ncyB9IGZyb20gJy4uL2ludGVyZmFjZXMvY3JvcHBlci5zZXR0aW5ncyc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIENyb3BwZXJQb3NpdGlvblNlcnZpY2Uge1xuXG4gIHJlc2V0Q3JvcHBlclBvc2l0aW9uKHNvdXJjZUltYWdlOiBFbGVtZW50UmVmLCBjcm9wcGVyUG9zaXRpb246IENyb3BwZXJQb3NpdGlvbiwgc2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IHZvaWQge1xuICAgIGNvbnN0IHNvdXJjZUltYWdlRWxlbWVudCA9IHNvdXJjZUltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHNldHRpbmdzLmNyb3BwZXJTdGF0aWNIZWlnaHQgJiYgc2V0dGluZ3MuY3JvcHBlclN0YXRpY1dpZHRoKSB7XG4gICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSAwO1xuICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldFdpZHRoID4gc2V0dGluZ3MuY3JvcHBlclN0YXRpY1dpZHRoID9cbiAgICAgICAgc2V0dGluZ3MuY3JvcHBlclN0YXRpY1dpZHRoIDogc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gMDtcbiAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IHNvdXJjZUltYWdlRWxlbWVudC5vZmZzZXRIZWlnaHQgPiBzZXR0aW5ncy5jcm9wcGVyU3RhdGljSGVpZ2h0ID9cbiAgICAgICAgc2V0dGluZ3MuY3JvcHBlclN0YXRpY0hlaWdodCA6IHNvdXJjZUltYWdlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNyb3BwZXJXaWR0aCA9IE1hdGgubWluKHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhXaWR0aCwgc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldFdpZHRoKTtcbiAgICAgIGNvbnN0IGNyb3BwZXJIZWlnaHQgPSBNYXRoLm1pbihzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4SGVpZ2h0LCBzb3VyY2VJbWFnZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICAgIGlmICghc2V0dGluZ3MubWFpbnRhaW5Bc3BlY3RSYXRpbykge1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSAwO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBjcm9wcGVyV2lkdGg7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IDA7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IGNyb3BwZXJIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGNyb3BwZXJXaWR0aCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvIDwgY3JvcHBlckhlaWdodCkge1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSAwO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBjcm9wcGVyV2lkdGg7XG4gICAgICAgIGNvbnN0IGNyb3BwZXJIZWlnaHRXaXRoQXNwZWN0UmF0aW8gPSBjcm9wcGVyV2lkdGggLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gKHNvdXJjZUltYWdlRWxlbWVudC5vZmZzZXRIZWlnaHQgLSBjcm9wcGVySGVpZ2h0V2l0aEFzcGVjdFJhdGlvKSAvIDI7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IGNyb3BwZXJQb3NpdGlvbi55MSArIGNyb3BwZXJIZWlnaHRXaXRoQXNwZWN0UmF0aW87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSAwO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBjcm9wcGVySGVpZ2h0O1xuICAgICAgICBjb25zdCBjcm9wcGVyV2lkdGhXaXRoQXNwZWN0UmF0aW8gPSBjcm9wcGVySGVpZ2h0ICogc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSA9IChzb3VyY2VJbWFnZUVsZW1lbnQub2Zmc2V0V2lkdGggLSBjcm9wcGVyV2lkdGhXaXRoQXNwZWN0UmF0aW8pIC8gMjtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gY3JvcHBlclBvc2l0aW9uLngxICsgY3JvcHBlcldpZHRoV2l0aEFzcGVjdFJhdGlvO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdmUoZXZlbnQ6IGFueSwgbW92ZVN0YXJ0OiBNb3ZlU3RhcnQsIGNyb3BwZXJQb3NpdGlvbjogQ3JvcHBlclBvc2l0aW9uKSB7XG4gICAgY29uc3QgZGlmZlggPSB0aGlzLmdldENsaWVudFgoZXZlbnQpIC0gbW92ZVN0YXJ0LmNsaWVudFg7XG4gICAgY29uc3QgZGlmZlkgPSB0aGlzLmdldENsaWVudFkoZXZlbnQpIC0gbW92ZVN0YXJ0LmNsaWVudFk7XG5cbiAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSBtb3ZlU3RhcnQueDEgKyBkaWZmWDtcbiAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSBtb3ZlU3RhcnQueTEgKyBkaWZmWTtcbiAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBtb3ZlU3RhcnQueDIgKyBkaWZmWDtcbiAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBtb3ZlU3RhcnQueTIgKyBkaWZmWTtcbiAgfVxuXG4gIHJlc2l6ZShldmVudDogYW55LCBtb3ZlU3RhcnQ6IE1vdmVTdGFydCwgY3JvcHBlclBvc2l0aW9uOiBDcm9wcGVyUG9zaXRpb24sIG1heFNpemU6IERpbWVuc2lvbnMsIHNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiB2b2lkIHtcbiAgICBjb25zdCBtb3ZlWCA9IHRoaXMuZ2V0Q2xpZW50WChldmVudCkgLSBtb3ZlU3RhcnQuY2xpZW50WDtcbiAgICBjb25zdCBtb3ZlWSA9IHRoaXMuZ2V0Q2xpZW50WShldmVudCkgLSBtb3ZlU3RhcnQuY2xpZW50WTtcbiAgICBzd2l0Y2ggKG1vdmVTdGFydC5wb3NpdGlvbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSA9IE1hdGgubWluKE1hdGgubWF4KG1vdmVTdGFydC54MSArIG1vdmVYLCBjcm9wcGVyUG9zaXRpb24ueDIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4V2lkdGgpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5XaWR0aCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MSA9IE1hdGgubWluKE1hdGgubWF4KG1vdmVTdGFydC54MSArIG1vdmVYLCBjcm9wcGVyUG9zaXRpb24ueDIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4V2lkdGgpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5XaWR0aCk7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IE1hdGgubWluKE1hdGgubWF4KG1vdmVTdGFydC55MSArIG1vdmVZLCBjcm9wcGVyUG9zaXRpb24ueTIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4SGVpZ2h0KSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgLSBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluSGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSBNYXRoLm1pbihNYXRoLm1heChtb3ZlU3RhcnQueTEgKyBtb3ZlWSwgY3JvcHBlclBvc2l0aW9uLnkyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heEhlaWdodCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbkhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBNYXRoLm1heChNYXRoLm1pbihtb3ZlU3RhcnQueDIgKyBtb3ZlWCwgY3JvcHBlclBvc2l0aW9uLngxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heFdpZHRoKSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluV2lkdGgpO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSBNYXRoLm1pbihNYXRoLm1heChtb3ZlU3RhcnQueTEgKyBtb3ZlWSwgY3JvcHBlclBvc2l0aW9uLnkyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heEhlaWdodCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbkhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBNYXRoLm1heChNYXRoLm1pbihtb3ZlU3RhcnQueDIgKyBtb3ZlWCwgY3JvcHBlclBvc2l0aW9uLngxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heFdpZHRoKSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluV2lkdGgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbXJpZ2h0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gTWF0aC5tYXgoTWF0aC5taW4obW92ZVN0YXJ0LngyICsgbW92ZVgsIGNyb3BwZXJQb3NpdGlvbi54MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhXaWR0aCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxICsgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbldpZHRoKTtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gTWF0aC5tYXgoTWF0aC5taW4obW92ZVN0YXJ0LnkyICsgbW92ZVksIGNyb3BwZXJQb3NpdGlvbi55MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhIZWlnaHQpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5IZWlnaHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiA9IE1hdGgubWF4KE1hdGgubWluKG1vdmVTdGFydC55MiArIG1vdmVZLCBjcm9wcGVyUG9zaXRpb24ueTEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWF4SGVpZ2h0KSxcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgKyBzZXR0aW5ncy5jcm9wcGVyU2NhbGVkTWluSGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxID0gTWF0aC5taW4oTWF0aC5tYXgobW92ZVN0YXJ0LngxICsgbW92ZVgsIGNyb3BwZXJQb3NpdGlvbi54MiAtIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhXaWR0aCksXG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyIC0gc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbldpZHRoKTtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gTWF0aC5tYXgoTWF0aC5taW4obW92ZVN0YXJ0LnkyICsgbW92ZVksIGNyb3BwZXJQb3NpdGlvbi55MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhIZWlnaHQpLFxuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSArIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNaW5IZWlnaHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIGNvbnN0IHNjYWxlID0gZXZlbnQuc2NhbGU7XG4gICAgICAgIGNvbnN0IG5ld1dpZHRoID0gTWF0aC5taW4oXG4gICAgICAgICAgTWF0aC5tYXgoc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbldpZHRoLCAoTWF0aC5hYnMobW92ZVN0YXJ0LngyIC0gbW92ZVN0YXJ0LngxKSkgKiBzY2FsZSksXG4gICAgICAgICAgc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1heFdpZHRoKTtcbiAgICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gTWF0aC5taW4oXG4gICAgICAgICAgTWF0aC5tYXgoc2V0dGluZ3MuY3JvcHBlclNjYWxlZE1pbkhlaWdodCwgKE1hdGguYWJzKG1vdmVTdGFydC55MiAtIG1vdmVTdGFydC55MSkpICogc2NhbGUpLFxuICAgICAgICAgIHNldHRpbmdzLmNyb3BwZXJTY2FsZWRNYXhIZWlnaHQpO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgPSBtb3ZlU3RhcnQuY2xpZW50WCAtIG5ld1dpZHRoIC8gMjtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gbW92ZVN0YXJ0LmNsaWVudFggKyBuZXdXaWR0aCAvIDI7XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IG1vdmVTdGFydC5jbGllbnRZIC0gbmV3SGVpZ2h0IC8gMjtcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gbW92ZVN0YXJ0LmNsaWVudFkgKyBuZXdIZWlnaHQgLyAyO1xuICAgICAgICBpZiAoY3JvcHBlclBvc2l0aW9uLngxIDwgMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtPSBjcm9wcGVyUG9zaXRpb24ueDE7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChjcm9wcGVyUG9zaXRpb24ueDIgPiBtYXhTaXplLndpZHRoKSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxIC09IChjcm9wcGVyUG9zaXRpb24ueDIgLSBtYXhTaXplLndpZHRoKTtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBtYXhTaXplLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjcm9wcGVyUG9zaXRpb24ueTEgPCAwKSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyIC09IGNyb3BwZXJQb3NpdGlvbi55MTtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGNyb3BwZXJQb3NpdGlvbi55MiA+IG1heFNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxIC09IChjcm9wcGVyUG9zaXRpb24ueTIgLSBtYXhTaXplLmhlaWdodCk7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyID0gbWF4U2l6ZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHNldHRpbmdzLm1haW50YWluQXNwZWN0UmF0aW8pIHtcbiAgICAgIHRoaXMuY2hlY2tBc3BlY3RSYXRpbyhtb3ZlU3RhcnQucG9zaXRpb24sIGNyb3BwZXJQb3NpdGlvbiwgbWF4U2l6ZSwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrQXNwZWN0UmF0aW8ocG9zaXRpb246IHN0cmluZywgY3JvcHBlclBvc2l0aW9uOiBDcm9wcGVyUG9zaXRpb24sIG1heFNpemU6IERpbWVuc2lvbnMsIHNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiB2b2lkIHtcbiAgICBsZXQgb3ZlcmZsb3dYID0gMDtcbiAgICBsZXQgb3ZlcmZsb3dZID0gMDtcblxuICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiA9IGNyb3BwZXJQb3NpdGlvbi54MSArIChjcm9wcGVyUG9zaXRpb24ueTIgLSBjcm9wcGVyUG9zaXRpb24ueTEpICogc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIG92ZXJmbG93WCA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi54MiAtIG1heFNpemUud2lkdGgsIDApO1xuICAgICAgICBvdmVyZmxvd1kgPSBNYXRoLm1heCgwIC0gY3JvcHBlclBvc2l0aW9uLnkxLCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgKz0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyID0gY3JvcHBlclBvc2l0aW9uLngxICsgKGNyb3BwZXJQb3NpdGlvbi55MiAtIGNyb3BwZXJQb3NpdGlvbi55MSkgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgb3ZlcmZsb3dYID0gTWF0aC5tYXgoY3JvcHBlclBvc2l0aW9uLngyIC0gbWF4U2l6ZS53aWR0aCwgMCk7XG4gICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi55MiAtIG1heFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgLT0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IChvdmVyZmxvd1ggLyBzZXR0aW5ncy5hc3BlY3RSYXRpbyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3BsZWZ0JzpcbiAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxID0gY3JvcHBlclBvc2l0aW9uLnkyIC0gKGNyb3BwZXJQb3NpdGlvbi54MiAtIGNyb3BwZXJQb3NpdGlvbi54MSkgLyBzZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgb3ZlcmZsb3dYID0gTWF0aC5tYXgoMCAtIGNyb3BwZXJQb3NpdGlvbi54MSwgMCk7XG4gICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KDAgLSBjcm9wcGVyUG9zaXRpb24ueTEsIDApO1xuICAgICAgICBpZiAob3ZlcmZsb3dYID4gMCB8fCBvdmVyZmxvd1kgPiAwKSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxICs9IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pIDogb3ZlcmZsb3dYO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSArPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gb3ZlcmZsb3dZIDogb3ZlcmZsb3dYIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MSA9IGNyb3BwZXJQb3NpdGlvbi55MiAtIChjcm9wcGVyUG9zaXRpb24ueDIgLSBjcm9wcGVyUG9zaXRpb24ueDEpIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIG92ZXJmbG93WCA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi54MiAtIG1heFNpemUud2lkdGgsIDApO1xuICAgICAgICBvdmVyZmxvd1kgPSBNYXRoLm1heCgwIC0gY3JvcHBlclBvc2l0aW9uLnkxLCAwKTtcbiAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTEgKz0gKG92ZXJmbG93WSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBjcm9wcGVyUG9zaXRpb24ueTEgKyAoY3JvcHBlclBvc2l0aW9uLngyIC0gY3JvcHBlclBvc2l0aW9uLngxKSAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heChjcm9wcGVyUG9zaXRpb24ueDIgLSBtYXhTaXplLndpZHRoLCAwKTtcbiAgICAgICAgb3ZlcmZsb3dZID0gTWF0aC5tYXgoY3JvcHBlclBvc2l0aW9uLnkyIC0gbWF4U2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICBpZiAob3ZlcmZsb3dYID4gMCB8fCBvdmVyZmxvd1kgPiAwKSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngyIC09IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pIDogb3ZlcmZsb3dYO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiAtPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gb3ZlcmZsb3dZIDogb3ZlcmZsb3dYIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgIGNhc2UgJ2JvdHRvbWxlZnQnOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBjcm9wcGVyUG9zaXRpb24ueTEgKyAoY3JvcHBlclBvc2l0aW9uLngyIC0gY3JvcHBlclBvc2l0aW9uLngxKSAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heCgwIC0gY3JvcHBlclBvc2l0aW9uLngxLCAwKTtcbiAgICAgICAgb3ZlcmZsb3dZID0gTWF0aC5tYXgoY3JvcHBlclBvc2l0aW9uLnkyIC0gbWF4U2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICBpZiAob3ZlcmZsb3dYID4gMCB8fCBvdmVyZmxvd1kgPiAwKSB7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLngxICs9IChvdmVyZmxvd1kgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pIDogb3ZlcmZsb3dYO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi55MiAtPSAob3ZlcmZsb3dZICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gb3ZlcmZsb3dZIDogb3ZlcmZsb3dYIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDIgPSBjcm9wcGVyUG9zaXRpb24ueDEgKyAoY3JvcHBlclBvc2l0aW9uLnkyIC0gY3JvcHBlclBvc2l0aW9uLnkxKSAqIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBjcm9wcGVyUG9zaXRpb24ueTIgPSBjcm9wcGVyUG9zaXRpb24ueTEgKyAoY3JvcHBlclBvc2l0aW9uLngyIC0gY3JvcHBlclBvc2l0aW9uLngxKSAvIHNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBjb25zdCBvdmVyZmxvd1gxID0gTWF0aC5tYXgoMCAtIGNyb3BwZXJQb3NpdGlvbi54MSwgMCk7XG4gICAgICAgIGNvbnN0IG92ZXJmbG93WDIgPSBNYXRoLm1heChjcm9wcGVyUG9zaXRpb24ueDIgLSBtYXhTaXplLndpZHRoLCAwKTtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3dZMSA9IE1hdGgubWF4KGNyb3BwZXJQb3NpdGlvbi55MiAtIG1heFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgY29uc3Qgb3ZlcmZsb3dZMiA9IE1hdGgubWF4KDAgLSBjcm9wcGVyUG9zaXRpb24ueTEsIDApO1xuICAgICAgICBpZiAob3ZlcmZsb3dYMSA+IDAgfHwgb3ZlcmZsb3dYMiA+IDAgfHwgb3ZlcmZsb3dZMSA+IDAgfHwgb3ZlcmZsb3dZMiA+IDApIHtcbiAgICAgICAgICBjcm9wcGVyUG9zaXRpb24ueDEgKz0gKG92ZXJmbG93WTEgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1gxID8gKG92ZXJmbG93WTEgKiBzZXR0aW5ncy5hc3BlY3RSYXRpbykgOiBvdmVyZmxvd1gxO1xuICAgICAgICAgIGNyb3BwZXJQb3NpdGlvbi54MiAtPSAob3ZlcmZsb3dZMiAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WDIgPyAob3ZlcmZsb3dZMiAqIHNldHRpbmdzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDI7XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkxICs9IChvdmVyZmxvd1kyICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYMiA/IG92ZXJmbG93WTIgOiBvdmVyZmxvd1gyIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgICAgY3JvcHBlclBvc2l0aW9uLnkyIC09IChvdmVyZmxvd1kxICogc2V0dGluZ3MuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYMSA/IG92ZXJmbG93WTEgOiBvdmVyZmxvd1gxIC8gc2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2xpZW50WChldmVudDogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gKGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlc1swXSA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LmNsaWVudFgpIHx8IDA7XG4gIH1cblxuICBnZXRDbGllbnRZKGV2ZW50OiBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiAoZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzWzBdID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZIDogZXZlbnQuY2xpZW50WSkgfHwgMDtcbiAgfVxufVxuIl19