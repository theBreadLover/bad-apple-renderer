import type { Frame } from "./frameUtils.ts";

export interface RenderOptions {
    width: number;
    /** Characters ordered darkest -> brightest (e.g. a CHARSETS[id].chars value). */
    charset: string;
}

export function renderFrame(frame: Frame, options: RenderOptions): string {
    const { width, charset } = options;

    // Split by Unicode code point (not UTF-16 code unit) so multi-byte glyphs
    // like emoji are treated as a single character in the ramp.
    const glyphs: string[] = Array.from(charset);

    let output: string = "";

    for (let i = 0; i < frame.length; i++) {
        const pixel = frame[i]; // fetch the data from each pixel
        const idx: number = Math.floor((pixel / 255) * (glyphs.length - 1)); // Normalize range of colors
        output += glyphs[idx];

        if ((i + 1) % width === 0) output += "\n"; // break line every time a row is completed
    }

    return output;
}
