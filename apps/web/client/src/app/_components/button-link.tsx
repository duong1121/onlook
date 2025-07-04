// Reusable button-link component
export function ButtonLink({
    href,
    children,
    rightIcon,
}: {
    href: string;
    children: React.ReactNode;
    rightIcon?: React.ReactNode;
}) {
    return (
        <a
            href={href}
            className="text-foreground-primary text-lg font-normal flex items-center gap-2 border-b border-foreground-primary/80 pb-1 hover:opacity-80 transition-opacity"
            style={{ width: 'fit-content' }}
            data-oid="j8151dq"
        >
            {children}
            {rightIcon && (
                <span className="ml-2 flex items-center" data-oid="n7kqev2">
                    {rightIcon}
                </span>
            )}
        </a>
    );
}
