import { cn } from '../utils';
import { Kbd } from './kbd';

export type Hotkey = {
    command: string;
    description: string;
    readableCommand: string;
};

export function HotkeyLabel({ hotkey, className }: { hotkey: Hotkey; className?: string }) {
    return (
        <span className={cn('flex items-center space-x-2', className)} data-oid="lnypoxc">
            <span data-oid="-3-uswo">{hotkey.description}</span>

            <Kbd data-oid="-_zctup">
                <span
                    className="inline-grid grid-flow-col auto-cols-max gap-1.5 items-center text-xs [&_kbd]:text-[1.1em]"
                    dangerouslySetInnerHTML={{ __html: hotkey.readableCommand }}
                    data-oid="toom0_2"
                />
            </Kbd>
        </span>
    );
}
