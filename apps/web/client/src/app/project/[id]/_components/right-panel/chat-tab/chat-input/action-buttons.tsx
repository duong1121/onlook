import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';

export const ActionButtons = ({
    disabled,
    handleImageEvent,
}: {
    disabled: boolean;
    handleImageEvent: (file: File, fileName: string) => Promise<void>;
}) => {
    const handleOpenFileDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Removes focus from the button to prevent tooltip from showing
        e.currentTarget.blur();
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = async () => {
            if (inputElement.files && inputElement.files.length > 0) {
                const file = inputElement.files[0];
                if (!file) {
                    return;
                }
                const fileName = file.name;
                await handleImageEvent(file, fileName);
            }
        };
        inputElement.click();
    };

    return (
        <div className="flex flex-row justify-start gap-1.5" data-oid="x2isml0">
            <Tooltip data-oid="2mfrx8s">
                <TooltipTrigger asChild data-oid="svoacsv">
                    <Button
                        variant={'ghost'}
                        size={'icon'}
                        className="w-9 h-9 text-foreground-tertiary group hover:bg-transparent cursor-pointer"
                        onClick={handleOpenFileDialog}
                        disabled={disabled}
                        data-oid="5kp8p9_"
                    >
                        <Icons.Image
                            className={cn(
                                'w-5 h-5',
                                disabled
                                    ? 'text-foreground-tertiary'
                                    : 'group-hover:text-foreground',
                            )}
                            data-oid="6.1-2bg"
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipPortal data-oid="gtrsc2j">
                    <TooltipContent side="top" sideOffset={5} data-oid="jo4t7cw">
                        {disabled ? 'Select an element to start' : 'Upload Image Reference'}
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
            <Tooltip data-oid="n8rymx8">
                <TooltipPortal data-oid="frvmw2z">
                    <TooltipContent side="top" sideOffset={5} data-oid="xg6yk:p">
                        {disabled
                            ? 'Select an element to start'
                            : 'Add screenshot of the current page'}
                    </TooltipContent>
                </TooltipPortal>
            </Tooltip>
            <Button
                variant={'outline'}
                className="w-fit h-fit py-0.5 px-2.5 text-foreground-tertiary hidden cursor-pointer"
                data-oid="f1iqled"
            >
                <Icons.FilePlus className="mr-2" data-oid=":0fh:-q" />
                <span className="text-smallPlus" data-oid="s:ai0ud">
                    File Reference
                </span>
            </Button>
        </div>
    );
};
