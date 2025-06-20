'use client';

import { Button } from '@onlook/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { observer } from 'mobx-react-lite';
import { useRef, useState, useEffect } from 'react';
import { useDropdownControl } from '../../hooks/use-dropdown-manager';
import { useTextControl } from '../../hooks/use-text-control';
import { HoverOnlyTooltip } from '../../hover-tooltip';

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];

export const FontSizeSelector = observer(() => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { handleFontSizeChange, textState } = useTextControl();
    const [inputValue, setInputValue] = useState(textState.fontSize.toString());

    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'font-size-dropdown',
    });

    // Update local input value when textState.fontSize changes externally
    useEffect(() => {
        setInputValue(textState.fontSize.toString());
    }, [textState.fontSize]);

    const adjustFontSize = (amount: number) => {
        const newSize = Math.max(1, textState.fontSize + amount);
        handleFontSizeChange(newSize);
    };

    const handleInputClick = () => {
        onOpenChange(true);
        // Use setTimeout to ensure the input is focused after the dropdown opens
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const value = parseInt(inputValue);
            if (!isNaN(value) && value > 0) {
                handleFontSizeChange(value);
            } else {
                // Reset to current value if invalid
                setInputValue(textState.fontSize.toString());
            }
            onOpenChange(false);
            inputRef.current?.blur();
        } else if (e.key === 'Escape') {
            // Reset to current value and close
            setInputValue(textState.fontSize.toString());
            onOpenChange(false);
            inputRef.current?.blur();
        }
    };

    const handleInputBlur = () => {
        // When input loses focus, validate and apply the value or reset
        const value = parseInt(inputValue);
        if (!isNaN(value) && value > 0) {
            handleFontSizeChange(value);
        } else {
            // Reset to current value if invalid
            setInputValue(textState.fontSize.toString());
        }
    };

    const handleSizeSelect = (size: number) => {
        handleFontSizeChange(size);
        onOpenChange(false);
        inputRef.current?.blur();
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange} data-oid="-heequg">
            <HoverOnlyTooltip
                content="Font Size"
                side="bottom"
                className="mt-1"
                hideArrow
                disabled={isOpen}
                data-oid="l4hnlk:"
            >
                <div className="flex items-center gap-0.5" data-oid="459ahdg">
                    <Button
                        variant="ghost"
                        size="toolbar"
                        onClick={() => adjustFontSize(-1)}
                        className="border-border/0 hover:bg-background-tertiary/20 hover:border-border text-muted-foreground data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border h-8 w-8 cursor-pointer rounded-lg border px-2 hover:border hover:text-white data-[state=open]:border data-[state=open]:text-white"
                        data-oid="d_x7ruj"
                    >
                        <Icons.Minus className="h-4 w-4" data-oid="_heoymj" />
                    </Button>
                    <DropdownMenuTrigger asChild data-oid="rwp16f3">
                        <input
                            ref={inputRef}
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            onBlur={handleInputBlur}
                            onClick={handleInputClick}
                            className="border-border/0 text-muted-foreground hover:bg-background-tertiary/20 hover:border-border data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border focus:bg-background-tertiary/20 focus:ring-border h-8 max-w-[40px] min-w-[40px] [appearance:textfield] rounded-lg border px-1 text-center text-sm hover:border hover:text-white focus:ring-1 focus:outline-none data-[state=open]:border data-[state=open]:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            data-oid="ml4ieir"
                        />
                    </DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        size="toolbar"
                        onClick={() => adjustFontSize(1)}
                        className="border-border/0 hover:bg-background-tertiary/20 hover:border-border text-muted-foreground data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border h-8 w-8 cursor-pointer rounded-lg border px-2 hover:border hover:text-white data-[state=open]:border data-[state=open]:text-white"
                        data-oid="6p6d77i"
                    >
                        <Icons.Plus className="h-4 w-4" data-oid="u3h6ajs" />
                    </Button>
                </div>
            </HoverOnlyTooltip>
            <DropdownMenuContent
                align="center"
                className="mt-1 w-[48px] min-w-[48px] rounded-lg p-1"
                data-oid="txd3zhs"
            >
                <div className="grid grid-cols-1 gap-1" data-oid="2a4mcgo">
                    {FONT_SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => handleSizeSelect(size)}
                            className={`cursor-pointer text-muted-foreground data-[highlighted]:bg-background-tertiary/10 border-border/0 data-[highlighted]:border-border justify-center rounded-md border px-2 py-1 text-sm data-[highlighted]:text-white ${
                                size === textState.fontSize
                                    ? 'bg-background-tertiary/20 border-border border text-white'
                                    : ''
                            }`}
                            data-oid="o6kxdb7"
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
