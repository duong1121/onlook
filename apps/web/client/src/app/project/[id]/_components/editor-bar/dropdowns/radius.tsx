'use client';

import { Button } from '@onlook/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useBoxControl } from '../hooks/use-box-control';
import { useDropdownControl } from '../hooks/use-dropdown-manager';
import { HoverOnlyTooltip } from '../hover-tooltip';
import { InputRange } from '../inputs/input-range';
import { SpacingInputs } from '../inputs/spacing-inputs';

export const Radius = observer(() => {
    const [activeTab, setActiveTab] = useState('all');
    const { boxState, handleBoxChange, handleUnitChange, handleIndividualChange } =
        useBoxControl('radius');

    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'radius-dropdown',
    });

    return (
        <DropdownMenu open={isOpen} onOpenChange={onOpenChange} data-oid="ckyggxh">
            <HoverOnlyTooltip
                content="Radius"
                side="bottom"
                className="mt-1"
                hideArrow
                disabled={isOpen}
                data-oid="b:f.0l3"
            >
                <DropdownMenuTrigger asChild data-oid="cafusse">
                    <Button
                        variant="ghost"
                        size="toolbar"
                        className="text-muted-foreground border-border/0 hover:bg-background-tertiary/20 hover:border-border data-[state=open]:bg-background-tertiary/20 data-[state=open]:border-border gap-1 flex cursor-pointer items-center border hover:border hover:text-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none active:border-0 data-[state=open]:border data-[state=open]:text-white"
                        data-oid="d4:q6zu"
                    >
                        <Icons.CornerRadius
                            className="h-4 min-h-4 w-4 min-w-4"
                            data-oid="j:mgmsp"
                        />

                        {boxState.borderRadius.unit === 'px' &&
                        typeof boxState.borderRadius.num === 'number' &&
                        boxState.borderRadius.num !== 0 ? (
                            <span className="text-small" data-oid="0bgefpw">
                                {boxState.borderRadius.num}
                            </span>
                        ) : null}
                        {boxState.borderRadius.unit !== 'px' && boxState.borderRadius.value ? (
                            <span className="text-small" data-oid="88760-q">
                                {boxState.borderRadius.value}
                            </span>
                        ) : null}
                    </Button>
                </DropdownMenuTrigger>
            </HoverOnlyTooltip>
            <DropdownMenuContent
                align="start"
                className="w-[280px] mt-1 p-3 rounded-lg"
                data-oid="la1vi6-"
            >
                <div className="flex items-center gap-2 mb-3" data-oid="ktp57k6">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 text-sm px-4 py-1.5 rounded-md transition-colors cursor-pointer ${
                            activeTab === 'all'
                                ? 'text-white bg-background-tertiary/20'
                                : 'text-muted-foreground hover:bg-background-tertiary/10'
                        }`}
                        data-oid="0y8rhum"
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
                        data-oid="dt1zct9"
                    >
                        Individual
                    </button>
                </div>
                {activeTab === 'all' ? (
                    <InputRange
                        value={boxState.borderRadius.num ?? 0}
                        onChange={(value) => handleBoxChange('borderRadius', value.toString())}
                        unit={boxState.borderRadius.unit}
                        onUnitChange={(unit) => handleUnitChange('borderRadius', unit)}
                        data-oid="xg.l.6:"
                    />
                ) : (
                    <SpacingInputs
                        type="radius"
                        values={{
                            topLeft: boxState.borderTopLeftRadius.num ?? 0,
                            topRight: boxState.borderTopRightRadius.num ?? 0,
                            bottomRight: boxState.borderBottomRightRadius.num ?? 0,
                            bottomLeft: boxState.borderBottomLeftRadius.num ?? 0,
                        }}
                        onChange={handleIndividualChange}
                        data-oid="oqvs2f:"
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
