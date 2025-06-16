'use client';

import { Button } from '@onlook/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { useState } from 'react';
import { useTextControl } from '../hooks/use-text-control';
import { InputColor } from '../inputs/input-color';
import { InputIcon } from '../inputs/input-icon';
import { InputRadio } from '../inputs/input-radio';
import { HoverOnlyTooltip } from '../hover-tooltip';

export const AdvancedTypography = () => {
    const {
        textState,
        handleLetterSpacingChange,
        handleCapitalizationChange,
        handleTextDecorationChange,
        handleLineHeightChange,
    } = useTextControl();

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const capitalizationOptions = [
        { value: 'uppercase', label: 'AA' },
        { value: 'capitalize', label: 'Aa' },
        { value: 'lowercase', label: 'aa' },
        { value: 'none', icon: <Icons.CrossL className="h-4 w-4" data-oid="mviec_s" /> },
    ];

    const decorationOptions = [
        {
            value: 'underline',
            icon: <Icons.TextUnderline className="h-4 w-4" data-oid="m8z6lr_" />,
        },
        { value: 'overline', icon: <Icons.TextOverline className="h-4 w-4" data-oid="8t1g0we" /> },
        {
            value: 'line-through',
            icon: <Icons.TextStrikeThrough className="h-4 w-4" data-oid="3s8eq6u" />,
        },
        { value: 'none', icon: <Icons.CrossL className="h-4 w-4" data-oid=":lgthqw" /> },
    ];

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} data-oid="f-y8:g6">
            <HoverOnlyTooltip
                content="Advanced Typography"
                side="bottom"
                className="mt-1"
                hideArrow
                disabled={open}
                data-oid="tep_vob"
            >
                <DropdownMenuTrigger asChild data-oid="e3ulf2k">
                    <Button
                        variant="ghost"
                        size="toolbar"
                        className="text-muted-foreground border-border/0 hover:bg-background-tertiary/20 hover:border-border data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border px-2 hover:border hover:text-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none active:border-0 data-[state=open]:border data-[state=open]:text-white"
                        data-oid="knmlwo1"
                    >
                        <Icons.AdvancedTypography className="h-4 w-4" data-oid=":ooiee8" />
                    </Button>
                </DropdownMenuTrigger>
            </HoverOnlyTooltip>
            <DropdownMenuContent
                side="bottom"
                align="start"
                className="mt-1 w-[300px] rounded-xl p-0 bg-background shadow-lg border border-border"
                data-oid="cbux4._"
            >
                <div
                    className="flex justify-between items-center pl-4 pr-2.5 py-1.5 border-b border-border"
                    data-oid="d73x5_h"
                >
                    <h2 className="text-sm font-normal text-foreground" data-oid="c4odljt">
                        Advanced Typography
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md hover:bg-background-secondary"
                        onClick={handleClose}
                        data-oid="khghi8o"
                    >
                        <Icons.CrossS className="h-4 w-4" data-oid="l_ma5s6" />
                    </Button>
                </div>
                <div className="space-y-4 px-4 py-2" data-oid="hmh3zr8">
                    <div className="flex items-center justify-between" data-oid="2vqneu9">
                        <span className="text-sm text-muted-foreground w-20" data-oid="l8zloya">
                            Color
                        </span>
                        <div className="flex-1" data-oid="4xqv1s2">
                            <InputColor
                                color={textState.textColor}
                                elementStyleKey="color"
                                data-oid="4mcyl1j"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between" data-oid="4n77ghk">
                        <span className="text-sm text-muted-foreground w-20" data-oid="ce2ayyj">
                            Line
                        </span>
                        <div className="flex-1" data-oid="de26u-z">
                            <InputIcon
                                value={
                                    isNaN(parseFloat(textState.lineHeight))
                                        ? 0
                                        : parseFloat(textState.lineHeight)
                                }
                                onChange={(value) => handleLineHeightChange(value.toString())}
                                data-oid="uo38.3r"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between" data-oid="wzl-z_x">
                        <span className="text-sm text-muted-foreground w-20" data-oid="vg5y775">
                            Letter
                        </span>
                        <div className="flex-1" data-oid="rj06uv6">
                            <InputIcon
                                value={
                                    isNaN(parseFloat(textState.letterSpacing))
                                        ? 0
                                        : parseFloat(textState.letterSpacing)
                                }
                                onChange={(value) => handleLetterSpacingChange(value.toString())}
                                data-oid="6sccqwy"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3" data-oid="o_hyo7c">
                        <span className="text-sm text-muted-foreground w-20" data-oid="r_yekxa">
                            Capitalize
                        </span>
                        <div className="w-[225px]" data-oid="9-ylvac">
                            <InputRadio
                                options={capitalizationOptions}
                                value={textState.capitalization}
                                onChange={handleCapitalizationChange}
                                className="flex-1"
                                data-oid="fy-1r:k"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3" data-oid="e:ox2.0">
                        <span className="text-sm text-muted-foreground w-20" data-oid="zhm60mo">
                            Decorate
                        </span>
                        <div className="w-[225px]" data-oid=".3h8osd">
                            <InputRadio
                                options={decorationOptions}
                                value={textState.textDecorationLine}
                                onChange={handleTextDecorationChange}
                                className="flex-1"
                                data-oid="dk4wj99"
                            />
                        </div>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
