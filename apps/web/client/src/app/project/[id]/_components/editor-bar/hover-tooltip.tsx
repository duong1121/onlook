import { Tooltip, TooltipTrigger, TooltipContent } from '@onlook/ui/tooltip';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface HoverOnlyTooltipProps {
    children: ReactNode;
    content: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    className?: string;
    hideArrow?: boolean;
    disabled?: boolean;
}

export function HoverOnlyTooltip({
    children,
    content,
    side = 'bottom',
    className,
    hideArrow = false,
    disabled = false,
}: HoverOnlyTooltipProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Tooltip open={hovered && !disabled} data-oid="-7z2a1n">
            <TooltipTrigger
                asChild
                onMouseEnter={() => !disabled && setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onBlur={() => setHovered(false)}
                data-oid="7j2eyw5"
            >
                {children}
            </TooltipTrigger>
            <TooltipContent
                side={side}
                className={className}
                hideArrow={hideArrow}
                data-oid="emwa4yg"
            >
                {content}
            </TooltipContent>
        </Tooltip>
    );
}
