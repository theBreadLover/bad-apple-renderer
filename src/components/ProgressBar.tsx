export interface ProgressBarProps {
    /** 0..1 */
    ratio: number;
}

export function ProgressBar({ ratio }: ProgressBarProps) {
    return (
        <div
            className="mb-4 h-2 w-full overflow-hidden rounded-full bg-neutral-800"
            role="progressbar"
            aria-valuenow={Math.round(ratio * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${ratio * 100}%` }}
            />
        </div>
    );
}
