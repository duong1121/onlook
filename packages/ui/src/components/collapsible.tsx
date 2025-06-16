import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
    return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} data-oid="kgo9rll" />;
}

function CollapsibleTrigger({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
    return (
        <CollapsiblePrimitive.CollapsibleTrigger
            data-slot="collapsible-trigger"
            {...props}
            data-oid="gh:qs3p"
        />
    );
}

function CollapsibleContent({
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
    return (
        <CollapsiblePrimitive.CollapsibleContent
            data-slot="collapsible-content"
            {...props}
            data-oid="-u45p.j"
        />
    );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
