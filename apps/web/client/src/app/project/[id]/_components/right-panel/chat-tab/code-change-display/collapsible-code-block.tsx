import { useEditorEngine } from '@/components/store/editor';
import { useUserManager } from '@/components/store/user';
import { Button } from '@onlook/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@onlook/ui/collapsible';
import { Icons } from '@onlook/ui/icons';
import { cn, getTruncatedFileName } from '@onlook/ui/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { CodeBlock } from './code-block';

interface CollapsibleCodeBlockProps {
    path: string;
    content: string;
    messageId: string;
    originalContent: string;
    updatedContent: string;
    applied: boolean;
    isStream?: boolean;
}

export const CollapsibleCodeBlock = observer(
    ({
        path,
        content,
        messageId,
        updatedContent,
        applied,
        isStream,
    }: CollapsibleCodeBlockProps) => {
        const userManager = useUserManager();
        const editorEngine = useEditorEngine();

        const applyChange = async () => {
            await editorEngine.chat.code.applyCode(messageId);
        };

        const rejectChange = async () => {
            await editorEngine.chat.code.revertCode(messageId);
        };

        const [isOpen, setIsOpen] = useState(false);
        const [copied, setCopied] = useState(false);

        const copyToClipboard = () => {
            navigator.clipboard.writeText(updatedContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        const getAnimation = () => {
            if (isStream && userManager.settings.settings?.chat?.expandCodeBlocks) {
                return { height: 'auto', opacity: 1 };
            }
            return isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 };
        };

        return (
            <div className="group relative" data-oid="msgniw8">
                <Collapsible open={isOpen} onOpenChange={setIsOpen} data-oid="trpmz42">
                    <div
                        className={cn(
                            'border rounded-lg bg-background-primary relative',
                            !isOpen && 'group-hover:bg-background-secondary',
                        )}
                        data-oid="v0mmvjj"
                    >
                        <div
                            className={cn(
                                'flex items-center justify-between text-foreground-secondary transition-colors',
                                !isOpen && 'group-hover:text-foreground-primary',
                            )}
                            data-oid="7i7c90t"
                        >
                            <CollapsibleTrigger asChild data-oid="q72jkec">
                                <div
                                    className="flex-1 flex items-center gap-2 cursor-pointer pl-3 py-2"
                                    data-oid="n3kn590"
                                >
                                    {isStream ? (
                                        <Icons.Shadow
                                            className="h-4 w-4 animate-spin"
                                            data-oid="d4fkhnn"
                                        />
                                    ) : (
                                        <Icons.ChevronDown
                                            className={cn(
                                                'h-4 w-4 transition-transform duration-200',
                                                isOpen && 'rotate-180',
                                            )}
                                            data-oid="oodo-::"
                                        />
                                    )}
                                    <span
                                        className={cn(
                                            'text-small pointer-events-none select-none',
                                            isStream && 'text-shimmer',
                                        )}
                                        data-oid="i6b8_w2"
                                    >
                                        {getTruncatedFileName(path)}
                                    </span>
                                </div>
                            </CollapsibleTrigger>

                            <div className="flex items-center gap-1 pr-1 py-1" data-oid="-xjbcjd">
                                {!isStream &&
                                    (applied ? (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                rejectChange();
                                            }}
                                            size="sm"
                                            variant="ghost"
                                            className="h-7 px-3 text-foreground-secondary hover:text-foreground font-sans select-none"
                                            data-oid="wh_xz6t"
                                        >
                                            <Icons.Return
                                                className="h-4 w-4 mr-2"
                                                data-oid=".dyjlqw"
                                            />
                                            Revert
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className={cn(
                                                'h-7 px-3 border-[0.5px] transition-all font-sans select-none',
                                                editorEngine.chat.code.isApplying
                                                    ? 'opacity-50 cursor-not-allowed text-foreground-secondary hover:text-foreground'
                                                    : 'dark:text-teal-200 dark:bg-teal-900/80 dark:border-teal-600 text-teal-700 dark:hover:border-teal-400 dark:hover:text-teal-100 dark:hover:bg-teal-700 hover:bg-teal-100 hover:border-teal-400 hover:text-teal-800 border-teal-300 bg-teal-50 ',
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                applyChange();
                                            }}
                                            disabled={editorEngine.chat.code.isApplying}
                                            data-oid="x3rn:66"
                                        >
                                            {editorEngine.chat.code.isApplying ? (
                                                <>
                                                    <Icons.Shadow
                                                        className="h-4 w-4 mr-2 animate-spin"
                                                        data-oid="b.ii0tj"
                                                    />
                                                    Applying...
                                                </>
                                            ) : (
                                                <>
                                                    <Icons.Sparkles
                                                        className="h-4 w-4 mr-2"
                                                        data-oid=".hht.m_"
                                                    />
                                                    Apply
                                                </>
                                            )}
                                        </Button>
                                    ))}
                            </div>
                        </div>

                        <CollapsibleContent forceMount data-oid="_bq6f0r">
                            <AnimatePresence mode="wait" data-oid="qmb-vy2">
                                <motion.div
                                    key="content"
                                    initial={getAnimation()}
                                    animate={getAnimation()}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                    data-oid="ummkg4u"
                                >
                                    <div className="border-t" data-oid=".p03qau">
                                        {isStream ? (
                                            <code
                                                className="p-4 text-xs w-full overflow-x-auto block text-foreground-secondary"
                                                data-oid="virk_c4"
                                            >
                                                {content}
                                            </code>
                                        ) : (
                                            <CodeBlock code={updatedContent} data-oid="5fj2.q3" />
                                        )}
                                        <div
                                            className="flex justify-end gap-1.5 p-1 border-t"
                                            data-oid="ky1qd9l"
                                        >
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 px-2 text-foreground-secondary hover:text-foreground font-sans select-none"
                                                onClick={copyToClipboard}
                                                data-oid="iw.12hf"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Icons.Check
                                                            className="h-4 w-4 mr-2"
                                                            data-oid="9vynga:"
                                                        />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icons.Copy
                                                            className="h-4 w-4 mr-2"
                                                            data-oid=".k_j-xn"
                                                        />
                                                        Copy
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </div>
        );
    },
);
