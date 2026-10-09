import {useCallback, useEffect, useState} from "react";
import {transcodeToRaw} from "../utils/videoToRaw.ts";
import {type Frame, splitRawIntoFrames} from "../utils/frameUtils";
import {renderFrame} from "../utils/frameRenderer";
import {type CharsetId, CHARSETS, DEFAULT_CHARSET} from "../utils/charsets";

const WIDTH = 70;
const HEIGHT = 55;
const FPS = 30;

export type RendererStatus = "idle" | "processing" | "ready";

export interface UseVideoRenderer {
	status: RendererStatus;
	progress: number;
	playing: boolean;
	charsetId: CharsetId;
	output: string;
	loadFile: (file: File) => Promise<void>;
	play: () => void;
	pause: () => void;
	selectCharset: (id: CharsetId) => void;
}

/**
 * Owns every piece of renderer state (transcoding, frame playback, and the
 * active character-set) so components stay presentational.
 *
 * Playback and rendering are both driven by `useEffect`, one effect advances
 * `frameIndex` on a fixed-rate interval while `playing` is true, and a second
 * effect re-renders text whenever the frame to show, or the selected charset,
 * changes. That second effect is also what makes switching a preset reflect
 * immediately even while paused — no special-casing needed.
 */
export function useVideoRenderer(): UseVideoRenderer {
	const [status, setStatus] = useState<RendererStatus>("idle");
	const [progress, setProgress] = useState<number>(0);
	const [playing, setPlaying] = useState<boolean>(false);
	const [charsetId, setCharsetId] = useState<CharsetId>(DEFAULT_CHARSET);
	const [frames, setFrames] = useState<Frame[]>([]);
	const [frameIndex, setFrameIndex] = useState<number>(0);
	const [output, setOutput] = useState<string>("");

	// Advance to the next frame on a fixed-rate timer while playing.
	useEffect(() => {
		if (!playing || frames.length === 0) return;

		const intervalId = window.setInterval(() => {
			setFrameIndex((prev) => (prev + 1) % frames.length);
		}, 1000 / FPS);

		return () => window.clearInterval(intervalId);
	}, [playing, frames.length]);

	// Re-render whenever the frame to show, or the active charset, changes.
	useEffect(() => {
		if (frames.length === 0) return;
		setOutput(renderFrame(frames[frameIndex], {width: WIDTH, charset: CHARSETS[charsetId].chars}));
	}, [frames, frameIndex, charsetId]);

	const loadFile = useCallback(async (file: File): Promise<void> => {
		setPlaying(false);
		setStatus("processing");
		setProgress(0);
		setFrames([]);
		setFrameIndex(0);
		setOutput("");

		const raw: Uint8Array = await transcodeToRaw(file, {
			width: WIDTH,
			height: HEIGHT,
			onProgress: (ratio: number) => setProgress(ratio),
		});

		setFrames(splitRawIntoFrames(raw, {width: WIDTH, height: HEIGHT}));
		setStatus("ready");
	}, []);

	const play = useCallback(() => {
		setPlaying((prev) => (frames.length === 0 ? prev : true));
	}, [frames.length]);

	const pause = useCallback(() => setPlaying(false), []);

	const selectCharset = useCallback((id: CharsetId) => setCharsetId(id), []);

	return {status, progress, playing, charsetId, output, loadFile, play, pause, selectCharset};
}