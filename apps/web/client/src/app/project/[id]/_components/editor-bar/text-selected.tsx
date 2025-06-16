'use client';

import React from 'react';
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
import { AdvancedTypography } from './text-inputs/advanced-typography';
import { FontFamilySelector } from './text-inputs/font/font-family-selector';
import { FontSizeSelector } from './text-inputs/font/font-size';
import { FontWeightSelector } from './text-inputs/font/font-weight';
import { TextAlignSelector } from './text-inputs/text-align';
import { TextColor } from './text-inputs/text-color';

// Group definitions for the text-selected toolbar
export const TEXT_SELECTED_GROUPS = [
    {
        key: 'text-dimensions',
        label: 'Dimensions',
        components: [<Width data-oid="llmq782" />, <Height data-oid="qwpwerg" />],
    },
    {
        key: 'text-base',
        label: 'Base',
        components: [
            <ColorBackground data-oid="dvrl:z-" />,
            <Border data-oid="0479l8t" />,
            <BorderColor data-oid="89et0zx" />,
            <Radius data-oid="7a8:557" />,
        ],
    },
    {
        key: 'text-layout',
        label: 'Layout',
        components: [
            <Display data-oid="5pf7dbf" />,
            <Padding data-oid="jzwd_l0" />,
            <Margin data-oid="-cs6ohm" />,
        ],
    },
    {
        key: 'text-font',
        label: 'Font',
        components: [
            <FontFamilySelector data-oid="oxmsucn" />,
            <InputSeparator data-oid="pldvuzu" />,
            <FontWeightSelector data-oid="u0s5f6k" />,
            <InputSeparator data-oid="a21_huw" />,
            <FontSizeSelector data-oid="owt9.gu" />,
        ],
    },
    {
        key: 'text-typography',
        label: 'Typography',
        components: [
            <TextColor data-oid="66z5i0g" />,
            <TextAlignSelector data-oid="0558c_r" />,
            <AdvancedTypography data-oid="2dkl8bf" />,
        ],
    },
    {
        key: 'text-opacity',
        label: 'Opacity',
        components: [<Opacity data-oid="y9o.3ou" />],
    },
];

export const TextSelected = ({ availableWidth = 0 }: { availableWidth?: number }) => {
    const { visibleCount } = useMeasureGroup({
        availableWidth,
        count: TEXT_SELECTED_GROUPS.length,
    });
    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'text-selected-overflow-dropdown',
        isOverflow: true,
    });

    const visibleGroups = TEXT_SELECTED_GROUPS.slice(0, visibleCount);
    const overflowGroups = TEXT_SELECTED_GROUPS.slice(visibleCount);

    return (
        <div
            className="flex items-center justify-center gap-0.5 w-full overflow-hidden"
            data-oid="_7en5g:"
        >
            {visibleGroups.map((group, groupIdx) => (
                <React.Fragment key={group.key}>
                    {groupIdx > 0 && <InputSeparator data-oid="j8zdxyi" />}
                    <div className="flex items-center justify-center gap-0.5" data-oid="e5.1u3k">
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
                data-oid="ws1mg_4"
            />
        </div>
    );
};
