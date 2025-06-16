'use client';

import { DEFAULT_COLOR_NAME } from '@onlook/constants';
import type { TailwindColor } from '@onlook/models';
import { Popover, PopoverContent, PopoverTrigger } from '@onlook/ui/popover';
import { toNormalCase, type Color } from '@onlook/utility';
import { useEffect, useState } from 'react';
import { ColorPickerContent } from '../../../editor-bar/inputs/color-picker';
import { ColorNameInput } from './color-name-input';

export const ColorPopover = ({
    color,
    brandColor,
    onClose,
    onColorChange,
    onColorChangeEnd,
    isDefaultPalette = false,
    existedName,
}: {
    color: Color;
    brandColor: string;
    onClose?: () => void;
    onColorChange?: (newColor: Color, newName: string) => void;
    onColorChangeEnd?: (newColor: Color, newName: string) => void;
    isDefaultPalette?: boolean;
    existedName?: string[];
}) => {
    const [editedColor, setEditedColor] = useState<Color>(color);
    const [editedName, setEditedName] = useState<string>(brandColor);

    const handleColorChange = (newColor: Color | TailwindColor) => {
        setEditedColor(newColor as Color);
    };

    const handleNameChange = (newName: string) => {
        setEditedName(newName);
        if (onColorChangeEnd) {
            onColorChangeEnd(editedColor, newName);
        }
        if (onClose) {
            onClose();
        }
    };

    useEffect(() => {
        setEditedName(toNormalCase(brandColor));
    }, [brandColor]);

    return (
        <Popover
            onOpenChange={(open) => !open && handleNameChange(editedName)}
            open={true}
            data-oid="x4u:s_1"
        >
            <PopoverTrigger asChild data-oid="570zqi:">
                <div
                    className="w-full aspect-square rounded-lg cursor-pointer hover:ring-2 hover:ring-border-primary border border-white/10"
                    style={{ backgroundColor: editedColor.toHex() }}
                    data-oid="zctcjf2"
                />
            </PopoverTrigger>
            <PopoverContent className="p-0 w-56" side="right" align="start" data-oid="gpq36di">
                <div className="flex flex-col gap-0 p-0" data-oid="3x9ng-k">
                    <div className="flex flex-col gap-1 p-2 pb-1" data-oid="o5tnzfa">
                        <label className="text-xs text-muted-foreground" data-oid="nbas8b:">
                            Color Name
                        </label>
                        <ColorNameInput
                            initialName={editedName}
                            onSubmit={handleNameChange}
                            onCancel={() => {
                                setEditedName(brandColor);
                                if (onClose) {
                                    onClose();
                                }
                            }}
                            existingNames={existedName}
                            disabled={isDefaultPalette || brandColor === DEFAULT_COLOR_NAME}
                            data-oid="39k7awy"
                        />
                    </div>
                    <ColorPickerContent
                        color={editedColor}
                        onChange={handleColorChange}
                        onChangeEnd={handleColorChange}
                        data-oid="a1f-lao"
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};
