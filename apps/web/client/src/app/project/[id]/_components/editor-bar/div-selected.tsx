'use client';

import React, { memo } from 'react';
import { Border } from './dropdowns/border';
import { BorderColor } from './dropdowns/border-color';
import { ColorBackground } from './dropdowns/color-background';
import { Display } from './dropdowns/display';
import { Height } from './dropdowns/height';
import { Margin } from './dropdowns/margin';
import { Opacity } from './dropdowns/opacity';
import { Padding } from './dropdowns/padding';
import { Radius } from './dropdowns/radius';
import { Width } from './dropdowns/width';
import { useDropdownControl } from './hooks/use-dropdown-manager';
import { useMeasureGroup } from './hooks/use-measure-group';
import { OverflowMenu } from './overflow-menu';
import { InputSeparator } from './separator';
import { FontFamilySelector } from './text-inputs/font/font-family-selector';
import { FontSizeSelector } from './text-inputs/font/font-size';
import { FontWeightSelector } from './text-inputs/font/font-weight';
import { TextColor } from './text-inputs/text-color';

// Group definitions for the div-selected toolbar
export const DIV_SELECTED_GROUPS = [
    {
        key: 'dimensions',
        label: 'Dimensions',
        components: [<Width data-oid="-mg3mkg" />, <Height data-oid="ll63ghg" />],
    },
    {
        key: 'base',
        label: 'Base',
        components: [
            <ColorBackground data-oid="r1f2905" />,
            <Border data-oid="unnxvb2" />,
            <BorderColor data-oid="fgjl1ol" />,
            <Radius data-oid="sjqf7bs" />,
        ],
    },
    {
        key: 'layout',
        label: 'Layout',
        components: [
            <Display data-oid="k3sp1:3" />,
            <Padding data-oid="du7afd:" />,
            <Margin data-oid="sqb3xak" />,
        ],
    },
    {
        key: 'typography',
        label: 'Typography',
        components: [
            <FontFamilySelector data-oid="cmqsu6i" />,
            <InputSeparator data-oid="e.7lb6d" />,
            <FontWeightSelector data-oid="182sfcn" />,
            <InputSeparator data-oid="ujhfm0c" />,
            <FontSizeSelector data-oid="nft1lff" />,
        ],
    },
    {
        key: 'text-color',
        label: 'Text Color',
        components: [<TextColor data-oid="e0l8:b:" />],
    },
    {
        key: 'opacity',
        label: 'Opacity',
        components: [<Opacity data-oid="f0pxb88" />],
    },
];

export const DivSelected = memo(({ availableWidth = 0 }: { availableWidth?: number }) => {
    const { visibleCount } = useMeasureGroup({ availableWidth, count: DIV_SELECTED_GROUPS.length });
    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'div-selected-overflow-dropdown',
        isOverflow: true,
    });

    const visibleGroups = DIV_SELECTED_GROUPS.slice(0, visibleCount);
    const overflowGroups = DIV_SELECTED_GROUPS.slice(visibleCount);

    return (
        <div
            className="flex items-center justify-center gap-0.5 w-full overflow-hidden"
            data-oid="3z.tsh7"
        >
            {visibleGroups.map((group, groupIdx) => (
                <React.Fragment key={group.key}>
                    {groupIdx > 0 && <InputSeparator data-oid="e2kh3a:" />}
                    <div className="flex items-center justify-center gap-0.5" data-oid="9bov0e4">
                        {group.components.map((comp, idx) => (
                            <React.Fragment key={idx}>{comp}</React.Fragment>
                        ))}
                    </div>
                </React.Fragment>
            ))}
            <OverflowMenu
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                overflowGroups={overflowGroups}
                visibleCount={visibleCount}
                data-oid="nwpka9."
            />
        </div>
    );
});
