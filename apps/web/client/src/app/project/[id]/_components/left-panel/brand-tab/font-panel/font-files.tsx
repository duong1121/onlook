import { VARIANTS } from '@onlook/fonts';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { extractFontParts } from '@onlook/utility';
import { observer } from 'mobx-react-lite';

export interface FontFile {
    name: string;
    file: {
        name: string;
        buffer: number[];
    };
    weight: string;
    style: string;
}

interface FontFilesProps {
    fontFiles: FontFile[];
    onWeightChange: (index: number, weight: string) => void;
    onStyleChange: (index: number, style: string) => void;
    onRemoveFont: (index: number) => void;
}

const FontFiles = observer(
    ({ fontFiles, onWeightChange, onStyleChange, onRemoveFont }: FontFilesProps) => {
        if (fontFiles.length === 0) {
            return null;
        }

        return (
            <div className="space-y-2 flex-1 max-h-[350px] pb-6 overflow-y-auto" data-oid="66vq2nq">
                {fontFiles.map((font, index) => (
                    <div
                        key={index}
                        className="flex flex-col space-y-2 border border-white/10 rounded-lg p-3 bg-black/10"
                        data-oid="43x:deh"
                    >
                        <div className="flex items-center justify-between" data-oid="-gnrod:">
                            <div className="flex flex-col" data-oid="1s73wc0">
                                <span className="text-sm font-normal" data-oid="46ej.f5">
                                    {extractFontParts(font.file.name).family}
                                </span>
                                <span className="text-xs text-muted-foreground" data-oid="ldzky-z">
                                    {font.file.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-2" data-oid="wa20x1m">
                                <div className="relative" data-oid="x:anlo9">
                                    <select
                                        className="appearance-none bg-black/20 border border-white/10 rounded-md text-sm p-2 pr-8 text-white cursor-pointer hover:bg-background-hover hover:text-accent-foreground hover:border-border-hover"
                                        value={font.weight}
                                        onChange={(e) => onWeightChange(index, e.target.value)}
                                        data-oid="ot6t8bv"
                                    >
                                        {VARIANTS.map((variant) => (
                                            <option
                                                key={variant.value}
                                                value={variant.value}
                                                data-oid="2yzxygo"
                                            >
                                                {variant.name} ({variant.value})
                                            </option>
                                        ))}
                                    </select>
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                                        data-oid="qj8511j"
                                    >
                                        <Icons.ChevronDown
                                            className="h-4 w-4 text-muted-foreground"
                                            data-oid="oiabac6"
                                        />
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 border border-white/10 bg-black/20 rounded-md"
                                    onClick={() => onRemoveFont(index)}
                                    data-oid="6.5xi-a"
                                >
                                    <Icons.Trash
                                        className="h-4 w-4 text-muted-foreground"
                                        data-oid="bo:-wvk"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
);

export default FontFiles;
