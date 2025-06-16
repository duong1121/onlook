'use client';

import React, { memo } from 'react';
import { Border } from './dropdowns/border';
import { ColorBackground } from './dropdowns/color-background';
import { Height } from './dropdowns/height';
import { Margin } from './dropdowns/margin';
import { Padding } from './dropdowns/padding';
import { Radius } from './dropdowns/radius';
import { Width } from './dropdowns/width';
import { useDropdownControl } from './hooks/use-dropdown-manager';
import { useMeasureGroup } from './hooks/use-measure-group';
import { OverflowMenu } from './overflow-menu';
import { InputSeparator } from './separator';

// Group definitions for the img-selected toolbar
export const IMG_SELECTED_GROUPS = [
    {
        key: 'dimensions',
        label: 'Dimensions',
        components: [<Width data-oid="436chv:" />, <Height data-oid="yty1tyy" />],
    },
    {
        key: 'base',
        label: 'Base',
        components: [
            <ColorBackground data-oid="aw6nfui" />,
            <Border data-oid="b58pv19" />,
            <Radius data-oid="_8troc9" />,
        ],
    },
    {
        key: 'layout',
        label: 'Layout',
        components: [<Padding data-oid="9qaqhyx" />, <Margin data-oid="ar0mlyb" />],
    },
    // {
    //     key: 'image',
    //     label: 'Image',
    //     components: [<ImgFit />, <ImageBackground />],
    // },
    // {
    //     key: 'opacity',
    //     label: 'Opacity',
    //     components: [<Opacity />],
    // },
];

export const ImgSelected = memo(({ availableWidth = 0 }: { availableWidth?: number }) => {
    const { isOpen, onOpenChange } = useDropdownControl({
        id: 'img-selected-overflow-dropdown',
    });
    const { visibleCount } = useMeasureGroup({ availableWidth, count: IMG_SELECTED_GROUPS.length });

    const visibleGroups = IMG_SELECTED_GROUPS.slice(0, visibleCount);
    const overflowGroups = IMG_SELECTED_GROUPS.slice(visibleCount);

    return (
        <div
            className="flex items-center justify-center gap-0.5 w-full overflow-hidden"
            data-oid="pq676fq"
        >
            {visibleGroups.map((group, groupIdx) => (
                <React.Fragment key={group.key}>
                    {groupIdx > 0 && <InputSeparator data-oid="nqdn-eq" />}
                    <div className="flex items-center justify-center gap-0.5" data-oid="epmrw4:">
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
                data-oid="kd.iovl"
            />
        </div>
    );
});
