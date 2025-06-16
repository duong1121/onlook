import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { useState } from 'react';
import { useInputControl } from '../hooks/use-input-control';

const UNITS = ['px', '%', 'rem', 'vw', 'vh'];
type Unit = (typeof UNITS)[number];

type IconType =
    | 'LeftSide'
    | 'TopSide'
    | 'RightSide'
    | 'BottomSide'
    | 'CornerTopLeft'
    | 'CornerTopRight'
    | 'CornerBottomLeft'
    | 'CornerBottomRight';

interface InputIconProps {
    value: number;
    unit?: Unit;
    icon?: IconType;
    onChange?: (value: number) => void;
    onUnitChange?: (unit: Unit) => void;
}

export const InputIcon = ({ value, unit = 'px', icon, onChange, onUnitChange }: InputIconProps) => {
    const [unitValue, setUnitValue] = useState(unit);
    const { localValue, handleKeyDown, handleChange } = useInputControl(value, onChange);

    const IconComponent = icon ? Icons[icon] : null;

    return (
        <div className="flex items-center gap-2" data-oid="qjt.iee">
            {IconComponent && (
                <IconComponent
                    className="h-5 w-5 min-h-5 min-w-5 text-muted-foreground"
                    data-oid="ts.pxt:"
                />
            )}
            <div
                className="flex items-center bg-background-tertiary/50 justify-between rounded-md px-3 h-[36px] w-full"
                data-oid="a-i85bu"
            >
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={localValue}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-sm text-white focus:outline-none uppercase hover:text-white"
                    data-oid="3aawz78"
                />

                <DropdownMenu data-oid="4rkir02">
                    <DropdownMenuTrigger
                        className="text-[12px] text-muted-foreground focus:outline-none cursor-pointer hover:text-white transition-colors"
                        data-oid="q2t6lcd"
                    >
                        {unitValue === 'px' ? '' : unitValue}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="min-w-0 w-[64px]"
                        data-oid="ot594mk"
                    >
                        {UNITS.map((unitOption) => (
                            <DropdownMenuItem
                                key={unitOption}
                                onClick={() => {
                                    onUnitChange?.(unitOption);
                                    setUnitValue(unitOption);
                                }}
                                className="text-[12px] text-center px-2 hover:bg-background-tertiary/70 hover:text-white transition-colors"
                                data-oid="sjq5do4"
                            >
                                {unitOption}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
