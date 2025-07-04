'use client';

import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@onlook/ui/popover';
import { Color } from '@onlook/utility';
import { useCallback, useState } from 'react';
import { ColorPickerContent } from './color-picker';
import { useColorUpdate } from '../hooks/use-color-update';

interface InputColorProps {
    color: string;
    elementStyleKey: string;
    onColorChange?: (color: string) => void;
}

export const InputColor = ({ color, elementStyleKey, onColorChange }: InputColorProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { handleColorUpdateEnd, handleColorUpdate, tempColor } = useColorUpdate({
        elementStyleKey,
        onValueChange: (_, value) => onColorChange?.(value),
        initialColor: color,
    });

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            handleColorUpdateEnd(Color.from(value));
            onColorChange?.(value);
        },
        [onColorChange],
    );

    return (
        <div className="flex h-9 w-full items-center" data-oid="pugq299">
            <div
                className="bg-background-tertiary/50 mr-[1px] flex h-full flex-1 items-center rounded-l-md px-3 py-1.5 pl-1.5"
                data-oid="l496:ag"
            >
                <Popover onOpenChange={setIsOpen} data-oid="iei_sz1">
                    <PopoverAnchor className="absolute bottom-0 left-0" data-oid="kuisru1" />
                    <PopoverTrigger data-oid="6ea06su">
                        <div className="flex items-center" data-oid="01yvmrj">
                            <div
                                className="mr-2 aspect-square h-5 w-5 rounded-sm"
                                style={{ backgroundColor: tempColor.toHex() }}
                                onClick={() => setIsOpen(!isOpen)}
                                data-oid="p9rkfr3"
                            />

                            <input
                                type="text"
                                value={tempColor.toHex6()}
                                onChange={handleInputChange}
                                className="h-full w-full bg-transparent text-sm text-white focus:outline-none"
                                data-oid="i9njtzx"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-[224px] overflow-hidden rounded-lg p-0 shadow-xl backdrop-blur-lg"
                        side="bottom"
                        align="start"
                        data-oid="er5t-y9"
                    >
                        <ColorPickerContent
                            color={tempColor}
                            onChange={handleColorUpdate}
                            onChangeEnd={handleColorUpdateEnd}
                            data-oid="v7gjq45"
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div
                className="text-xs text-white bg-background-tertiary/50 flex h-full items-center rounded-r-md px-3 py-1.5"
                data-oid="f5odmaw"
            >
                {Math.round(tempColor.rgb.a * 100).toString()}%
            </div>
        </div>
    );
};
