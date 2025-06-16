import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import { Input } from '@onlook/ui/input';
import { toast } from '@onlook/ui/sonner';
import { getValidUrl } from '@onlook/utility';
import { useState } from 'react';

export const UrlSection = ({ url, isCopyable }: { url: string; isCopyable: boolean }) => {
    const [isCopied, setIsCopied] = useState(false);
    const openUrl = () => {
        const lintedUrl = getValidUrl(url);
        window.open(lintedUrl, '_blank');
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(url);
        toast.success('Copied to clipboard');
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="flex flex-row items-center justify-between gap-2" data-oid="7ejopvl">
            <Input
                className="bg-background-secondary w-full text-xs"
                value={url}
                readOnly
                data-oid="bubxjtg"
            />
            {isCopyable ? (
                <Button onClick={copyUrl} variant="outline" size="icon" data-oid="0h5cqsu">
                    {isCopied ? (
                        <Icons.Check className="h-4 w-4" data-oid="5t40gpo" />
                    ) : (
                        <Icons.Copy className="h-4 w-4" data-oid="jgw7c6p" />
                    )}
                </Button>
            ) : (
                <Button onClick={openUrl} variant="outline" size="icon" data-oid="i-o95zn">
                    <Icons.ExternalLink className="h-4 w-4" data-oid="eyl6.9w" />
                </Button>
            )}
        </div>
    );
};
