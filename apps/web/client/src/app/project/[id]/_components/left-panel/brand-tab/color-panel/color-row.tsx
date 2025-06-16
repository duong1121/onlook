interface ColorRowProps {
    label: string;
    colors: string[];
}

export const ColorRow = ({ label, colors }: ColorRowProps) => (
    <div className="flex flex-col gap-1" data-oid=".88c.b3">
        <span className="text-xs text-muted-foreground" data-oid="ahgm5yb">
            {label}
        </span>
        <div className="grid grid-cols-6 gap-1" data-oid="q8i1y18">
            {colors.map((color, index) => (
                <div
                    key={`${label}-${index}`}
                    className="w-full aspect-square rounded-lg cursor-pointer hover:ring-2 hover:ring-border-primary border border-white/10"
                    style={{ backgroundColor: color }}
                    data-oid="f9olbp4"
                />
            ))}
        </div>
    </div>
);
