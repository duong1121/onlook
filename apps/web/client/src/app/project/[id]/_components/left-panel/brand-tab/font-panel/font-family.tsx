import { Button } from '@onlook/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { camelCase } from 'lodash';
import { useState } from 'react';

interface FontVariantProps {
    name: string;
    isActive?: boolean;
}

const FontVariant = ({ name }: FontVariantProps) => {
    const fontVariant = `font-${camelCase(name).toLowerCase()}`;

    return (
        <div className={cn('text-sm text-muted-foreground', fontVariant)} data-oid="tkt85.r">
            {name}
        </div>
    );
};

export interface FontFamilyProps {
    name: string;
    variants: string[];
    onRemoveFont?: () => void;
    onAddFont?: () => void;
    onSetFont?: () => void;
    showDropdown?: boolean;
    showAddButton?: boolean; // New property to control Add button visibility
    isDefault?: boolean;
}

export const FontFamily = ({
    name,
    variants = [],
    onAddFont,
    onRemoveFont,
    onSetFont,
    showDropdown = false,
    showAddButton = true,
    isDefault = false,
}: FontFamilyProps) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleDefault = () => {
        onSetFont?.();
    };

    return (
        <div className="w-full group" data-oid="w.::d9a">
            <div className="flex justify-between items-center py-3" data-oid="ks-p._0">
                <div
                    className="flex flex-1 items-center cursor-pointer max-w-52"
                    onClick={() => setExpanded(!expanded)}
                    data-oid="kab03l_"
                >
                    <Icons.ChevronRight
                        className={`h-4 w-4 mr-2 transition-transform ${expanded ? 'rotate-90' : ''}`}
                        data-oid="s6sqwyt"
                    />

                    <Tooltip data-oid="yg_b9t8">
                        <TooltipTrigger asChild data-oid="regxzhm">
                            <span
                                className={`text-sm truncate transition-opacity duration-200`}
                                style={{ fontFamily: name }}
                                data-oid="vwaid:l"
                            >
                                {name}
                            </span>
                        </TooltipTrigger>
                        <TooltipPortal
                            container={document.getElementById('style-panel')}
                            data-oid="tkfklzj"
                        >
                            <TooltipContent
                                side="right"
                                align="center"
                                sideOffset={10}
                                className="animation-none max-w-[200px] shadow"
                                data-oid="h3g.m4p"
                            >
                                <TooltipArrow className="fill-foreground" data-oid="fj:y2pa" />
                                <p className="break-words" data-oid="yc14dw_">
                                    {name}
                                </p>
                            </TooltipContent>
                        </TooltipPortal>
                    </Tooltip>
                    {isDefault && (
                        <span className="ml-2 text-xs text-muted-foreground" data-oid="hce2r8g">
                            (Default)
                        </span>
                    )}
                </div>
                <div
                    className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-100"
                    data-oid=":t6eaig"
                >
                    {showAddButton && onAddFont && (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 pl-2 pr-1.5 rounded-md bg-background-secondary"
                            onClick={() => onAddFont()}
                            data-oid="elnch.4"
                        >
                            Add <Icons.Plus className="ml-1 h-3 w-3" data-oid="rl-q2zp" />
                        </Button>
                    )}
                    {showDropdown && (
                        <DropdownMenu data-oid="plrg3t2">
                            <DropdownMenuTrigger asChild data-oid="8rdb6gm">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 rounded-md hover:bg-background-secondary"
                                    data-oid=":9gj10r"
                                >
                                    <Icons.DotsHorizontal
                                        className="h-4 w-4 text-muted-foreground hover:text-foreground"
                                        data-oid="nyk8vlb"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="min-w-fit"
                                data-oid="1293e.r"
                            >
                                <DropdownMenuCheckboxItem
                                    checked={isDefault}
                                    onCheckedChange={handleToggleDefault}
                                    className="flex items-center pr-2 cursor-pointer"
                                    data-oid="a5g7ikm"
                                >
                                    <span data-oid="b3rrbp_">Set as default font</span>
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuItem
                                    className="flex items-center"
                                    onClick={() => onRemoveFont?.()}
                                    data-oid=".6dxtio"
                                >
                                    <Icons.Trash className="h-4 w-4 mr-2" data-oid="otw.7jt" />
                                    <span data-oid="l6gp97y">Remove</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {expanded && variants.length > 0 && (
                <div
                    className="pl-7 flex flex-col gap-2 pb-6"
                    style={{
                        fontFamily: name,
                    }}
                    data-oid="rq789--"
                >
                    {variants.map((variant) => (
                        <FontVariant key={`${name}-${variant}`} name={variant} data-oid="l8874wn" />
                    ))}
                </div>
            )}
        </div>
    );
};
