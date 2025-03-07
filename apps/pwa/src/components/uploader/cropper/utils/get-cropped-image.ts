import { RefObject } from "react";
import { PixelCrop } from "react-image-crop";

function calculateCompression(width: number, height: number, constant = 7973632) {
    const area = width * height;
    return Math.min(constant / area, 1);
}

export async function getCroppedImage(
    imgRef: RefObject<HTMLImageElement | null>,
    previewCanvasRef: RefObject<HTMLCanvasElement | null>,
    completedCrop: PixelCrop,
): Promise<Blob> {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
        throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
        throw new Error("No 2d context");
    }

    ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        offscreen.width,
        offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const quality = calculateCompression(image.width, image.height);
    return offscreen.convertToBlob({
        type: "image/jpeg",
        quality: quality,
    });
}