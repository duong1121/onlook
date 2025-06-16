import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { ErrorSection } from './error';

export const ChatTab = () => {
    return (
        <div className="flex flex-col h-full justify-end gap-2 pt-2" data-oid="n1-5a3p">
            <div className="h-full flex-1 overflow-y-auto" data-oid="f9xc4_i">
                <ChatMessages data-oid=":d88mdi" />
            </div>
            <ErrorSection data-oid="6nu3htz" />
            <ChatInput data-oid="er96rt-" />
        </div>
    );
};
