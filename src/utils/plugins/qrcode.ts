import { toCanvas, toDataURL } from "qrcode";

export function generateQR(canvas: HTMLCanvasElement, url: string) {
  toCanvas(canvas, url);
}

export function generateImgBase64(url: string) {
  return new Promise((resolve, reject) => {
    toDataURL(url, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
