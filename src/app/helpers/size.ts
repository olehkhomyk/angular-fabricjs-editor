import { Size } from '../interface/interfaces';
import { defaultExportImageWidth, defaultFormatWidth } from './config';
import { defaultAspectRatio } from './ratio';

// Default main canvas width.
export const mainCanvasWidth = 540;

// For how much the personalization canvas smaller than main canvas in px (width and height).
export const defaultPersonalizationOffset = 40;

// For how much reduce the exported personalization offsets.
export const exportedPersonalizationReduction = defaultPersonalizationOffset / mainCanvasWidth;

// Default personalization canvas size;
export const defaultPersonalizationSize =
  getPersonalizationCanvasSize({width: mainCanvasWidth,  height: mainCanvasWidth / defaultAspectRatio});

/**
 * Calculate print size depend on ratio.
 *
 * @param ratio Aspect Ratio.
 */
export function calculatePrintSize(ratio: number): Size {
  return {
    width: defaultExportImageWidth,
    height: defaultExportImageWidth / ratio
  };
}

/**
 * Calculate print format depend on ratio.
 *
 * @param ratio Aspect Ratio.
 */
export function calculateFormat(ratio: number): Array<number> {
  return [ defaultFormatWidth, defaultFormatWidth / ratio ];
}

/**
 * Get canvas size by ratio.
 *
 * @param ratio Ratio format must be reduction number.
 * @doc Usage: getCanvasSizeByRatio(2 / 3).
 */
export function getMainCanvasSizeByRatio(ratio: number): Size {
  return {
    width: mainCanvasWidth,
    height: mainCanvasWidth / ratio
  };
}

/**
 * Get canvas size by ratio.
 *
 * @param size of main canvas.
 * @doc Usage: getCanvasSizeByRatio(2 / 3).
 */
export function getPersonalizationCanvasSize({width, height}: Size): Size {
  return {
    width: width - defaultPersonalizationOffset,
    height: height - defaultPersonalizationOffset
  };
}

// Export image multiplier.
// Usage: use it to multiply the base canvas sizes for export.
export const exportMultiplier = 5;

/**
 * Get export image sizes.
 *
 * @param width base canvas width.
 * @param height base canvas height.
 */
export function getExportImageSizes({ width, height }: Size): Size {
  return {
    width: width * exportMultiplier,
    height: height * exportMultiplier
  };
}
