/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/resize.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Hermite resize - fast image resize/resample using Hermite filter.
 * https://github.com/viliusle/Hermite-resize
 */
/**
 * @param {?} canvas
 * @param {?} width
 * @param {?} height
 * @return {?}
 */
export function resizeCanvas(canvas, width, height) {
    /** @type {?} */
    var width_source = canvas.width;
    /** @type {?} */
    var height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);
    /** @type {?} */
    var ratio_w = width_source / width;
    /** @type {?} */
    var ratio_h = height_source / height;
    /** @type {?} */
    var ratio_w_half = Math.ceil(ratio_w / 2);
    /** @type {?} */
    var ratio_h_half = Math.ceil(ratio_h / 2);
    /** @type {?} */
    var ctx = canvas.getContext('2d');
    if (ctx) {
        /** @type {?} */
        var img = ctx.getImageData(0, 0, width_source, height_source);
        /** @type {?} */
        var img2 = ctx.createImageData(width, height);
        /** @type {?} */
        var data = img.data;
        /** @type {?} */
        var data2 = img2.data;
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                /** @type {?} */
                var x2 = (i + j * width) * 4;
                /** @type {?} */
                var center_y = j * ratio_h;
                /** @type {?} */
                var weight = 0;
                /** @type {?} */
                var weights = 0;
                /** @type {?} */
                var weights_alpha = 0;
                /** @type {?} */
                var gx_r = 0;
                /** @type {?} */
                var gx_g = 0;
                /** @type {?} */
                var gx_b = 0;
                /** @type {?} */
                var gx_a = 0;
                /** @type {?} */
                var xx_start = Math.floor(i * ratio_w);
                /** @type {?} */
                var yy_start = Math.floor(j * ratio_h);
                /** @type {?} */
                var xx_stop = Math.ceil((i + 1) * ratio_w);
                /** @type {?} */
                var yy_stop = Math.ceil((j + 1) * ratio_h);
                xx_stop = Math.min(xx_stop, width_source);
                yy_stop = Math.min(yy_stop, height_source);
                for (var yy = yy_start; yy < yy_stop; yy++) {
                    /** @type {?} */
                    var dy = Math.abs(center_y - yy) / ratio_h_half;
                    /** @type {?} */
                    var center_x = i * ratio_w;
                    /** @type {?} */
                    var w0 = dy * dy;
                    for (var xx = xx_start; xx < xx_stop; xx++) {
                        /** @type {?} */
                        var dx = Math.abs(center_x - xx) / ratio_w_half;
                        /** @type {?} */
                        var w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            //pixel too far
                            continue;
                        }
                        //hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        /** @type {?} */
                        var pos_x = 4 * (xx + yy * width_source);
                        //alpha
                        gx_a += weight * data[pos_x + 3];
                        weights_alpha += weight;
                        //colors
                        if (data[pos_x + 3] < 255)
                            weight = weight * data[pos_x + 3] / 250;
                        gx_r += weight * data[pos_x];
                        gx_g += weight * data[pos_x + 1];
                        gx_b += weight * data[pos_x + 2];
                        weights += weight;
                    }
                }
                data2[x2] = gx_r / weights;
                data2[x2 + 1] = gx_g / weights;
                data2[x2 + 2] = gx_b / weights;
                data2[x2 + 3] = gx_a / weights_alpha;
            }
        }
        canvas.width = width;
        canvas.height = height;
        //draw
        ctx.putImageData(img2, 0, 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWNyb3BwZXIvIiwic291cmNlcyI6WyJsaWIvdXRpbHMvcmVzaXplLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtBLE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBeUIsRUFBRSxLQUFhLEVBQUUsTUFBYzs7UUFDN0UsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLOztRQUMzQixhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU07SUFDbkMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRXRCLE9BQU8sR0FBRyxZQUFZLEdBQUcsS0FBSzs7UUFDOUIsT0FBTyxHQUFHLGFBQWEsR0FBRyxNQUFNOztRQUNoQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztRQUNyQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztRQUVyQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDbkMsSUFBSSxHQUFHLEVBQUU7O1lBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDOztZQUN6RCxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDOztZQUN6QyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUk7O1lBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJO1FBRXZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsS0FBSyxJQUFJ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O2dCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDL0IsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsYUFBYSxDQUFDO2FBQ3RDO1NBQ0Y7UUFHRCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV2QixNQUFNO1FBQ04sR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBIZXJtaXRlIHJlc2l6ZSAtIGZhc3QgaW1hZ2UgcmVzaXplL3Jlc2FtcGxlIHVzaW5nIEhlcm1pdGUgZmlsdGVyLlxuICogaHR0cHM6Ly9naXRodWIuY29tL3ZpbGl1c2xlL0hlcm1pdGUtcmVzaXplXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhcyhjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICBjb25zdCB3aWR0aF9zb3VyY2UgPSBjYW52YXMud2lkdGg7XG4gIGNvbnN0IGhlaWdodF9zb3VyY2UgPSBjYW52YXMuaGVpZ2h0O1xuICB3aWR0aCA9IE1hdGgucm91bmQod2lkdGgpO1xuICBoZWlnaHQgPSBNYXRoLnJvdW5kKGhlaWdodCk7XG5cbiAgY29uc3QgcmF0aW9fdyA9IHdpZHRoX3NvdXJjZSAvIHdpZHRoO1xuICBjb25zdCByYXRpb19oID0gaGVpZ2h0X3NvdXJjZSAvIGhlaWdodDtcbiAgY29uc3QgcmF0aW9fd19oYWxmID0gTWF0aC5jZWlsKHJhdGlvX3cgLyAyKTtcbiAgY29uc3QgcmF0aW9faF9oYWxmID0gTWF0aC5jZWlsKHJhdGlvX2ggLyAyKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgaWYgKGN0eCkge1xuICAgIGNvbnN0IGltZyA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGhfc291cmNlLCBoZWlnaHRfc291cmNlKTtcbiAgICBjb25zdCBpbWcyID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcbiAgICBjb25zdCBkYXRhID0gaW1nLmRhdGE7XG4gICAgY29uc3QgZGF0YTIgPSBpbWcyLmRhdGE7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgY29uc3QgeDIgPSAoaSArIGogKiB3aWR0aCkgKiA0O1xuICAgICAgICBjb25zdCBjZW50ZXJfeSA9IGogKiByYXRpb19oO1xuICAgICAgICBsZXQgd2VpZ2h0ID0gMDtcbiAgICAgICAgbGV0IHdlaWdodHMgPSAwO1xuICAgICAgICBsZXQgd2VpZ2h0c19hbHBoYSA9IDA7XG4gICAgICAgIGxldCBneF9yID0gMDtcbiAgICAgICAgbGV0IGd4X2cgPSAwO1xuICAgICAgICBsZXQgZ3hfYiA9IDA7XG4gICAgICAgIGxldCBneF9hID0gMDtcblxuICAgICAgICBjb25zdCB4eF9zdGFydCA9IE1hdGguZmxvb3IoaSAqIHJhdGlvX3cpO1xuICAgICAgICBjb25zdCB5eV9zdGFydCA9IE1hdGguZmxvb3IoaiAqIHJhdGlvX2gpO1xuICAgICAgICBsZXQgeHhfc3RvcCA9IE1hdGguY2VpbCgoaSArIDEpICogcmF0aW9fdyk7XG4gICAgICAgIGxldCB5eV9zdG9wID0gTWF0aC5jZWlsKChqICsgMSkgKiByYXRpb19oKTtcbiAgICAgICAgeHhfc3RvcCA9IE1hdGgubWluKHh4X3N0b3AsIHdpZHRoX3NvdXJjZSk7XG4gICAgICAgIHl5X3N0b3AgPSBNYXRoLm1pbih5eV9zdG9wLCBoZWlnaHRfc291cmNlKTtcblxuICAgICAgICBmb3IgKGxldCB5eSA9IHl5X3N0YXJ0OyB5eSA8IHl5X3N0b3A7IHl5KyspIHtcbiAgICAgICAgICBjb25zdCBkeSA9IE1hdGguYWJzKGNlbnRlcl95IC0geXkpIC8gcmF0aW9faF9oYWxmO1xuICAgICAgICAgIGNvbnN0IGNlbnRlcl94ID0gaSAqIHJhdGlvX3c7XG4gICAgICAgICAgY29uc3QgdzAgPSBkeSAqIGR5OyAvL3ByZS1jYWxjIHBhcnQgb2Ygd1xuICAgICAgICAgIGZvciAobGV0IHh4ID0geHhfc3RhcnQ7IHh4IDwgeHhfc3RvcDsgeHgrKykge1xuICAgICAgICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhjZW50ZXJfeCAtIHh4KSAvIHJhdGlvX3dfaGFsZjtcbiAgICAgICAgICAgIGNvbnN0IHcgPSBNYXRoLnNxcnQodzAgKyBkeCAqIGR4KTtcbiAgICAgICAgICAgIGlmICh3ID49IDEpIHtcbiAgICAgICAgICAgICAgLy9waXhlbCB0b28gZmFyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9oZXJtaXRlIGZpbHRlclxuICAgICAgICAgICAgd2VpZ2h0ID0gMiAqIHcgKiB3ICogdyAtIDMgKiB3ICogdyArIDE7XG4gICAgICAgICAgICBjb25zdCBwb3NfeCA9IDQgKiAoeHggKyB5eSAqIHdpZHRoX3NvdXJjZSk7XG4gICAgICAgICAgICAvL2FscGhhXG4gICAgICAgICAgICBneF9hICs9IHdlaWdodCAqIGRhdGFbcG9zX3ggKyAzXTtcbiAgICAgICAgICAgIHdlaWdodHNfYWxwaGEgKz0gd2VpZ2h0O1xuICAgICAgICAgICAgLy9jb2xvcnNcbiAgICAgICAgICAgIGlmIChkYXRhW3Bvc194ICsgM10gPCAyNTUpXG4gICAgICAgICAgICAgIHdlaWdodCA9IHdlaWdodCAqIGRhdGFbcG9zX3ggKyAzXSAvIDI1MDtcbiAgICAgICAgICAgIGd4X3IgKz0gd2VpZ2h0ICogZGF0YVtwb3NfeF07XG4gICAgICAgICAgICBneF9nICs9IHdlaWdodCAqIGRhdGFbcG9zX3ggKyAxXTtcbiAgICAgICAgICAgIGd4X2IgKz0gd2VpZ2h0ICogZGF0YVtwb3NfeCArIDJdO1xuICAgICAgICAgICAgd2VpZ2h0cyArPSB3ZWlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRhdGEyW3gyXSA9IGd4X3IgLyB3ZWlnaHRzO1xuICAgICAgICBkYXRhMlt4MiArIDFdID0gZ3hfZyAvIHdlaWdodHM7XG4gICAgICAgIGRhdGEyW3gyICsgMl0gPSBneF9iIC8gd2VpZ2h0cztcbiAgICAgICAgZGF0YTJbeDIgKyAzXSA9IGd4X2EgLyB3ZWlnaHRzX2FscGhhO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIC8vZHJhd1xuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nMiwgMCwgMCk7XG4gIH1cbn1cbiJdfQ==