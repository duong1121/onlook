import { useEditorEngine } from '@/components/store/editor';
import { Icons } from '@onlook/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Terminal } from './terminal';

export const TerminalArea = observer(({ children }: { children: React.ReactNode }) => {
    const editorEngine = useEditorEngine();
    const terminalSessions = editorEngine.sandbox.session.terminalSessions;
    const activeSessionId = editorEngine.sandbox.session.activeTerminalSessionId;

    const [terminalHidden, setTerminalHidden] = useState(true);

    if (!terminalSessions.size) {
        return (
            <div className="flex items-center justify-center h-full" data-oid="je_igbs">
                Initializing Sandbox...
            </div>
        );
    }

    return (
        <>
            {terminalHidden ? (
                <motion.div layout className="flex items-center gap-1" data-oid="zgn8tlt">
                    {children}
                    <Tooltip data-oid="e2vpgm5">
                        <TooltipTrigger asChild data-oid="cou8g_7">
                            <button
                                onClick={() => setTerminalHidden(!terminalHidden)}
                                className="h-9 w-9 flex items-center justify-center hover:text-foreground-hover text-foreground-tertiary hover:bg-accent rounded-md"
                                data-oid="11-ks9a"
                            >
                                <Icons.Terminal data-oid="3xprz9i" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent data-oid="_d39gtm">Toggle Terminal</TooltipContent>
                    </Tooltip>
                </motion.div>
            ) : (
                <motion.div
                    layout
                    className="flex items-center justify-between w-full mb-1"
                    data-oid="y6.hn0h"
                >
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.7 }}
                        className="text-small text-foreground-secondary ml-2 select-none"
                        data-oid="tt-uk-5"
                    >
                        Terminal
                    </motion.span>
                    <div className="flex items-center gap-1" data-oid="sg077hu">
                        <motion.div layout data-oid="k2xsy8t">
                            {/* <RunButton /> */}
                        </motion.div>
                        <Tooltip data-oid="_otl6ps">
                            <TooltipTrigger asChild data-oid="9z00qa-">
                                <button
                                    onClick={() => setTerminalHidden(!terminalHidden)}
                                    className="h-9 w-9 flex items-center justify-center hover:text-foreground-hover text-foreground-tertiary hover:bg-accent rounded-lg"
                                    data-oid="06g6:m6"
                                >
                                    <Icons.ChevronDown data-oid="n-5oa8." />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent data-oid="p9x.v.i">Toggle Terminal</TooltipContent>
                        </Tooltip>
                    </div>
                </motion.div>
            )}
            <div
                className={cn(
                    'bg-background rounded-lg transition-all duration-300 flex flex-col items-center justify-between h-full overflow-auto',
                    terminalHidden ? 'h-0 w-0 invisible' : 'h-[22rem] w-[37rem]',
                )}
                data-oid="wekm2m."
            >
                <Tabs
                    defaultValue={'cli'}
                    value={activeSessionId}
                    onValueChange={(value) =>
                        (editorEngine.sandbox.session.activeTerminalSessionId = value)
                    }
                    className="w-full h-full"
                    data-oid="kfgv:q3"
                >
                    <TabsList
                        className="w-full h-8 rounded-none border-b border-border"
                        data-oid="-2r:2e9"
                    >
                        {Array.from(terminalSessions).map(([id, terminal]) => (
                            <TabsTrigger key={id} value={id} className="flex-1" data-oid="1bwrax4">
                                {terminal.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="w-full h-full overflow-auto" data-oid="0owrjpe">
                        {Array.from(terminalSessions).map(([id]) => (
                            <TabsContent
                                key={id}
                                forceMount
                                value={id}
                                className="h-full"
                                hidden={activeSessionId !== id}
                                data-oid="qbe3cx:"
                            >
                                <Terminal
                                    hidden={terminalHidden}
                                    terminalSessionId={id}
                                    data-oid="du0:ilo"
                                />
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </>
    );
});
