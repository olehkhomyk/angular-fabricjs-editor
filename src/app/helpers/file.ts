import jsPDF, { ImageOptions } from 'jspdf';


/**
 * Get icon path.
 *
 * @param name Icon name.
 */
export function getIconPath(name: string): string {
  return `../assets/icons/${name}.png`;
}



/**
 * Get background image path.
 *
 * @param key Image key.
 * @param fullSize if true than full size of picture.
 */
export function getBackgroundPath(key: string, fullSize: boolean = false): string {
  return `../assets/backgrounds/${key}_${fullSize ? 'medium' : 'thumb'}.jpg`;
}

/**
 * Download image.
 *
 * @param image base64 image data.
 * @param fileName name of downloaded file.
 */
export function downloadImage(image: string, fileName: string = 'image'): void {
  const link = document.createElement('a');

  link.href = image;
  link.download =  `${fileName}.png`;
  link.click();
  link.remove();
}

/**
 * Download pdf file;
 *
 * @param options PDF Image options.
 */
export function downloadPDF(options: ImagePDFOptions): void {
  const pdf = new jsPDF(options.orientation || 'p', options.unit || 'in', options.format || [8, 12]);

  pdf.addImage(options.imageData, options.x, options.y, options.width, options.height);
  pdf.save(`${options.fileName || 'download'}.pdf`);
}

export interface ImagePDFOptions extends ImageOptions {
  orientation?: 'p' | 'portrait' | 'l' | 'landscape';
  unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc';
  format?: string | Array<number>;
  fileName?: string;
}

/**
 * Download pdf file;
 *
 * @param data Object.
 * @param fileName Name of downloading file.
 */
export function downloadJSON(data: any, fileName: string = 'data'): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
  const link = document.createElement('a');

  link.setAttribute('href',     dataStr);
  link.setAttribute('download', fileName + '.json');

  link.click();
  link.remove();
}
