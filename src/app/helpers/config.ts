import { getIconPath, ImagePDFOptions } from './file';

export const imageToPdfConfig: ImagePDFOptions | any = {
  orientation: 'p',
  unit: 'in',
  x: 0,
  y: 0,
  format: [8, 12],
  width: 8,
  height: 12,
  fileName: 'download'
};

export function icons(): Array<any> {
  const arr = new Array(79);

  for (let i = 0; i < arr.length; i++) {
    if (i === 56)  {
      continue;
    }

    arr[i] = getIconPath(`icon${i + 1}`);
  }

  return arr;
}
