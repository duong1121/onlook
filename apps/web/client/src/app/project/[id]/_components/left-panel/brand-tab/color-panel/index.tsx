import { useEditorEngine } from '@/components/store/editor';
import { SystemTheme } from '@onlook/models/assets';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { cn } from '@onlook/ui/utils';
import type { Color } from '@onlook/utility';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ColorNameInput } from './color-name-input';
import { BrandPalletGroup } from './color-pallet-group';

const ColorPanel = observer(() => {
    const [theme, setTheme] = useState<SystemTheme>(SystemTheme.LIGHT);
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false);

    const editorEngine = useEditorEngine();
    const themeManager = editorEngine.theme;

    const { colorGroups, colorDefaults } = themeManager;

    useEffect(() => {
        themeManager.scanConfig();
    }, []);

    const handleRename = async (groupName: string, newName: string) => {
        await themeManager.rename(groupName, newName);
    };

    const handleDelete = async (groupName: string, colorName?: string) => {
        await themeManager.delete(groupName, colorName);
    };

    const handleColorChange = async (
        groupName: string,
        index: number,
        newColor: Color,
        newName: string,
        parentName?: string,
    ) => {
        await themeManager.update(groupName, index, newColor, newName, parentName, theme, false);
    };

    const handleColorChangeEnd = async (
        groupName: string,
        index: number,
        newColor: Color,
        newName: string,
        parentName?: string,
    ) => {
        await themeManager.update(groupName, index, newColor, newName, parentName, theme, true);
    };

    const handleDuplicate = async (
        groupName: string,
        colorName: string,
        isDefaultPalette?: boolean,
    ) => {
        await themeManager.duplicate(groupName, colorName, isDefaultPalette, theme);
    };

    const handleAddNewGroup = async (newName: string) => {
        await themeManager.add(newName);
        setIsAddingNewGroup(false);
    };

    const handleDefaultColorChange = async (
        groupName: string,
        colorIndex: number,
        newColor: Color,
    ) => {
        await themeManager.handleDefaultColorChange(groupName, colorIndex, newColor, theme);
    };

    const handleClose = () => {
        editorEngine.state.brandTab = null;
    };

    return (
        <div
            className="text-active flex h-full w-full flex-grow flex-col overflow-y-auto p-0 text-xs"
            data-oid="92r7_dc"
        >
            <div
                className="border-border bg-background fixed top-0 right-0 left-0 z-10 flex items-center justify-between border-b py-1.5 pr-2.5 pl-4"
                data-oid=":6jg0wh"
            >
                <h2 className="text-foreground text-sm font-normal" data-oid="t93rx:p">
                    Brand Colors
                </h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-background-secondary h-7 w-7 rounded-md"
                    onClick={handleClose}
                    data-oid="hmhftye"
                >
                    <Icons.CrossS className="h-4 w-4" data-oid="atf-0a4" />
                </Button>
            </div>
            {/* Theme Toggle */}
            <div
                className="border-border mt-[2.5rem] flex gap-2 border-b px-4 py-3"
                data-oid="nbw.bba"
            >
                <Button
                    variant={theme === SystemTheme.LIGHT ? 'default' : 'outline'}
                    className={cn(
                        'hover:bg-background-secondary w-full flex-1 gap-2 border-none bg-transparent px-0 text-gray-200 shadow-none',
                        theme === SystemTheme.LIGHT && 'bg-gray-900 text-white',
                    )}
                    onClick={() => setTheme(SystemTheme.LIGHT)}
                    data-oid="_yjhxw3"
                >
                    <Icons.Sun className="h-4 w-4" data-oid="aaz87_t" />
                    Light mode
                </Button>
                <Button
                    variant={theme === SystemTheme.DARK ? 'default' : 'outline'}
                    className={cn(
                        'hover:bg-background-secondary w-full flex-1 gap-2 border-none bg-transparent px-0 text-gray-200 shadow-none',
                        theme === SystemTheme.DARK && 'bg-gray-900 text-white',
                    )}
                    onClick={() => setTheme(SystemTheme.DARK)}
                    data-oid="tk2x5wg"
                >
                    <Icons.Moon className="h-4 w-4" data-oid="s2d3g8x" />
                    Dark mode
                </Button>
            </div>

            {/* Brand Palette Groups section */}
            <div
                className="border-border flex flex-col gap-4 border-b px-4 py-[18px]"
                data-oid="9-9k5gh"
            >
                <div className="flex flex-col gap-3" data-oid="rod4qlo">
                    {/* Theme color groups */}
                    {Object.entries(colorGroups).map(([groupName, colors]) => (
                        <BrandPalletGroup
                            key={groupName}
                            theme={theme}
                            title={groupName}
                            colors={colors}
                            onRename={handleRename}
                            onDelete={(colorName) => handleDelete(groupName, colorName)}
                            onColorChange={handleColorChange}
                            onColorChangeEnd={handleColorChangeEnd}
                            onDuplicate={(colorName) => handleDuplicate(groupName, colorName)}
                            data-oid="amenyu9"
                        />
                    ))}
                </div>
                {isAddingNewGroup ? (
                    <div className="flex flex-col gap-1" data-oid="30ed-8q">
                        <ColorNameInput
                            initialName=""
                            onSubmit={handleAddNewGroup}
                            onCancel={() => setIsAddingNewGroup(false)}
                            data-oid="m3pv5wh"
                        />
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground bg-background-secondary hover:bg-background-secondary/70 h-10 w-full rounded-lg border border-white/5 text-sm"
                        onClick={() => setIsAddingNewGroup(true)}
                        data-oid="n1l.wxj"
                    >
                        Add a new group
                    </Button>
                )}
            </div>

            {/* Color Palette section */}
            <div
                className="border-border flex flex-col gap-4 border-b px-4 py-[18px]"
                data-oid="8_pih27"
            >
                <h3 className="mb-1 text-sm font-medium" data-oid="7ceqwrp">
                    Default Colors
                </h3>
                {Object.entries(colorDefaults).map(([colorName, colors]) => (
                    <BrandPalletGroup
                        key={colorName}
                        theme={theme}
                        title={colorName}
                        colors={colors}
                        onRename={handleRename}
                        onDelete={(colorItem) => handleDelete(colorName, colorItem)}
                        onColorChange={(groupName, colorIndex, newColor) =>
                            handleDefaultColorChange(colorName, colorIndex, newColor)
                        }
                        onColorChangeEnd={(groupName, colorIndex, newColor) =>
                            handleDefaultColorChange(colorName, colorIndex, newColor)
                        }
                        onDuplicate={(colorItem) => handleDuplicate(colorName, colorItem, true)}
                        isDefaultPalette={true}
                        data-oid="os37-kp"
                    />
                ))}
            </div>
        </div>
    );
});

export default ColorPanel;
