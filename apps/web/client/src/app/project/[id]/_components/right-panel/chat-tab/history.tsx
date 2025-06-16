import { useEditorEngine } from '@/components/store/editor';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@onlook/ui/alert-dialog';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { Popover, PopoverAnchor, PopoverContent } from '@onlook/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface ChatHistoryProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ChatHistory = observer(({ isOpen, onOpenChange }: ChatHistoryProps) => {
    const editorEngine = useEditorEngine();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);

    const handlePopoverOpenChange = (open: boolean) => {
        if (!showDeleteDialog) {
            onOpenChange(open);
        }
    };

    const handleDeleteConversation = () => {
        if (conversationToDelete) {
            editorEngine.chat.conversation.deleteConversation(conversationToDelete);
            setShowDeleteDialog(false);
            setConversationToDelete(null);
        }
    };

    const groups = [{ name: 'Today' }];

    // Sort conversations by creation time, newest first
    const sortedConversations = [...editorEngine.chat.conversation.conversations].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <Popover open={isOpen} onOpenChange={handlePopoverOpenChange} data-oid="sj23nah">
            <PopoverAnchor className="absolute -left-2 top-0" data-oid="ujqs7s9" />
            <PopoverContent side="left" align="start" className="rounded-xl p-0" data-oid="5jqxh0x">
                <div className="flex flex-col select-none" data-oid="kjqrpbi">
                    <div className="border-b" data-oid="1u2.679">
                        <div
                            className="flex flex-row justify-between items-center p-1 h-fit text-xs text-foreground-tertiary"
                            data-oid=".koxkpk"
                        >
                            <span className="px-2" data-oid="f2aticm">
                                Chat History
                            </span>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                className="p-2 w-fit hover:bg-transparent"
                                onClick={() => onOpenChange(false)}
                                data-oid="9efh70e"
                            >
                                <Icons.CrossL data-oid="or50kk7" />
                            </Button>
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-2 p-2 text-foreground-tertiary"
                        data-oid="ydgby-o"
                    >
                        <div className="flex flex-col" data-oid="gftzi4.">
                            {groups.map((group) => (
                                <div
                                    className="flex flex-col gap-1"
                                    key={group.name}
                                    data-oid="s0dv32y"
                                >
                                    <span className="text-[0.7rem] px-2" data-oid="uk8ljgk">
                                        {group.name}
                                    </span>
                                    <div className="flex flex-col" data-oid="7dq.ofx">
                                        {sortedConversations.map((conversation) => (
                                            <div
                                                className={cn(
                                                    'flex flex-row w-full py-2 items-center rounded-md hover:bg-background-onlook cursor-pointer select-none group relative',
                                                    conversation.id ===
                                                        editorEngine.chat.conversation.current
                                                            ?.id &&
                                                        'bg-background-onlook text-primary font-semibold',
                                                )}
                                                key={conversation.id}
                                                onClick={() =>
                                                    editorEngine.chat.conversation.selectConversation(
                                                        conversation.id,
                                                    )
                                                }
                                                data-oid="sjsea:0"
                                            >
                                                <Icons.ChatBubble
                                                    className="flex-none mx-2"
                                                    data-oid="._mg:j-"
                                                />
                                                <span
                                                    className="text-xs truncate w-80 text-left"
                                                    data-oid="7ipy7x0"
                                                >
                                                    {conversation.displayName ?? 'New Conversation'}
                                                </span>
                                                <Tooltip data-oid="7p.iofw">
                                                    <TooltipTrigger asChild data-oid="-2y0:nd">
                                                        <Button
                                                            variant={'ghost'}
                                                            size={'icon'}
                                                            className="absolute right-0 px-2.5 py-2 top-1/2 -translate-y-1/2 w-fit h-fit opacity-0 group-hover:opacity-100 group-hover:bg-background-primary hover:bg-background-tertiary z-10"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setConversationToDelete(
                                                                    conversation.id,
                                                                );
                                                                setShowDeleteDialog(true);
                                                            }}
                                                            data-oid="cc1tpo8"
                                                        >
                                                            <Icons.Trash
                                                                className="w-4 h-4"
                                                                data-oid="i4ez6om"
                                                            />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right" data-oid="lrdoe6m">
                                                        <p
                                                            className="font-normal"
                                                            data-oid="u53spcw"
                                                        >
                                                            Delete Conversation
                                                        </p>
                                                        <TooltipArrow
                                                            className="fill-foreground"
                                                            data-oid="s7h3xvc"
                                                        />
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                data-oid="grj47b1"
            >
                <AlertDialogContent data-oid="k9vgmmw">
                    <AlertDialogHeader data-oid="vwy8gg:">
                        <AlertDialogTitle data-oid="ut9xvqs">
                            Are you sure you want to delete this conversation?
                        </AlertDialogTitle>
                        <AlertDialogDescription data-oid="vliz8w.">
                            This action cannot be undone. This will permanently delete your
                            conversation.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter data-oid="5zhsiru">
                        <Button
                            variant={'ghost'}
                            onClick={() => setShowDeleteDialog(false)}
                            data-oid="5.u906_"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={'destructive'}
                            className="rounded-md text-sm"
                            onClick={handleDeleteConversation}
                            data-oid="ancjplf"
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Popover>
    );
});
