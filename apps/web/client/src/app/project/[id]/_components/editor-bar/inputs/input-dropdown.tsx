'use client';

import { Button } from '@onlook/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { useInputControl } from '../hooks/use-input-control';

const UNITS = ['PX', '%', 'EM', 'REM'];

const OPTION_OVERRIDES: Record<string, string | undefined> = {
    Fit: 'Hug',
    Relative: 'Rel',
};

interface InputDropdownProps {
    value: number;
    unit?: string;
    dropdownValue: string;
    dropdownOptions?: string[];
    onChange?: (value: number) => void;
    onDropdownChange?: (value: string) => void;
    onUnitChange?: (value: string) => void;
}

export const InputDropdown = ({
    value,
    unit = 'PX',
    dropdownValue = 'Hug',
    dropdownOptions = ['Hug'],
    onChange,
    onDropdownChange,
    onUnitChange,
}: InputDropdownProps) => {
    const { localValue, handleKeyDown, handleChange } = useInputControl(value, onChange);

    return (
        <div className="flex items-center" data-oid="ria8jx2">
            <div
                className="flex flex-1 items-center bg-background-tertiary/50 justify-between rounded-l-md px-2.5 h-[36px] min-w-[72px]"
                data-oid="cuyn7:h"
            >
                <input
                    type="text"
                    value={localValue}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                    className="w-[32px] bg-transparent text-sm text-white focus:outline-none text-left"
                    aria-label="Value input"
                    data-oid="_mi8it3"
                />

                <DropdownMenu data-oid="hkmy8b3">
                    <DropdownMenuTrigger
                        className="text-sm text-muted-foreground focus:outline-none cursor-pointer hover:text-white transition-colors"
                        data-oid="m.bt1_s"
                    >
                        {unit}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="min-w-0 w-[64px]"
                        data-oid="xgkpbse"
                    >
                        {UNITS.map((unitOption: string) => (
                            <DropdownMenuItem
                                key={unitOption}
                                onClick={() => onUnitChange?.(unitOption)}
                                className="text-sm w-full h-9 flex justify-center items-center text-center px-2 hover:bg-background-tertiary/70 hover:text-white transition-colors"
                                data-oid="6l-ibf6"
                            >
                                {unitOption}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <DropdownMenu data-oid="hd7l8h3">
                <DropdownMenuTrigger asChild data-oid="ujqdn7o">
                    <Button
                        variant="ghost"
                        className="h-[36px] bg-background-tertiary/50 hover:bg-background-tertiary/70 hover:text-white rounded-l-none rounded-r-md ml-[1px] px-2.5 flex items-center justify-between w-[72px] cursor-pointer transition-colors"
                        data-oid="gg8_::-"
                    >
                        <div className="flex items-center gap-2" data-oid="rtb9thi">
                            <span
                                className="text-sm text-muted-foreground group-hover:text-white transition-colors"
                                data-oid="s8.ey6l"
                            >
                                {OPTION_OVERRIDES[dropdownValue] ?? dropdownValue}
                            </span>
                        </div>
                        <Icons.ChevronDown
                            className="h-4 w-4 min-h-4 min-w-4 text-muted-foreground group-hover:text-white transition-colors"
                            data-oid="mhu3.dk"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="min-w-[100px] -mt-[1px] p-1 rounded-lg"
                    data-oid="5lh489c"
                >
                    {dropdownOptions.map((option) => (
                        <DropdownMenuItem
                            key={option}
                            onClick={() => onDropdownChange?.(option)}
                            className="flex items-center px-2 py-1.5 rounded-md cursor-pointer text-muted-foreground text-sm hover:bg-background-tertiary/70 hover:text-white transition-colors border border-border/0 data-[highlighted]:border-border"
                            data-oid="28gk3l-"
                        >
                            {OPTION_OVERRIDES[option] ?? option}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
