import { type ChatMessageContext } from '@onlook/models/chat';
import { Icons } from '@onlook/ui/icons/index';
import { motion } from 'motion/react';
import React from 'react';
import { getTruncatedName, getContextIcon } from './helpers';

export const DraftContextPill = React.forwardRef<
    HTMLDivElement,
    {
        context: ChatMessageContext;
        onRemove: () => void;
    }
>(({ context, onRemove }, ref) => {
    return (
        <motion.span
            layout="position"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.2,
                layout: {
                    duration: 0.15,
                    ease: 'easeOut',
                },
            }}
            className="group relative flex flex-row items-center gap-1 justify-center border bg-background-tertiary rounded-md h-7 px-2"
            ref={ref}
            data-oid="7kcn62x"
        >
            <div className="w-4 flex text-center items-center justify-center" data-oid="e0r93v5">
                <div data-oid="7_h5_a8">{getContextIcon(context)}</div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 p-1 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    data-oid="5b-zvw6"
                >
                    <Icons.CrossL
                        className="w-2.5 h-2.5 text-primary-foreground"
                        data-oid="2zy9k8y"
                    />
                </button>
            </div>
            <span className="text-xs" data-oid="wk:ye7_">
                {getTruncatedName(context)}
            </span>
        </motion.span>
    );
});

DraftContextPill.displayName = 'DraftContextPill';
