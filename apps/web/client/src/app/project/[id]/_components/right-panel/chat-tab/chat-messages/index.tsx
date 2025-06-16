import { useChatContext } from '@/app/project/[id]/_hooks/use-chat';
import { useEditorEngine } from '@/components/store/editor';
import type { AssistantChatMessageImpl } from '@/components/store/editor/chat/message/assistant';
import type { UserChatMessageImpl } from '@/components/store/editor/chat/message/user';
import { transKeys } from '@/i18n/keys';
import { ChatMessageRole } from '@onlook/models/chat';
import { ChatMessageList } from '@onlook/ui/chat/chat-message-list';
import { Icons } from '@onlook/ui/icons/index';
import { assertNever } from '@onlook/utility';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { AssistantMessage } from './assistant-message';
import { ErrorMessage } from './error-message';
import { StreamMessage } from './stream-message';
import { UserMessage } from './user-message';

export const ChatMessages = observer(() => {
    const editorEngine = useEditorEngine();
    const t = useTranslations();
    const { messages: uiMessages } = useChatContext();
    const conversation = editorEngine.chat.conversation.current;
    const messages = editorEngine.chat.conversation.current?.messages;

    const renderMessage = (message: AssistantChatMessageImpl | UserChatMessageImpl) => {
        let messageNode;
        switch (message.role) {
            case ChatMessageRole.ASSISTANT:
                messageNode = <AssistantMessage message={message} data-oid=".5zl0rw" />;
                break;
            case ChatMessageRole.USER:
                messageNode = <UserMessage message={message} data-oid="qszusr2" />;
                break;
            default:
                assertNever(message);
        }
        return (
            <div key={`message-${message.id}`} data-oid="li7uhyx">
                {messageNode}
            </div>
        );
    };

    if (!conversation) {
        return (
            <div
                className="flex-1 flex flex-row items-center justify-center text-foreground-tertiary/80 h-full gap-2"
                data-oid="u.ltq4o"
            >
                <Icons.Shadow className="animate-spin" data-oid="pg80k-h" />
                <p className="text-regularPlus" data-oid="y2refdr">
                    Loading conversation...
                </p>
            </div>
        );
    }

    if (!messages || messages.length === 0) {
        return (
            !editorEngine.elements.selected.length && (
                <div
                    className="flex-1 flex flex-col items-center justify-center text-foreground-tertiary/80 h-full"
                    data-oid="t2q.oh_"
                >
                    <Icons.EmptyState className="size-32" data-oid="38-frf5" />
                    <p
                        className="text-center text-regularPlus text-balance max-w-[300px]"
                        data-oid="vluh7qe"
                    >
                        {t(transKeys.editor.panels.edit.tabs.chat.emptyState)}
                    </p>
                </div>
            )
        );
    }

    return (
        <ChatMessageList
            contentKey={uiMessages?.map((message) => message.content).join('|') ?? ''}
            data-oid=":xeu17m"
        >
            {messages?.map((message) => renderMessage(message))}
            <StreamMessage data-oid="uenx6ia" />
            <ErrorMessage data-oid=".jkex-8" />
        </ChatMessageList>
    );
});
