/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/blob.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} base64Image
 * @return {?}
 */
export function base64ToFile(base64Image) {
    /** @type {?} */
    var split = base64Image.split(',');
    /** @type {?} */
    var type = split[0].replace('data:', '').replace(';base64', '');
    /** @type {?} */
    var byteString = atob(split[1]);
    /** @type {?} */
    var ab = new ArrayBuffer(byteString.length);
    /** @type {?} */
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: type });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvYi51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbWFnZS1jcm9wcGVyLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2Jsb2IudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLFlBQVksQ0FBQyxXQUFtQjs7UUFDeEMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztRQUM5QixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7O1FBQzNELFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUMzQixFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7UUFDdkMsRUFBRSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDO0FBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYmFzZTY0VG9GaWxlKGJhc2U2NEltYWdlOiBzdHJpbmcpOiBCbG9iIHtcbiAgY29uc3Qgc3BsaXQgPSBiYXNlNjRJbWFnZS5zcGxpdCgnLCcpO1xuICBjb25zdCB0eXBlID0gc3BsaXRbMF0ucmVwbGFjZSgnZGF0YTonLCAnJykucmVwbGFjZSgnO2Jhc2U2NCcsICcnKTtcbiAgY29uc3QgYnl0ZVN0cmluZyA9IGF0b2Ioc3BsaXRbMV0pO1xuICBjb25zdCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG4gIGNvbnN0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gbmV3IEJsb2IoW2FiXSwge3R5cGV9KTtcbn1cbiJdfQ==