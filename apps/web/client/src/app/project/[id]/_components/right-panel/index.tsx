'use client';

import { useEditorEngine } from '@/components/store/editor';
import { transKeys } from '@/i18n/keys';
import { EditorMode, EditorTabValue } from '@onlook/models';
import { Icons } from '@onlook/ui/icons';
import { ResizablePanel } from '@onlook/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChatTab } from './chat-tab';
import { ChatControls } from './chat-tab/controls';
import { ChatHistory } from './chat-tab/history';
import { ChatPanelDropdown } from './chat-tab/panel-dropdown';
import { DevTab } from './dev-tab';

const EDIT_PANEL_WIDTHS = {
    [EditorTabValue.CHAT]: 352,
    [EditorTabValue.DEV]: 700,
};

export const RightPanel = observer(() => {
    const editorEngine = useEditorEngine();
    const t = useTranslations();
    const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
    const selectedTab = editorEngine.state.rightPanelTab;
    const editPanelWidth = EDIT_PANEL_WIDTHS[selectedTab];

    return (
        <div
            id="style-panel"
            className={cn(
                'flex h-full w-full transition-width duration-300 bg-background/95 group/panel border-[0.5px] backdrop-blur-xl shadow rounded-tl-xl',
                editorEngine.state.editorMode === EditorMode.PREVIEW && 'hidden',
            )}
            data-oid="3r2ak:m"
        >
            <ResizablePanel
                side="right"
                defaultWidth={editPanelWidth}
                forceWidth={editPanelWidth}
                minWidth={240}
                maxWidth={1440}
                data-oid="u1i6xt4"
            >
                <Tabs
                    className="h-full gap-0"
                    onValueChange={(value) =>
                        (editorEngine.state.rightPanelTab = value as EditorTabValue)
                    }
                    value={selectedTab}
                    data-oid="9r9p959"
                >
                    <TabsList
                        className="flex flex-row h-10 w-full border-b-1 border-border items-center bg-transparent select-none pr-2 pl-1.5 justify-between"
                        data-oid="ngwja3n"
                    >
                        <div className="flex flex-row items-center gap-2 " data-oid="jn.bo:m">
                            <ChatPanelDropdown
                                isChatHistoryOpen={isChatHistoryOpen}
                                setIsChatHistoryOpen={setIsChatHistoryOpen}
                                data-oid="0pgoded"
                            >
                                <TabsTrigger
                                    className="bg-transparent py-2 px-1 text-small hover:text-foreground-hover cursor-pointer"
                                    value={EditorTabValue.CHAT}
                                    data-oid="jkh.uk:"
                                >
                                    <Icons.Sparkles
                                        className="mr-0.5 mb-0.5 h-4 w-4"
                                        data-oid="jhfztbp"
                                    />
                                    {t(transKeys.editor.panels.edit.tabs.chat.name)}
                                    <Icons.ChevronDown
                                        className="ml-0.5 h-3 w-3 text-muted-foreground"
                                        data-oid="slbut16"
                                    />
                                </TabsTrigger>
                            </ChatPanelDropdown>
                            <TabsTrigger
                                className="bg-transparent py-2 px-1 text-small hover:text-foreground-hover cursor-pointer"
                                value={EditorTabValue.DEV}
                                data-oid="54jtld_"
                            >
                                <Icons.Code className="mr-1 h-4 w-4" data-oid="3apwt5l" />
                                Code
                            </TabsTrigger>
                        </div>
                        {selectedTab === EditorTabValue.CHAT && <ChatControls data-oid="0jtk91l" />}
                    </TabsList>
                    <ChatHistory
                        isOpen={isChatHistoryOpen}
                        onOpenChange={setIsChatHistoryOpen}
                        data-oid=".knd._l"
                    />
                    <TabsContent
                        className="h-full overflow-y-auto"
                        value={EditorTabValue.CHAT}
                        data-oid="lozch_8"
                    >
                        <ChatTab data-oid="0rgeleu" />
                    </TabsContent>
                    <TabsContent
                        className="h-full overflow-y-auto"
                        value={EditorTabValue.DEV}
                        data-oid="4-8t7p_"
                    >
                        <DevTab data-oid="hdxx.q9" />
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
        </div>
    );
});
