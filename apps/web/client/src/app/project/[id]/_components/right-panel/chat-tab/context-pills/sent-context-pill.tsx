import { type ChatMessageContext } from '@onlook/models/chat';
import { getContextIcon, getTruncatedName } from './helpers';

export function SentContextPill({ context }: { context: ChatMessageContext }) {
    return (
        <span
            className="flex flex-row gap-0.5 text-xs items-center select-none"
            key={context.displayName}
            data-oid="h65__9g"
        >
            {getContextIcon(context)}
            <span className="truncate" data-oid="a-gv404">
                {getTruncatedName(context)}
            </span>
        </span>
    );
}
