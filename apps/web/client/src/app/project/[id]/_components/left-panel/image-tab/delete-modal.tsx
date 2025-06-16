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

export default function DeleteImageModal({
    onDelete,
    isOpen,
    toggleOpen,
}: {
    onDelete: () => void;
    isOpen: boolean;
    toggleOpen: () => void;
}) {
    const editorEngine = useEditorEngine();

    const handleDelete = () => {
        onDelete();
        toggleOpen();
    };

    const handleClose = () => {
        // Reset pointer-events and editor mode when modal is closed
        // for (const frame of editorEngine.frames.getAll()) {
        //     frame.frame.pointerEvents = 'auto';
        // }
        // editorEngine.mode = EditorMode.DESIGN;
        editorEngine.overlay.clear();
        toggleOpen();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={handleClose} data-oid="bm80uj7">
            <AlertDialogContent data-oid="t07xa2l">
                <AlertDialogHeader data-oid="ovu2f8o">
                    <AlertDialogTitle data-oid="io5808k">{'Delete this image?'}</AlertDialogTitle>
                    <AlertDialogDescription data-oid="m_bovfp">
                        {"This will delete the image from the project. You can't undo this action."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter data-oid="tl4ua4w">
                    <Button variant={'ghost'} onClick={handleClose} data-oid="d0hpofi">
                        Cancel
                    </Button>
                    <Button
                        variant={'destructive'}
                        className="rounded-md text-sm"
                        onClick={handleDelete}
                        data-oid="uw:9-mx"
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
