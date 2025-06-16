'use client';

import { useEditorEngine } from '@/components/store/editor';
import { Button } from '@onlook/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { useMemo } from 'react';
import { ColorPickerContent } from '../inputs/color-picker';
import { useColorUpdate } from '../hooks/use-color-update';
import { useDropdownControl } from '../hooks/use-dropdown-manager';
import { HoverOnlyTooltip } from '../hover-tooltip';
import { observer } from 'mobx-react-lite';

export const ColorBackground = observer(() => {
    const editorEngine = useEditorEngine();
    const initialColor = editorEngine.style.selectedStyle?.styles.computed.backgroundColor;

    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'color-background-dropdown',
    });

    const { handleColorUpdate, handleColorUpdateEnd, tempColor } = useColorUpdate({
        elementStyleKey: 'backgroundColor',
        initialColor: initialColor,
    });

    const colorHex = useMemo(() => tempColor?.toHex(), [tempColor]);

    return (
        <div className="flex flex-col gap-2" data-oid="8-h3.4h">
            <DropdownMenu open={isOpen} onOpenChange={onOpenChange} data-oid="c6t2093">
                <HoverOnlyTooltip
                    content="Background Color"
                    side="bottom"
                    className="mt-1"
                    hideArrow
                    disabled={isOpen}
                    data-oid="97xonxf"
                >
                    <DropdownMenuTrigger asChild data-oid="39v:zjd">
                        <Button
                            variant="ghost"
                            size="toolbar"
                            className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground border border-border/0 rounded-lg hover:bg-background-tertiary/20 hover:text-white hover:border hover:border-border data-[state=open]:bg-background-tertiary/20 data-[state=open]:text-white data-[state=open]:border data-[state=open]:border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-visible:outline-none active:border-0 data-[state=open]:border data-[state=open]:text-white"
                            data-oid="znp6jet"
                        >
                            <Icons.PaintBucket className="h-2 w-2" data-oid="tngijg." />
                            <div
                                className="h-[4px] w-6 rounded-full bg-current"
                                style={{ backgroundColor: colorHex }}
                                data-oid="7rwqbyj"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                </HoverOnlyTooltip>
                <DropdownMenuContent
                    align="start"
                    side="bottom"
                    className="w-[220px] mt-1 p-0 rounded-lg overflow-hidden shadow-xl backdrop-blur-lg"
                    data-oid="k0vf:1j"
                >
                    <ColorPickerContent
                        color={tempColor}
                        onChange={handleColorUpdate}
                        onChangeEnd={handleColorUpdateEnd}
                        data-oid="5myru48"
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});
