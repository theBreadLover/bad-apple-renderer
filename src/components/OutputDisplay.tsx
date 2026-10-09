export interface OutputDisplayProps {
    text: string;
}

export function OutputDisplay({ text }: OutputDisplayProps) {
    return (
        <section className="max-h-[70vh] overflow-auto rounded-lg bg-panel p-4">
            <pre className="whitespace-pre text-center font-mono text-[10px] leading-[10px]">{text}</pre>
        </section>
    );
}
