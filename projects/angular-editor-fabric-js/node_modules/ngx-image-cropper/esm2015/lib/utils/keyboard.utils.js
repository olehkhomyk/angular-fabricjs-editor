/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/keyboard.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} key
 * @return {?}
 */
export function getPositionForKey(key) {
    switch (key) {
        case 'ArrowUp':
            return 'top';
        case 'ArrowRight':
            return 'right';
        case 'ArrowDown':
            return 'bottom';
        case 'ArrowLeft':
        default:
            return 'left';
    }
}
/**
 * @param {?} key
 * @return {?}
 */
export function getInvertedPositionForKey(key) {
    switch (key) {
        case 'ArrowUp':
            return 'bottom';
        case 'ArrowRight':
            return 'left';
        case 'ArrowDown':
            return 'top';
        case 'ArrowLeft':
        default:
            return 'right';
    }
}
/**
 * @param {?} key
 * @param {?} stepSize
 * @return {?}
 */
export function getEventForKey(key, stepSize) {
    switch (key) {
        case 'ArrowUp':
            return { clientX: 0, clientY: stepSize * -1 };
        case 'ArrowRight':
            return { clientX: stepSize, clientY: 0 };
        case 'ArrowDown':
            return { clientX: 0, clientY: stepSize };
        case 'ArrowLeft':
        default:
            return { clientX: stepSize * -1, clientY: 0 };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW1hZ2UtY3JvcHBlci8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9rZXlib2FyZC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsaUJBQWlCLENBQUMsR0FBVztJQUMzQyxRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssU0FBUztZQUNaLE9BQU8sS0FBSyxDQUFDO1FBQ2YsS0FBSyxZQUFZO1lBQ2YsT0FBTyxPQUFPLENBQUM7UUFDakIsS0FBSyxXQUFXO1lBQ2QsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxXQUFXLENBQUM7UUFDakI7WUFDRSxPQUFPLE1BQU0sQ0FBQztLQUNqQjtBQUNILENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLEdBQVc7SUFDbkQsUUFBUSxHQUFHLEVBQUU7UUFDWCxLQUFLLFNBQVM7WUFDWixPQUFPLFFBQVEsQ0FBQztRQUNsQixLQUFLLFlBQVk7WUFDZixPQUFPLE1BQU0sQ0FBQztRQUNoQixLQUFLLFdBQVc7WUFDZCxPQUFPLEtBQUssQ0FBQztRQUNmLEtBQUssV0FBVyxDQUFDO1FBQ2pCO1lBQ0UsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFDSCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEdBQVcsRUFBRSxRQUFnQjtJQUMxRCxRQUFRLEdBQUcsRUFBRTtRQUNYLEtBQUssU0FBUztZQUNaLE9BQU8sRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUM5QyxLQUFLLFlBQVk7WUFDZixPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDekMsS0FBSyxXQUFXO1lBQ2QsT0FBTyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBQyxDQUFDO1FBQ3pDLEtBQUssV0FBVyxDQUFDO1FBQ2pCO1lBQ0UsT0FBTyxFQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO0tBQy9DO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRQb3NpdGlvbkZvcktleShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gIHN3aXRjaCAoa2V5KSB7XG4gICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICByZXR1cm4gJ3RvcCc7XG4gICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgcmV0dXJuICdib3R0b20nO1xuICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnbGVmdCc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEludmVydGVkUG9zaXRpb25Gb3JLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgcmV0dXJuICdib3R0b20nO1xuICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgcmV0dXJuICd0b3AnO1xuICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAncmlnaHQnO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudEZvcktleShrZXk6IHN0cmluZywgc3RlcFNpemU6IG51bWJlcik6IGFueSB7XG4gIHN3aXRjaCAoa2V5KSB7XG4gICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICByZXR1cm4ge2NsaWVudFg6IDAsIGNsaWVudFk6IHN0ZXBTaXplICogLTF9O1xuICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgcmV0dXJuIHtjbGllbnRYOiBzdGVwU2l6ZSwgY2xpZW50WTogMH07XG4gICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgIHJldHVybiB7Y2xpZW50WDogMCwgY2xpZW50WTogc3RlcFNpemV9O1xuICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7Y2xpZW50WDogc3RlcFNpemUgKiAtMSwgY2xpZW50WTogMH07XG4gIH1cbn1cbiJdfQ==