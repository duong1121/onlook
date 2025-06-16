import { useEditorEngine } from '@/components/store/editor';
import { DropdownMenu, DropdownMenuContent } from '@onlook/ui/dropdown-menu';
import { observer } from 'mobx-react-lite';
import { PublishDropdown } from './dropdown';
import { TriggerButton } from './trigger-button';

export const PublishButton = observer(() => {
    const editorEngine = useEditorEngine();

    return (
        <DropdownMenu
            open={editorEngine.state.publishOpen}
            onOpenChange={(open: boolean) => {
                editorEngine.state.publishOpen = open;
            }}
            data-oid="v:5kdjq"
        >
            <TriggerButton data-oid="84az1_4" />
            <DropdownMenuContent align="end" className="w-96 p-0 text-sm" data-oid="b8r8g_v">
                <PublishDropdown data-oid="9fzmnsz" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
