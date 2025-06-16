import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@onlook/ui/alert-dialog';
import { Button } from '@onlook/ui/button';
import { observer } from 'mobx-react-lite';

const RenameImageModal = observer(
    ({
        isOpen,
        toggleOpen,
        onRename,
        newName,
    }: {
        isOpen: boolean;
        toggleOpen: () => void;
        onRename: (newName: string) => void;
        newName: string;
    }) => {
        return (
            <AlertDialog open={isOpen} onOpenChange={toggleOpen} data-oid="pkxz6mr">
                <AlertDialogContent data-oid="96q4m2m">
                    <AlertDialogHeader data-oid="stwx:9v">
                        <AlertDialogTitle data-oid="-1bji4h">Rename Image</AlertDialogTitle>
                        <AlertDialogDescription data-oid="wxgwc2u">
                            {`Rename image to "${newName}"`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter data-oid="_70fgyv">
                        <Button variant={'ghost'} onClick={toggleOpen} data-oid="4ir7eom">
                            Cancel
                        </Button>
                        <Button
                            variant={'default'}
                            onClick={() => onRename(newName)}
                            data-oid="kfhms:t"
                        >
                            Rename
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    },
);

export default RenameImageModal;
