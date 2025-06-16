'use client';

import { Hotkey } from '@/components/hotkey';
import { useEditorEngine } from '@/components/store/editor';
import { CurrentUserAvatar } from '@/components/ui/avatar-dropdown';
import { useFeatureFlags } from '@/hooks/use-feature-flags';
import { Button } from '@onlook/ui/button';
import { HotkeyLabel } from '@onlook/ui/hotkey-label';
import { Icons } from '@onlook/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@onlook/ui/tooltip';
import { observer } from 'mobx-react-lite';
import { motion } from 'motion/react';
import { useChatContext } from '../../_hooks/use-chat';
import { Members } from '../members';
import { ModeToggle } from './mode-toggle';
import { ProjectBreadcrumb } from './project-breadcrumb';
import { PublishButton } from './publish';

export const TopBar = observer(({ projectId }: { projectId: string }) => {
    const editorEngine = useEditorEngine();
    const { isWaiting } = useChatContext();
    const { isEnabled } = useFeatureFlags();

    const UNDO_REDO_BUTTONS = [
        {
            click: () => editorEngine.action.undo(),
            isDisabled: !editorEngine.history.canUndo || isWaiting,
            hotkey: Hotkey.UNDO,
            icon: <Icons.Reset className="h-4 w-4 mr-1" data-oid="2haz0e7" />,
        },
        {
            click: () => editorEngine.action.redo(),
            isDisabled: !editorEngine.history.canRedo || isWaiting,
            hotkey: Hotkey.REDO,
            icon: <Icons.Reset className="h-4 w-4 mr-1 scale-x-[-1]" data-oid="jru_8el" />,
        },
    ];

    return (
        <div
            className="bg-background-primary/20 backdrop-blur-md flex flex-row h-10 p-0 justify-center items-center"
            data-oid="31eb7s6"
        >
            <div
                className="flex flex-row flex-grow basis-0 space-x-1 justify-start items-center"
                data-oid="rqxqdem"
            >
                <ProjectBreadcrumb data-oid="o58dyw3" />
            </div>
            <ModeToggle data-oid="62k_:wo" />
            <div
                className="flex flex-grow basis-0 justify-end items-center gap-2 mr-2"
                data-oid="qag422x"
            >
                {isEnabled('NEXT_PUBLIC_FEATURE_COLLABORATION') && (
                    <Members projectId={projectId} data-oid="0-y5j0_" />
                )}
                <motion.div
                    className="space-x-0 hidden lg:block"
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        delay: 0,
                    }}
                    data-oid="-wc.ig1"
                >
                    {UNDO_REDO_BUTTONS.map(({ click, hotkey, icon, isDisabled }) => (
                        <Tooltip key={hotkey.description} data-oid=".23ry8n">
                            <TooltipTrigger asChild data-oid="7m4-0mn">
                                <span data-oid="ati1h-a">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8"
                                        onClick={click}
                                        disabled={isDisabled}
                                        data-oid="56_n5_j"
                                    >
                                        {icon}
                                    </Button>
                                </span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" hideArrow data-oid=".8nti7o">
                                <HotkeyLabel hotkey={hotkey} data-oid="9geuyab" />
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </motion.div>
                {/* TODO: Enable */}
                {/* <Tooltip>
                 <TooltipTrigger asChild>
                     <Button
                         variant="ghost"
                         size="icon"
                         className="h-8"
                         onClick={() => {
                             editorEngine.settingsTab = SettingsTabValue.VERSIONS;
                             editorEngine.isSettingsOpen = true;
                         }}
                     >
                         <Icons.CounterClockwiseClock className="h-4 w-4" />
                     </Button>
                 </TooltipTrigger>
                 <TooltipContent side="bottom">
                     {t(transKeys.editor.toolbar.versionHistory)}
                 </TooltipContent>
             </Tooltip> */}
                <PublishButton data-oid="xb7c.bw" />
                <CurrentUserAvatar
                    className="size-8 cursor-pointer hover:opacity-80"
                    data-oid="sbg8l9t"
                />
            </div>
        </div>
    );
});
