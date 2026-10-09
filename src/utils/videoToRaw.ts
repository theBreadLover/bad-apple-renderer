import { ffmpeg,  loadFFmpeg } from "./ffmpegClient";
import { fetchFile } from "@ffmpeg/util";

export interface TranscodeOptions {
    width: number;
    height: number;
    onProgress?: (ratio: number) => void;
}

export async function transcodeToRaw(
    input: File | string,
    options: TranscodeOptions
): Promise<Uint8Array> {
    const { width, height, onProgress } = options;

    ffmpeg.on("log",({type, message})=> {
        console.log(`FFmpeg${type}: ${message}`);
    })

    await loadFFmpeg(onProgress);

    const inputName: string = "input.mp4";
    const outputName: string = "output.raw";

    const data: Uint8Array = await fetchFile(input);  //fetch the file
    console.log("file fetched:");


    await ffmpeg.writeFile(inputName, data); // move it to ffmpeg virtual file system
    console.log("file moved:");

    console.log("ffmpeg decoding started");
    await ffmpeg.exec([
        "-i", inputName, // input to be processed
        "-vf", `scale=${width}:${height},format=gray`, //filters
        "-f", "rawvideo", //output format
        outputName // output
    ]);
    console.log("decoding done");

    const raw = await ffmpeg.readFile(outputName); // return the data as raw bytes
    console.log("FFmpeg raw:", raw);
    return raw as Uint8Array;

}