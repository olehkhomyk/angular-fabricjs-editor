import { Size } from '../interface/interfaces';





export const defaultCanvasRatio = 2 / 3;

const mainCanvasWidth = 540;

// For how much the presentation canvas smaller than main in px (width and height).
const defaultPresentationOffset = 40;

export const defaultPersonalizedSize =
  getPersonalizationCanvasSize({width: mainCanvasWidth,  height: mainCanvasWidth / defaultCanvasRatio});

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
    width: width - defaultPresentationOffset,
    height: height - defaultPresentationOffset
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
