import { useEditorEngine } from '@/components/store/editor';
import { SystemTheme } from '@onlook/models/assets';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import { toast } from '@onlook/ui/sonner';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

export const DeviceSettings = observer(({ frameId }: { frameId: string }) => {
    const editorEngine = useEditorEngine();
    const frameData = editorEngine.frames.get(frameId);
    const [theme, setTheme] = useState<SystemTheme>(SystemTheme.SYSTEM);

    useEffect(() => {
        if (frameData) {
            frameData.view.getTheme().then((theme) => {
                setTheme(theme);
            });
        }
    }, [frameData]);

    if (!frameData) {
        return (
            <p className="text-sm text-foreground-primary" data-oid="qfl14zb">
                Frame not found
            </p>
        );
    }

    async function changeTheme(newTheme: SystemTheme) {
        const previousTheme = theme;
        setTheme(newTheme);

        const success = await frameData?.view.setTheme(newTheme);
        if (!success) {
            toast.error('Failed to change theme');
            setTheme(previousTheme);
        }
    }

    return (
        <div className="flex flex-col gap-2" data-oid="_70:0wr">
            <p className="text-sm text-foreground-primary" data-oid="7z.4:33">
                Device Settings
            </p>
            <div className="flex flex-row justify-between items-center" data-oid="66owqfc">
                <span className="text-xs text-foreground-secondary" data-oid="w5x26j-">
                    Theme
                </span>
                <div
                    className="flex flex-row p-0.5 w-3/5 bg-background-secondary rounded"
                    data-oid="f.f4iua"
                >
                    <Button
                        size={'icon'}
                        className={`flex-1 h-full px-0.5 py-1.5 bg-background-secondary rounded-sm ${
                            theme === SystemTheme.SYSTEM
                                ? 'bg-background-tertiary hover:bg-background-tertiary'
                                : 'hover:bg-background-tertiary/50 text-foreground-onlook'
                        }`}
                        variant={'ghost'}
                        onClick={() => changeTheme(SystemTheme.SYSTEM)}
                        data-oid="mow3:v2"
                    >
                        <Icons.Laptop data-oid="maztmop" />
                    </Button>
                    <Button
                        size={'icon'}
                        className={`flex-1 h-full px-0.5 py-1.5 bg-background-secondary rounded-sm ${
                            theme === SystemTheme.DARK
                                ? 'bg-background-tertiary hover:bg-background-tertiary'
                                : 'hover:bg-background-tertiary/50 text-foreground-onlook'
                        }`}
                        variant={'ghost'}
                        onClick={() => changeTheme(SystemTheme.DARK)}
                        data-oid="lr-eqs4"
                    >
                        <Icons.Moon data-oid="8v:w4_7" />
                    </Button>
                    <Button
                        size={'icon'}
                        className={`flex-1 h-full px-0.5 py-1.5 bg-background-secondary rounded-sm ${
                            theme === SystemTheme.LIGHT
                                ? 'bg-background-tertiary hover:bg-background-tertiary'
                                : 'hover:bg-background-tertiary/50 text-foreground-onlook'
                        }`}
                        variant={'ghost'}
                        onClick={() => changeTheme(SystemTheme.LIGHT)}
                        data-oid="v12qp-f"
                    >
                        <Icons.Sun data-oid="n5.lkj9" />
                    </Button>
                </div>
            </div>
        </div>
    );
});
