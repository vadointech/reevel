import { PixelCrop } from "react-image-crop";
import { RefObject } from "react";

export async function canvasPreview(
    imgRef: RefObject<HTMLImageElement | null>,
    previewCanvasRef: RefObject<HTMLCanvasElement | null>,
    crop: PixelCrop,
) {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;

    if (!image || !canvas) {
        throw new Error("Crop canvas does not exist");
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    // const pixelRatio = 1;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();

    // 3) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 2) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    );

    ctx.restore();
}