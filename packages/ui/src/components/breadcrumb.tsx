import { ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cn } from '../utils';

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} data-oid="ns7o30_" />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn(
                'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
                className,
            )}
            {...props}
            data-oid="2y5uo91"
        />
    );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
    return (
        <li
            data-slot="breadcrumb-item"
            className={cn('inline-flex items-center gap-1.5', className)}
            {...props}
            data-oid="wa-6dqq"
        />
    );
}

function BreadcrumbLink({
    asChild,
    className,
    ...props
}: React.ComponentProps<'a'> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            data-slot="breadcrumb-link"
            className={cn('hover:text-foreground transition-colors', className)}
            {...props}
            data-oid="2p6prn-"
        />
    );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn('text-foreground font-normal', className)}
            {...props}
            data-oid="1tvmsbu"
        />
    );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
    return (
        <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn('[&>svg]:size-3.5', className)}
            {...props}
            data-oid=".gdx:g."
        >
            {children ?? <ChevronRightIcon data-oid="epipgn0" />}
        </li>
    );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn('flex size-9 items-center justify-center', className)}
            {...props}
            data-oid="9zpreh."
        >
            <DotsHorizontalIcon className="size-4" data-oid="70f_014" />
            <span className="sr-only" data-oid="y7ka__8">
                More
            </span>
        </span>
    );
}

export {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
};
