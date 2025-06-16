'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import { cn } from '../utils';

function ScrollArea({
    className,
    children,
    ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={cn('relative', className)}
            {...props}
            data-oid="wvbhrkp"
        >
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
                data-oid="i-7:yw_"
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar data-oid="rw1rquv" />
            <ScrollAreaPrimitive.Corner data-oid="zjs1n4w" />
        </ScrollAreaPrimitive.Root>
    );
}

function ScrollBar({
    className,
    orientation = 'vertical',
    ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                'flex touch-none p-px transition-colors select-none',
                orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
                orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
                className,
            )}
            {...props}
            data-oid="d2kmuau"
        >
            <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot="scroll-area-thumb"
                className="bg-border relative flex-1 rounded-full"
                data-oid="gqf6_tm"
            />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
}

export { ScrollArea, ScrollBar };
