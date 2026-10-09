import {useEffect} from "react";
import {useVideoRenderer} from "./hooks/useVideoRenderer";
import {VideoControls} from "./components/VideoControls";
import {CharsetSelect} from "./components/CharsetSelect";
import {ProgressBar} from "./components/ProgressBar";
import {OutputDisplay} from "./components/OutputDisplay";
import {CHARSETS} from "./utils/charsets";

export default function App() {
	const {status, progress, charsetId, output, loadFile, play, pause, selectCharset} = useVideoRenderer();

	const controlsDisabled = status !== "ready";

	const displayText =
		status === "idle" ? "" : status === "processing" ? "Processing video..." : output || "Ready to play!";

	// Keep the browser tab title in sync with what's happening, including
	// which charset is active once a video is loaded.
	useEffect(() => {
		if (status === "processing") {
			document.title = "Processing… — Bad Apple Renderer";
		} else if (status === "ready") {
			document.title = `${CHARSETS[charsetId].label} — Bad Apple Renderer`;
		} else {
			document.title = "Bad Apple Renderer";
		}
	}, [status, charsetId]);

	return (
		<div className="flex min-h-screen flex-col items-center bg-canvas p-8 font-sans text-slate-100">
			<header className="mb-8 text-center">
				<h1 className="mb-2 text-3xl font-bold">Bad Apple Renderer</h1>
				<p className="text-slate-400">FFmpeg WASM + React + Tailwind CSS</p>
			</header>

			<main className="w-full max-w-3xl">
				<ProgressBar ratio={progress}/>

				<section className="mb-4 flex flex-wrap items-center gap-4">
					<VideoControls
						controlsDisabled={controlsDisabled}
						onFileSelected={loadFile}
						onPlay={play}
						onPause={pause}
					/>
					<CharsetSelect value={charsetId}
					               onChange={selectCharset}/>
				</section>

				<OutputDisplay text={displayText}/>
			</main>
		</div>
	);
}

