import type {ChangeEvent} from "react";
import {CHARSET_ORDER, type CharsetId, CHARSETS} from "../utils/charsets.ts";

export interface CharsetSelectProps {
	value: CharsetId;
	onChange: (id: CharsetId) => void;
}

/**
 * Dropdown built entirely from the CHARSETS config — adding a new preset
 * there is the only change needed for it to show up here.
 */
export function CharsetSelect({value, onChange}: CharsetSelectProps) {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as CharsetId);
	};

	return (
		<label className="flex items-center gap-2 rounded-lg border border-accent bg-panel px-4 py-2 font-medium text-accent">
			<span>Character Set</span>
			<select
				value={value}
				onChange={handleChange}
				className="cursor-pointer rounded-lg border border-accent bg-canvas px-2 py-1 text-sm font-normal text-slate-100"
			>
				{CHARSET_ORDER.map((id) => (
					<option key={id}
					        value={id}>
						{CHARSETS[id].label}
					</option>
				))}
			</select>
		</label>
	);
}
