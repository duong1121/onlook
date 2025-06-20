'use client';

import { Button } from '@onlook/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { useState } from 'react';
import { useBoxControl } from '../hooks/use-box-control';
import { useDropdownControl } from '../hooks/use-dropdown-manager';
import { HoverOnlyTooltip } from '../hover-tooltip';
import { InputRange } from '../inputs/input-range';
import { SpacingInputs } from '../inputs/spacing-inputs';
import { observer } from 'mobx-react-lite';

export const Padding = observer(() => {
    const [activeTab, setActiveTab] = useState('all');
    const { boxState, handleBoxChange, handleUnitChange, handleIndividualChange } =
        useBoxControl('padding');

    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'padding-dropdown',
    });

    return (
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange} data-oid="lfhr_sr">
            <HoverOnlyTooltip
                content="Padding"
                side="bottom"
                className="mt-1"
                hideArrow
                disabled={isOpen}
                data-oid="09k006z"
            >
                <DropdownMenuTrigger asChild data-oid="dvjasam">
                    <Button
                        variant="ghost"
                        size="toolbar"
                        className="text-muted-foreground border-border/0 hover:bg-background-tertiary/20 hover:border-border data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border gap-1 flex cursor-pointer items-center border hover:border hover:text-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none active:border-0 data-[state=open]:border data-[state=open]:text-white"
                        data-oid="iryk689"
                    >
                        <Icons.Padding className="h-4 min-h-4 w-4 min-w-4" data-oid="puvuc8b" />
                        {boxState.padding.unit === 'px' &&
                        typeof boxState.padding.num === 'number' &&
                        boxState.padding.num !== 0 ? (
                            <span className="text-small" data-oid="rh8t22y">
                                {boxState.padding.num}
                            </span>
                        ) : null}
                        {boxState.padding.unit !== 'px' && boxState.padding.value ? (
                            <span className="text-small" data-oid="_:o_9:x">
                                {boxState.padding.value}
                            </span>
                        ) : null}
                    </Button>
                </DropdownMenuTrigger>
            </HoverOnlyTooltip>
            <DropdownMenuContent
                align="start"
                className="w-[280px] mt-1 p-3 rounded-lg"
                data-oid="0snj5pf"
            >
                <div className="flex items-center gap-2 mb-3" data-oid="koybl7m">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 text-sm px-4 py-1.5 rounded-md transition-colors cursor-pointer ${
                            activeTab === 'all'
                                ? 'text-white bg-background-tertiary/20'
                                : 'text-muted-foreground hover:bg-background-tertiary/10'
                        }`}
                        data-oid="04zck3d"
                    >
                        All sides
                    </button>
                    <button
                        onClick={() => setActiveTab('individual')}
                        className={`flex-1 text-sm px-4 py-1.5 rounded-md transition-colors cursor-pointer ${
                            activeTab === 'individual'
                                ? 'text-white bg-background-tertiary/20'
                                : 'text-muted-foreground hover:bg-background-tertiary/10'
                        }`}
                        data-oid="z7t84kd"
                    >
                        Individual
                    </button>
                </div>
                {activeTab === 'all' ? (
                    <InputRange
                        value={boxState.padding.num ?? 0}
                        onChange={(value) => handleBoxChange('padding', value.toString())}
                        unit={boxState.padding.unit}
                        onUnitChange={(unit) => handleUnitChange('padding', unit)}
                        data-oid="9g23i8e"
                    />
                ) : (
                    <SpacingInputs
                        type="padding"
                        values={{
                            top: boxState.paddingTop.num ?? 0,
                            right: boxState.paddingRight.num ?? 0,
                            bottom: boxState.paddingBottom.num ?? 0,
                            left: boxState.paddingLeft.num ?? 0,
                        }}
                        onChange={handleIndividualChange}
                        data-oid="bb81cfd"
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
