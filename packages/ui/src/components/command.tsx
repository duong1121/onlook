'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';
import * as React from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/dialog';
import { cn } from '../utils';

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
    return (
        <CommandPrimitive
            data-slot="command"
            className={cn(
                'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
                className,
            )}
            {...props}
            data-oid="qac4e3s"
        />
    );
}

function CommandDialog({
    title = 'Command Palette',
    description = 'Search for a command to run...',
    children,
    ...props
}: React.ComponentProps<typeof Dialog> & { title?: string; description?: string }) {
    return (
        <Dialog {...props} data-oid="148.-ek">
            <DialogHeader className="sr-only" data-oid="i7ik49s">
                <DialogTitle data-oid="bq7u5xd">{title}</DialogTitle>
                <DialogDescription data-oid="j_9kzy5">{description}</DialogDescription>
            </DialogHeader>
            <DialogContent className="overflow-hidden p-0" data-oid="itqvcao">
                <Command
                    className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
                    data-oid="sljzt:h"
                >
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
}

function CommandInput({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div
            data-slot="command-input-wrapper"
            className="flex h-9 items-center gap-2 border-b px-3"
            data-oid="7112ktv"
        >
            <SearchIcon className="size-4 shrink-0 opacity-50" data-oid="9mawarh" />
            <CommandPrimitive.Input
                data-slot="command-input"
                className={cn(
                    'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                {...props}
                data-oid="b3f9hs-"
            />
        </div>
    );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
            {...props}
            data-oid="fvm:ffl"
        />
    );
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className="py-6 text-center text-sm"
            {...props}
            data-oid="-.0ebe0"
        />
    );
}

function CommandGroup({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className={cn(
                'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
                className,
            )}
            {...props}
            data-oid="5e0ath1"
        />
    );
}

function CommandSeparator({
    className,
    ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className={cn('bg-border -mx-1 h-px', className)}
            {...props}
            data-oid="vgypjit"
        />
    );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className={cn(
                "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
            data-oid="xq2jtzi"
        />
    );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="command-shortcut"
            className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
            {...props}
            data-oid="x7cbi0r"
        />
    );
}

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
};
