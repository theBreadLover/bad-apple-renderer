import type {ChangeEvent} from "react";

export interface VideoControlsProps {
	controlsDisabled: boolean;
	onFileSelected: (file: File) => void;
	onPlay: () => void;
	onPause: () => void;
}

export function VideoControls({controlsDisabled, onFileSelected, onPlay, onPause}: VideoControlsProps) {
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) onFileSelected(file);
	};

	return (
		<>
			<label className="cursor-pointer rounded-lg border border-accent bg-panel px-4 py-2 font-medium text-accent">
				<span>Select Video</span>
				<input type="file"
							 accept="video/*"
							 className="hidden"
							 onChange={handleFileChange}/>
			</label>

			<button
				type="button"
				disabled={controlsDisabled}
				onClick={onPlay}
				className="rounded-lg bg-panel px-4 py-2 text-slate-100 transition-colors enabled:hover:bg-accent enabled:hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
			>
				Play
			</button>

			<button
				type="button"
				disabled={controlsDisabled}
				onClick={onPause}
				className="rounded-lg bg-panel px-4 py-2 text-slate-100 transition-colors enabled:hover:bg-accent enabled:hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
			>
				Pause
			</button>
		</>
	);
}
