import { useEditorEngine } from '@/components/store/editor';
import { useUserManager } from '@/components/store/user';
import type { ChatSettings } from '@onlook/models';
import { EditorTabValue } from '@onlook/models';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';

export const ChatPanelDropdown = observer(
    ({
        children,
        isChatHistoryOpen,
        setIsChatHistoryOpen,
    }: {
        children: React.ReactNode;
        isChatHistoryOpen: boolean;
        setIsChatHistoryOpen: (isOpen: boolean) => void;
    }) => {
        const userManager = useUserManager();
        const editorEngine = useEditorEngine();

        const chatSettings = userManager.settings.settings.chat;
        const selectedTab = editorEngine.state.rightPanelTab;

        const updateChatSettings = (e: React.MouseEvent, settings: Partial<ChatSettings>) => {
            e.preventDefault();
            userManager.settings.updateChat(settings);
        };

        return (
            <DropdownMenu data-oid="va7iw:t">
                <DropdownMenuTrigger
                    asChild
                    disabled={selectedTab !== EditorTabValue.CHAT}
                    data-oid="an1j.-5"
                >
                    <div className="flex items-center" data-oid="d8b1e0q">
                        {children}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[220px]" data-oid="8yeu4w8">
                    <DropdownMenuItem
                        className="flex items-center py-1.5"
                        onClick={(e) => {
                            updateChatSettings(e, {
                                autoApplyCode: !chatSettings.autoApplyCode,
                            });
                        }}
                        data-oid="qupqmzy"
                    >
                        <Icons.Check
                            className={cn(
                                'mr-2 h-4 w-4',
                                chatSettings.autoApplyCode ? 'opacity-100' : 'opacity-0',
                            )}
                            data-oid="e7eram."
                        />
                        Auto - apply results
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center py-1.5"
                        onClick={(e) => {
                            updateChatSettings(e, {
                                expandCodeBlocks: !chatSettings.expandCodeBlocks,
                            });
                        }}
                        data-oid="d468jma"
                    >
                        <Icons.Check
                            className={cn(
                                'mr-2 h-4 w-4',
                                chatSettings.expandCodeBlocks ? 'opacity-100' : 'opacity-0',
                            )}
                            data-oid="akumw7d"
                        />
                        Show code while rendering
                    </DropdownMenuItem>

                    {/* TODO: Reenable */}
                    {/* <DropdownMenuItem
             className="flex items-center py-1.5"
             onClick={(e) => {
                 updateChatSettings(e, {
                     showSuggestions: !chatSettings.showSuggestions,
                 });
             }}
          >
             <Icons.Check
                 className={cn(
                     'mr-2 h-4 w-4',
                     chatSettings.showSuggestions ? 'opacity-100' : 'opacity-0',
                 )}
             />
             Show suggestions
          </DropdownMenuItem> */}

                    {/* TODO: Reenable */}
                    {/* <DropdownMenuItem
             className="flex items-center py-1.5"
             onClick={(e) => {
                 updateChatSettings(e, {
                     showMiniChat: !chatSettings.showMiniChat,
                 });
             }}
          >
             <Icons.Check
                 className={cn(
                     'mr-2 h-4 w-4',
                     chatSettings.showMiniChat ? 'opacity-100' : 'opacity-0',
                 )}
             />
             Show mini chat
          </DropdownMenuItem> */}
                    <DropdownMenuSeparator data-oid="u9o3kt1" />
                    <DropdownMenuItem
                        onClick={() => setIsChatHistoryOpen(!isChatHistoryOpen)}
                        data-oid="b7p3b3."
                    >
                        <Icons.CounterClockwiseClock className="mr-2 h-4 w-4" data-oid="qc5hvqa" />
                        Chat History
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
);
