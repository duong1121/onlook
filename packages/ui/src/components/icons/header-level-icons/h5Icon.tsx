import type React from 'react';

interface H5IconProps {
    className?: string;
    letterClassName?: string;
    levelClassName?: string;
    [key: string]: any;
}

const H5Icon: React.FC<H5IconProps> = ({
    className,
    letterClassName,
    levelClassName,
    ...props
}) => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
        data-oid="rl.s.0_"
    >
        <path
            className={letterClassName}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.30469 2.50078C8.30469 2.25225 8.50616 2.05078 8.75469 2.05078H12.2547C12.5032 2.05078 12.7047 2.25225 12.7047 2.50078C12.7047 2.74931 12.5032 2.95078 12.2547 2.95078H11.0503V4.00039C11.0336 4.00013 11.0168 4 11 4C10.6368 4 10.2848 4.06052 9.95034 4.17393V2.95078H8.75469C8.50616 2.95078 8.30469 2.74931 8.30469 2.50078ZM7.31541 7.05062H5.05034V2.95078H6.25469C6.50322 2.95078 6.70469 2.74931 6.70469 2.50078C6.70469 2.25225 6.50322 2.05078 6.25469 2.05078H2.75469C2.50616 2.05078 2.30469 2.25225 2.30469 2.50078C2.30469 2.74931 2.50616 2.95078 2.75469 2.95078H3.95034V12.0508H2.75469C2.50616 12.0508 2.30469 12.2523 2.30469 12.5008C2.30469 12.7493 2.50616 12.9508 2.75469 12.9508H6.25469C6.50322 12.9508 6.70469 12.7493 6.70469 12.5008C6.70469 12.2523 6.50322 12.0508 6.25469 12.0508H5.05034V7.95062H7.08824C7.14151 7.63886 7.21802 7.33787 7.31541 7.05062Z"
            data-oid="::9vymd"
        />

        <path
            className={levelClassName}
            d="M9.42652 8.801C11 7.5 12.9258 8.32341 12.9258 10.5C12.9258 13.1431 9.5 13.5 9 11.1706M12.4258 5.5H10.0258C9.69441 5.5 9.42578 5.76863 9.42578 6.1V8.75156"
            strokeLinecap="round"
            data-oid="z3jr39p"
        />
    </svg>
);

export default H5Icon;
