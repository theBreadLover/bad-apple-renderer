import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const ffmpeg: FFmpeg = new FFmpeg();


const BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";

export async function loadFFmpeg(
    onProgress?: (ratio: number) => void
): Promise<void> {
    if (ffmpeg.loaded) return;

    ffmpeg.on("progress", ({ progress }) => {
        if (onProgress) onProgress(progress);
    })


    console.log("calling ffmpeg load...");
    await ffmpeg.load({
        coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    console.log("ffmpeg loaded");
}