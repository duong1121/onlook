import { useEditorEngine } from '@/components/store/editor';
import { SystemTheme } from '@onlook/models/assets';
import type { TailwindColor } from '@onlook/models/style';
import { Button } from '@onlook/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '@onlook/ui/tooltip';
import { Color, generateUniqueName, toNormalCase } from '@onlook/utility';
import { useState } from 'react';
import { ColorNameInput } from './color-name-input';
import { ColorPopover } from './color-popover';

interface BrandPalletGroupProps {
    title: string;
    colors: TailwindColor[];
    theme: SystemTheme;
    onRename: (groupName: string, newName: string) => void;
    onDelete: (colorName?: string) => void;
    onColorChange?: (
        groupName: string,
        colorIndex: number,
        newColor: Color,
        newName: string,
        parentName?: string,
    ) => void;
    onColorChangeEnd?: (
        groupName: string,
        colorIndex: number,
        newColor: Color,
        newName: string,
        parentName?: string,
    ) => void;
    onDuplicate?: (colorName: string) => void;
    isDefaultPalette?: boolean;
}

export const BrandPalletGroup = ({
    title,
    colors,
    theme,
    onRename,
    onDelete,
    onColorChange,
    onColorChangeEnd,
    onDuplicate,
    isDefaultPalette = false,
}: BrandPalletGroupProps) => {
    const [editingColorIndex, setEditingColorIndex] = useState<number | null>(null);
    const [isAddingNewColor, setIsAddingNewColor] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const editorEngine = useEditorEngine();
    const themeManager = editorEngine.theme;
    const existedName = colors.map((color) => color.name);

    const handleColorChange = (
        index: number,
        newColor: Color,
        newName: string,
        parentName?: string,
    ) => {
        if (onColorChange) {
            onColorChange(title, index, newColor, newName, parentName);
        }
    };

    const handleColorChangeEnd = (
        index: number,
        newColor: Color,
        newName: string,
        parentName?: string,
    ) => {
        if (onColorChangeEnd) {
            onColorChangeEnd(title, index, newColor, newName, parentName);
        }
        setEditingColorIndex(null);
        setIsAddingNewColor(false);
    };

    const getColorValue = (color: TailwindColor) => {
        return theme === SystemTheme.DARK
            ? (color.darkColor ?? color.lightColor)
            : color.lightColor;
    };

    const handleRenameClick = () => {
        setIsRenaming(true);
    };

    const handleViewInCode = (color: TailwindColor) => {
        if (!color.line?.config) {
            return;
        }

        const line =
            theme === SystemTheme.DARK ? color.line.css?.darkMode : color.line.css?.lightMode;

        // invokeMainChannel(MainChannels.VIEW_SOURCE_FILE, {
        //     filePath: themeManager.tailwindConfigPath,
        //     line: color.line.config,
        // });

        // invokeMainChannel(MainChannels.VIEW_SOURCE_FILE, {
        //     filePath: themeManager.tailwindCssPath,
        //     line,
        // });
    };

    const generateUniqueColorName = () => {
        return generateUniqueName(title, existedName);
    };

    return (
        <div className="flex flex-col gap-1 group/palette" data-oid="hg8wfpn">
            <div className="flex justify-between items-center" data-oid="hptajw.">
                {!isDefaultPalette && isRenaming ? (
                    <ColorNameInput
                        initialName={title}
                        onSubmit={(newName) => {
                            onRename(title, newName);
                            setIsRenaming(false);
                        }}
                        onCancel={() => setIsRenaming(false)}
                        onBlur={(newName) => {
                            onRename(title, newName);
                            setIsRenaming(false);
                        }}
                        data-oid="456pfll"
                    />
                ) : (
                    <span
                        className="text-small text-foreground-secondary font-normal"
                        data-oid="fpba.a4"
                    >
                        {toNormalCase(title)}
                    </span>
                )}
                {!isDefaultPalette && (
                    <DropdownMenu data-oid="jmtb78k">
                        <DropdownMenuTrigger asChild data-oid="391w08d">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 p-0 hover:bg-transparent opacity-0 group-hover/palette:opacity-100 [&[data-state=open]]:opacity-100 transition-opacity"
                                data-oid="5m.w702"
                            >
                                <Icons.DotsHorizontal
                                    className="h-4 w-4 text-muted-foreground group-hover:text-foreground"
                                    data-oid="-5:b5x."
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="rounded-md bg-background"
                            align="start"
                            side="bottom"
                            data-oid="rxrcvnl"
                        >
                            <DropdownMenuItem asChild data-oid="bm1ex-:">
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group"
                                    onClick={handleRenameClick}
                                    data-oid="qj65qs0"
                                >
                                    <span
                                        className="flex w-full text-smallPlus items-center"
                                        data-oid="ctxyug7"
                                    >
                                        <Icons.Pencil
                                            className="mr-2 h-4 w-4 text-foreground-secondary group-hover:text-foreground-active"
                                            data-oid="9c0l08l"
                                        />

                                        <span data-oid="t-1xecv">Rename</span>
                                    </span>
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild data-oid="tydg9te">
                                <Button
                                    variant="ghost"
                                    className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group"
                                    onClick={() => onDelete()}
                                    data-oid="2qj2.-b"
                                >
                                    <span
                                        className="flex w-full text-smallPlus items-center"
                                        data-oid="xf6cs4u"
                                    >
                                        <Icons.Trash
                                            className="mr-2 h-4 w-4 text-foreground-secondary group-hover:text-foreground-active"
                                            data-oid="s7tcbjh"
                                        />

                                        <span data-oid="xcwv.vl">Delete</span>
                                    </span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
            <div className="flex flex-col gap-2" data-oid="_orpng8">
                <div className="grid grid-cols-6 gap-1" data-oid="5tr4zma">
                    {colors ? (
                        colors.map((color, index) => (
                            <div
                                key={`${title}-${index}`}
                                className="relative group"
                                data-oid="_kd95:_"
                            >
                                {editingColorIndex === index ? (
                                    <ColorPopover
                                        color={Color.from(getColorValue(color))}
                                        brandColor={color.name}
                                        onClose={() => setEditingColorIndex(null)}
                                        onColorChange={(newColor, newName) =>
                                            handleColorChange(index, newColor, newName)
                                        }
                                        onColorChangeEnd={(newColor, newName) =>
                                            handleColorChangeEnd(index, newColor, newName)
                                        }
                                        isDefaultPalette={isDefaultPalette}
                                        existedName={existedName}
                                        data-oid="v-7n5k:"
                                    />
                                ) : (
                                    <>
                                        <div
                                            className="w-full aspect-square rounded-lg cursor-pointer hover:ring-2 hover:ring-border-primary border border-primary/10"
                                            style={{ backgroundColor: getColorValue(color) }}
                                            data-oid="r.:.ms:"
                                        />

                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 [&[data-state=open]]:opacity-100"
                                            data-oid="upc1m.5"
                                        >
                                            <DropdownMenu data-oid=".w992g.">
                                                <DropdownMenuTrigger asChild data-oid="g9ez2j8">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-[85%] w-[85%] p-0 bg-black hover:bg-black rounded-md flex items-center justify-center"
                                                        data-oid="gp4_ib:"
                                                    >
                                                        <Tooltip data-oid="dr80d49">
                                                            <TooltipTrigger
                                                                asChild
                                                                data-oid="fdbdbwq"
                                                            >
                                                                <Icons.DotsHorizontal
                                                                    className="h-4 w-4 text-white"
                                                                    data-oid="0wxxe2u"
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipPortal data-oid="sh52h85">
                                                                <TooltipContent
                                                                    side="top"
                                                                    data-oid="iijsdyl"
                                                                >
                                                                    <div
                                                                        className="flex flex-col"
                                                                        data-oid="0t.pw2q"
                                                                    >
                                                                        <span
                                                                            className="text-sm"
                                                                            data-oid="3x0e4y7"
                                                                        >
                                                                            {toNormalCase(
                                                                                color.name,
                                                                            )}
                                                                        </span>
                                                                        <span
                                                                            className="text-xs text-background-tertiary"
                                                                            data-oid="zfx8glc"
                                                                        >
                                                                            {getColorValue(color)}
                                                                        </span>
                                                                    </div>
                                                                </TooltipContent>
                                                            </TooltipPortal>
                                                        </Tooltip>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    className="rounded-md bg-background p-0 ml-1 mt-[-4px] min-w-[140px]"
                                                    align="start"
                                                    side="right"
                                                    data-oid="la-uts-"
                                                >
                                                    <div
                                                        className="flex items-start gap-2 px-2.5 py-2 border-b border-border mb-0.5"
                                                        data-oid="ruhcr81"
                                                    >
                                                        <div
                                                            className="w-4 h-4 rounded-sm mt-[2px] hidden"
                                                            style={{
                                                                backgroundColor:
                                                                    getColorValue(color),
                                                            }}
                                                            data-oid="nigdh-w"
                                                        />

                                                        <div
                                                            className="flex flex-col"
                                                            data-oid="_-b.llw"
                                                        >
                                                            <span
                                                                className="text-sm text-foreground"
                                                                data-oid="ayg7jjq"
                                                            >
                                                                {toNormalCase(color.name)}
                                                            </span>
                                                            <span
                                                                className="text-xs text-muted-foreground"
                                                                data-oid="syrgsr3"
                                                            >
                                                                {getColorValue(color)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <DropdownMenuItem asChild data-oid="9gkagzq">
                                                        <Button
                                                            variant="ghost"
                                                            className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group px-2 py-1"
                                                            onClick={() =>
                                                                setEditingColorIndex(index)
                                                            }
                                                            data-oid="u.9la8w"
                                                        >
                                                            <span
                                                                className="flex w-full text-sm items-center"
                                                                data-oid="vzv-5zi"
                                                            >
                                                                <Icons.Pencil
                                                                    className="mr-2 h-4 w-4"
                                                                    data-oid="b-o:r-3"
                                                                />

                                                                <span data-oid="1vs0gz9">
                                                                    Edit color
                                                                </span>
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild data-oid="wyxs9f5">
                                                        <Button
                                                            variant="ghost"
                                                            className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group px-2 py-1"
                                                            onClick={() =>
                                                                onDuplicate?.(color.name)
                                                            }
                                                            data-oid="7d9u80j"
                                                        >
                                                            <span
                                                                className="flex w-full text-sm items-center"
                                                                data-oid="6j8tpj2"
                                                            >
                                                                <Icons.Copy
                                                                    className="mr-2 h-4 w-4"
                                                                    data-oid="fjjxoo1"
                                                                />

                                                                <span data-oid="5ot_e03">
                                                                    Duplicate
                                                                </span>
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuItem>
                                                    {/* <DropdownMenuItem asChild>
                      <Button
                      variant="ghost"
                      className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group px-2 py-1"
                      onClick={() => handleViewInCode(color)}
                      >
                      <span className="flex w-full text-sm items-center">
                      <Icons.ExternalLink className="mr-2 h-4 w-4" />
                      <span>View in code</span>
                      </span>
                      </Button>
                      </DropdownMenuItem> */}
                                                    {!isDefaultPalette ? (
                                                        <DropdownMenuItem
                                                            asChild
                                                            data-oid="xtmifbk"
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group px-2 py-1"
                                                                onClick={() => onDelete(color.name)}
                                                                data-oid="4e.3oja"
                                                            >
                                                                <span
                                                                    className="flex w-full text-sm items-center"
                                                                    data-oid="2600myb"
                                                                >
                                                                    <Icons.Trash
                                                                        className="mr-2 h-4 w-4"
                                                                        data-oid="_8yn.xs"
                                                                    />

                                                                    <span data-oid="z1zpb6g">
                                                                        Delete
                                                                    </span>
                                                                </span>
                                                            </Button>
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        color.override && (
                                                            <DropdownMenuItem
                                                                asChild
                                                                data-oid="9_:82.x"
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group px-2 py-1"
                                                                    onClick={() =>
                                                                        onDelete(color.name)
                                                                    }
                                                                    data-oid=":jxu7-z"
                                                                >
                                                                    <span
                                                                        className="flex w-full text-sm items-center"
                                                                        data-oid="pd9wn2_"
                                                                    >
                                                                        <Icons.Reset
                                                                            className="mr-2 h-4 w-4"
                                                                            data-oid="v1gkdll"
                                                                        />

                                                                        <span data-oid="sdsleiy">
                                                                            Reset override
                                                                        </span>
                                                                    </span>
                                                                </Button>
                                                            </DropdownMenuItem>
                                                        )
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                    {isAddingNewColor ? (
                        <ColorPopover
                            color={Color.from('#FFFFFF')}
                            brandColor={generateUniqueColorName()}
                            onClose={() => setIsAddingNewColor(false)}
                            onColorChange={(newColor, newName) =>
                                handleColorChange(colors?.length || 0, newColor, newName, title)
                            }
                            onColorChangeEnd={(newColor, newName) =>
                                handleColorChangeEnd(colors?.length || 0, newColor, newName, title)
                            }
                            existedName={existedName}
                            data-oid="2o6bgn5"
                        />
                    ) : (
                        <Button
                            onClick={() => setIsAddingNewColor(true)}
                            variant="outline"
                            size="icon"
                            className="w-full aspect-square rounded-lg border border-dashed flex items-center justify-center bg-transparent hover:bg-transparent"
                            data-oid="hy0req1"
                        >
                            <Icons.Plus className="h-4 w-4" data-oid="lei3w75" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
