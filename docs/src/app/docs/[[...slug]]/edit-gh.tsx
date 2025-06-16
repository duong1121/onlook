'use client';

import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';

export function EditGitHub({ filePath }: { filePath: string }) {
    return (
        <Button
            onClick={() => {
                window.open(
                    `https://github.com/onlook-dev/onlook/blob/main/docs/content/docs/${filePath}`,
                    '_blank',
                );
            }}
            variant="outline"
            className="w-fit border rounded-xl p-2 font-medium text-sm text-fd-secondary-foreground bg-fd-secondary-background hover:bg-fd-secondary-background/80 mt-8 inline-flex items-center gap-2"
            data-oid=".nax1:l"
        >
            <Icons.GitHubLogo className="w-4 h-4" data-oid="y7xonsw" />
            Edit on GitHub
        </Button>
    );
}
