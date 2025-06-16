import { type ChatMessageContext, MessageContextType } from '@onlook/models/chat';
import { Icons } from '@onlook/ui/icons/index';
import { motion } from 'motion/react';
import React from 'react';
import { getTruncatedName } from './helpers';

export const DraftImagePill = React.forwardRef<
    HTMLDivElement,
    {
        context: ChatMessageContext;
        onRemove: () => void;
    }
>(({ context, onRemove }, ref) => {
    if (context.type !== MessageContextType.IMAGE) {
        console.warn('DraftingImagePill received non-image context');
        return null;
    }

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
            className="group relative flex flex-row items-center gap-1 justify-center border bg-background-tertiary rounded-md h-7"
            key={context.displayName}
            ref={ref}
            data-oid="h7umxhu"
        >
            {/* Left side: Image thumbnail */}
            <div
                className="w-7 h-7 flex items-center justify-center overflow-hidden relative"
                data-oid="qqrinop"
            >
                <img
                    src={context.content}
                    alt={context.displayName}
                    className="w-full h-full object-cover rounded-l-md"
                    data-oid="9r3ft7."
                />

                <div
                    className="absolute inset-0 border-l-[1px] border-y-[1px] rounded-l-md border-white/10 pointer-events-none"
                    data-oid="7oohfz4"
                />
            </div>

            {/* Right side: Filename */}
            <span
                className="text-xs overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px] pr-1"
                data-oid="id82h5o"
            >
                {getTruncatedName(context)}
            </span>

            {/* Hover X button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute -top-1.5 -right-1.5 w-6 h-6 p-1 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                data-oid="0cx1-ni"
            >
                <Icons.CrossL className="w-2.5 h-2.5 text-primary-foreground" data-oid=":c-:a.a" />
            </button>
        </motion.span>
    );
});

DraftImagePill.displayName = 'DraftImagePill';
