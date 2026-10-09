/**
 * Centralized character-set configuration for the renderer.
 *
 * Every preset is ordered darkest -> brightest. To add a new preset later,
 * add one entry here — nothing else in the app needs to change
 * (the dropdown and the renderer both read from this file).
 */

export type CharsetId =
    | "ascii"
    | "blocks"
    | "minimal"
    | "binary"
    | "braille"
    | "bread"
    | "hearts";

export interface CharsetPreset {
    id: CharsetId;
    label: string;
    /** Characters ordered darkest -> brightest. Read with Array.from() so that
     * multi-code-unit characters (like emoji) are treated as single glyphs. */
    chars: string;
}

export const CHARSETS: Record<CharsetId, CharsetPreset> = {
    ascii: { id: "ascii", label: "ASCII Classic", chars: "@%#*+=-:. " },
    blocks: { id: "blocks", label: "Dense Blocks", chars: "█▓▒░ " },
    minimal: { id: "minimal", label: "Minimal", chars: "█▄▀ " },
    binary: { id: "binary", label: "Binary", chars: "10" },
    braille: { id: "braille", label: "Braille", chars: "⣿⣷⣶⣤⣀ " },
    bread: { id: "bread", label: "Bread Mode", chars: "🍞🥖🥐🧈 " },
    hearts: { id: "hearts", label: "Grayscale Hearts", chars: "🖤🩶🤍" },
};

export const DEFAULT_CHARSET: CharsetId = "ascii";

/** Ordered list for building the dropdown — keeps presets in a stable, readable order. */
export const CHARSET_ORDER: CharsetId[] = [
    "ascii",
    "blocks",
    "minimal",
    "binary",
    "braille",
    "bread",
    "hearts",
];
