import { useChatContext } from '@/app/project/[id]/_hooks/use-chat';
import { useEditorEngine } from '@/components/store/editor';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@onlook/ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { observer } from 'mobx-react-lite';

export const ChatControls = observer(() => {
    const editorEngine = useEditorEngine();
    const { isWaiting } = useChatContext();

    const handleNewChat = () => {
        editorEngine.chat.conversation.startNewConversation();
        editorEngine.chat.focusChatInput();
    };

    return (
        <div
            className="flex flex-row opacity-50 transition-opacity duration-200 group-hover/panel:opacity-100"
            data-oid="v62xqhp"
        >
            <Tooltip data-oid="4r-57.a">
                <TooltipTrigger asChild data-oid="my1k6s_">
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="p-2 w-fit h-fit hover:bg-background-onlook cursor-pointer"
                        onClick={handleNewChat}
                        disabled={isWaiting}
                        data-oid="pljwyaz"
                    >
                        <Icons.Edit className="h-4 w-4" data-oid=".l9dcbc" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" data-oid="qxa_:c_">
                    <p data-oid="l_e.88b">New Chat</p>
                    <TooltipArrow className="fill-foreground" data-oid="5jn229o" />
                </TooltipContent>
            </Tooltip>
        </div>
    );
});
