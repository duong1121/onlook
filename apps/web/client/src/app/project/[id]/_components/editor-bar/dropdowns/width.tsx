'use client';

import { Button } from '@onlook/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { LayoutMode } from '@onlook/utility';
import { observer } from 'mobx-react-lite';
import { useDimensionControl } from '../hooks/use-dimension-control';
import { useDropdownControl } from '../hooks/use-dropdown-manager';
import { HoverOnlyTooltip } from '../hover-tooltip';
import { InputDropdown } from '../inputs/input-dropdown';

export const Width = observer(() => {
    const { dimensionState, handleDimensionChange, handleUnitChange, handleLayoutChange } =
        useDimensionControl('width');

    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'width-dropdown',
    });

    return (
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange} data-oid="szev2b_">
            <HoverOnlyTooltip
                content="Width"
                side="bottom"
                className="mt-1"
                hideArrow
                disabled={isOpen}
                data-oid="wry6bnr"
            >
                <DropdownMenuTrigger asChild data-oid="0xdx1q:">
                    <Button
                        variant="ghost"
                        size="toolbar"
                        className="text-muted-foreground border-border/0 hover:bg-background-tertiary/20 hover:border-border data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border flex cursor-pointer items-center gap-1 border hover:border hover:text-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none active:border-0 data-[state=open]:border data-[state=open]:text-white"
                        data-oid="e7i1mod"
                    >
                        <Icons.Width className="h-4 w-4 min-h-4 min-w-4" data-oid="3fvtr-q" />
                        <span className="text-small" data-oid="jy:6fc-">
                            {dimensionState.width.value}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
            </HoverOnlyTooltip>
            <DropdownMenuContent
                align="start"
                className="w-[260px] mt-1 p-3 rounded-lg space-y-3"
                data-oid="--cjvw3"
            >
                <div className="space-y-1.5" data-oid="0uxs.vo">
                    <div className="flex items-center justify-between" data-oid="4s51on-">
                        <span className="text-sm text-muted-white" data-oid=".o7c1:t">
                            Width
                        </span>
                        <InputDropdown
                            value={dimensionState.width.num ?? 0}
                            unit={dimensionState.width.unit}
                            dropdownValue={dimensionState.width.dropdownValue}
                            dropdownOptions={Object.values(LayoutMode)}
                            onChange={(value) => handleDimensionChange('width', value)}
                            onUnitChange={(value) => handleUnitChange('width', value)}
                            onDropdownChange={(value) => handleLayoutChange('width', value)}
                            data-oid="x:q5v5u"
                        />
                    </div>
                    <div className="flex items-center justify-between" data-oid="qv2ey8s">
                        <span className="text-sm text-muted-foreground" data-oid="y4kq603">
                            Min
                        </span>
                        <InputDropdown
                            value={dimensionState.minWidth.num ?? 0}
                            unit={dimensionState.minWidth.unit}
                            dropdownValue={dimensionState.minWidth.dropdownValue}
                            dropdownOptions={Object.values(LayoutMode)}
                            onChange={(value) => handleDimensionChange('minWidth', value)}
                            onUnitChange={(value) => handleUnitChange('minWidth', value)}
                            onDropdownChange={(value) => handleLayoutChange('minWidth', value)}
                            data-oid="wz1utdt"
                        />
                    </div>
                    <div className="flex items-center justify-between" data-oid="7kqqr.m">
                        <span className="text-sm text-muted-foreground" data-oid="h1f-dxi">
                            Max
                        </span>
                        <InputDropdown
                            value={dimensionState.maxWidth.num ?? 0}
                            unit={dimensionState.maxWidth.unit}
                            dropdownValue={dimensionState.maxWidth.dropdownValue}
                            dropdownOptions={Object.values(LayoutMode)}
                            onChange={(value) => handleDimensionChange('maxWidth', value)}
                            onUnitChange={(value) => handleUnitChange('maxWidth', value)}
                            onDropdownChange={(value) => handleLayoutChange('maxWidth', value)}
                            data-oid="k9tzuwi"
                        />
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
