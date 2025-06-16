import { useEditorEngine } from '@/components/store/editor';
import { SystemTheme } from '@onlook/models/assets';
import type { TailwindColor } from '@onlook/models/style';
import { ColorPicker } from '@onlook/ui/color-picker';
import { Icons } from '@onlook/ui/icons';
import { Input } from '@onlook/ui/input';
import { Separator } from '@onlook/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { Color, toNormalCase, type Palette } from '@onlook/utility';
import { useEffect, useRef, useState } from 'react';

const ColorGroup = ({
    name,
    colors,
    onColorSelect,
    isDefault = false,
    isExpanded = true,
}: {
    name: string;
    colors: TailwindColor[];
    onColorSelect: (color: TailwindColor) => void;
    isDefault?: boolean;
    isExpanded?: boolean;
}) => {
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        setExpanded(isExpanded);
    }, [isExpanded]);

    return (
        <div className="w-full group" data-oid="vgl.u:0">
            <button
                aria-label={`Toggle ${expanded ? 'closed' : 'open'}`}
                className="rounded flex items-center p-1 w-full"
                onClick={() => setExpanded(!expanded)}
                data-oid="vn-jhyq"
            >
                <div className="flex items-center gap-1 flex-1" data-oid="34st89w">
                    <span className="text-xs font-normal capitalize" data-oid="a.lxo1w">
                        {toNormalCase(name)}
                    </span>
                    {isDefault && (
                        <span className="ml-2 text-xs text-muted-foreground" data-oid="8uu-b9f">
                            Default
                        </span>
                    )}
                </div>
                {expanded ? (
                    <Icons.ChevronUp data-oid="40uwbib" />
                ) : (
                    <Icons.ChevronDown data-oid="003nwqw" />
                )}
            </button>

            {expanded &&
                colors.map((color) => (
                    <div
                        key={color.name}
                        className="flex items-center gap-1.5 hover:bg-background-secondary rounded-md p-1 hover:cursor-pointer"
                        onClick={() => onColorSelect(color)}
                        data-oid="tmu2ww_"
                    >
                        <div
                            className="w-5 h-5 rounded-sm"
                            style={{ backgroundColor: color.lightColor }}
                            data-oid="n7x02v2"
                        />

                        <span className="text-xs font-normal truncate max-w-32" data-oid="-_fntz3">
                            {toNormalCase(color.name)}
                        </span>
                    </div>
                ))}
        </div>
    );
};

enum TabValue {
    BRAND = 'brand',
    CUSTOM = 'custom',
}

interface ColorPickerProps {
    color: Color;
    onChange: (color: Color | TailwindColor) => void;
    onChangeEnd: (color: Color | TailwindColor) => void;
}

export const ColorPickerContent: React.FC<ColorPickerProps> = ({
    color,
    onChange,
    onChangeEnd,
}) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [palette, setPalette] = useState<Palette>(color.palette);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const editorEngine = useEditorEngine();
    const [colorGroups, setColorGroups] = useState<Record<string, TailwindColor[]>>({});
    const [colorDefaults, setColorDefaults] = useState<Record<string, TailwindColor[]>>({});
    const [theme] = useState<SystemTheme>(SystemTheme.LIGHT);

    useEffect(() => {
        setPalette(color.palette);
    }, [color]);

    useEffect(() => {
        (async () => {
            try {
                await editorEngine.theme.scanConfig();
                setColorGroups(editorEngine.theme.colorGroups);
                setColorDefaults(editorEngine.theme.colorDefaults);
            } catch (error) {
                console.error('Failed to scan fonts:', error);
            }
        })();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearchQuery('');
        }
        if (e.key === 'Escape') {
            setSearchQuery('');
            inputRef.current?.blur();
        }
    };

    const filteredColorGroups = Object.entries(colorGroups).filter(([name, colors]) => {
        const query = searchQuery.toLowerCase();
        return (
            name.toLowerCase().includes(query) ||
            colors.some((color) => color.name.toLowerCase().includes(query))
        );
    });

    const filteredColorDefaults = Object.entries(colorDefaults).filter(([name, colors]) => {
        const query = searchQuery.toLowerCase();
        return (
            name.toLowerCase().includes(query) ||
            colors.some((color) => color.name.toLowerCase().includes(query))
        );
    });

    const handleColorSelect = (colorItem: TailwindColor) => {
        onChangeEnd(colorItem);
    };

    function renderPalette() {
        const colors = Object.keys(palette.colors);
        return (
            <div className="px-0.5 py-1" data-oid="ccu0.sl">
                {viewMode === 'grid' ? (
                    <div
                        className="grid grid-cols-7 gap-1.5 p-1 text-center justify-between"
                        data-oid="7fu7hew"
                    >
                        {colors.map((level) => (
                            <div
                                key={level}
                                className="w-6 h-6 content-center cursor-pointer rounded border-[0.5px] border-foreground-tertiary/50"
                                style={{ backgroundColor: palette.colors[Number.parseInt(level)] }}
                                onClick={() =>
                                    onChangeEnd(
                                        Color.from(
                                            palette.colors[Number.parseInt(level)] ?? '#000000',
                                        ),
                                    )
                                }
                                data-oid="-blwjxr"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col" data-oid="071splr">
                        {colors.map((level) => (
                            <div
                                className="gap-2 hover:bg-background-secondary p-1 flex align-center cursor-pointer rounded-md group"
                                key={level}
                                onClick={() =>
                                    onChangeEnd(
                                        Color.from(
                                            palette.colors[Number.parseInt(level)] ?? '#000000',
                                        ),
                                    )
                                }
                                data-oid="8htt2sy"
                            >
                                <div
                                    key={level}
                                    className="w-5 h-5 content-center rounded border-[0.5px] border-foreground-tertiary/50"
                                    style={{
                                        backgroundColor: palette.colors[Number.parseInt(level)],
                                    }}
                                    data-oid="0t5_9dn"
                                />

                                <div
                                    className="text-small text-foreground-secondary group-hover:text-foreground-primary"
                                    data-oid="ooc6e16"
                                >
                                    <span data-oid="8gatjhi">
                                        {palette.name}-{level}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between items-center" data-oid="kuf::hm">
            <Tabs defaultValue={TabValue.BRAND} className="w-full" data-oid="4a1b32b">
                <TabsList className="bg-transparent px-2 m-0 gap-2" data-oid="0y0tpt3">
                    <TabsTrigger
                        value={TabValue.BRAND}
                        className="bg-transparent text-xs p-1 hover:text-foreground-primary"
                        data-oid="81k3o.a"
                    >
                        Brand
                    </TabsTrigger>
                    <TabsTrigger
                        value={TabValue.CUSTOM}
                        className="bg-transparent text-xs p-1 hover:text-foreground-primary"
                        data-oid="i.znqic"
                    >
                        Custom
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={TabValue.BRAND} className="p-0 m-0 text-xs" data-oid="-0lux46">
                    <div className="border-b border-t" data-oid="j:mcorf">
                        <div className="relative" data-oid="_3zlfu.">
                            <Icons.MagnifyingGlass
                                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
                                data-oid=":5eg-1a"
                            />

                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Search colors"
                                className="text-xs pl-7 pr-8 rounded-none border-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                data-oid="3m0no:n"
                            />

                            {searchQuery && (
                                <button
                                    className="absolute right-[1px] top-[1px] bottom-[1px] aspect-square hover:bg-background-onlook active:bg-transparent flex items-center justify-center rounded-r-[calc(theme(borderRadius.md)-1px)] group"
                                    onClick={() => setSearchQuery('')}
                                    data-oid="wx:r70i"
                                >
                                    <Icons.CrossS
                                        className="h-3 w-3 text-foreground-primary/50 group-hover:text-foreground-primary"
                                        data-oid="2o:rd9d"
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-1 overflow-y-auto max-h-96 p-2"
                        data-oid="oc0doig"
                    >
                        {filteredColorGroups.map(([name, colors]) => (
                            <ColorGroup
                                key={name}
                                name={name}
                                colors={colors}
                                onColorSelect={handleColorSelect}
                                data-oid="26d:qx6"
                            />
                        ))}
                        {filteredColorDefaults.map(([name, colors]) => (
                            <ColorGroup
                                key={name}
                                name={name}
                                colors={colors}
                                onColorSelect={handleColorSelect}
                                isDefault
                                data-oid="8aw2.6e"
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value={TabValue.CUSTOM} className="p-0 m-0" data-oid="vk9nu1h">
                    <ColorPicker
                        color={color}
                        onChange={onChange}
                        onChangeEnd={(val) => {
                            onChangeEnd?.(val);
                            setPalette(val.palette);
                        }}
                        data-oid="qiytin5"
                    />

                    <Separator data-oid="nbeo_u." />
                    <div
                        className="flex flex-row items-center justify-between w-full px-2 py-1"
                        data-oid="6::u4m9"
                    >
                        <span className="text-foreground-secondary text-small" data-oid="fr3e1bn">
                            {palette.name}
                        </span>
                        <button
                            aria-label={`Toggle ${viewMode === 'grid' ? 'list' : 'grid'} mode`}
                            className="text-foreground-tertiary hover:text-foreground-hover rounded"
                            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                            data-oid="godj:d2"
                        >
                            {viewMode === 'grid' ? (
                                <Icons.ViewGrid className="h-4 w-4" data-oid="gfiz8q1" />
                            ) : (
                                <Icons.ViewHorizontal className="h-4 w-4" data-oid="okc3i3u" />
                            )}
                        </button>
                    </div>
                    <Separator data-oid="g7jtof1" />
                    <div className="h-28 px-1 overflow-hidden overflow-y-auto" data-oid="sy909nb">
                        {renderPalette()}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
