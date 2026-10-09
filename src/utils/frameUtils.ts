export interface FrameDimentions {
    width: number;
    height: number;
}

export type Frame = Uint8Array;

export function splitRawIntoFrames(raw: Uint8Array, dims: FrameDimentions): Frame[] {
    const { width, height } = dims;
    const frameSize: number = width * height; // size of each frame

    const frameCount: number = Math.floor(raw.length / frameSize); // numbers of frames possibles
    const frames: Frame[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
        const start = i * frameSize;
        const end = start + frameSize;
        frames[i] = raw.subarray(start, end);
    }

    return frames;
}