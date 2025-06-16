'use client';

import { useProjectsManager } from '@/components/store/projects';
import { Icons } from '@onlook/ui/icons';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { SelectProject } from './_components/select';
import { TopBar } from './_components/top-bar';

const Page = observer(() => {
    const projectsManager = useProjectsManager();

    useEffect(() => {
        projectsManager.fetchProjects();
    }, []);

    if (projectsManager.isFetching) {
        return (
            <div
                className="w-screen h-screen flex flex-col items-center justify-center"
                data-oid="46f3l8x"
            >
                <div className="flex flex-col items-center gap-2" data-oid="j46erts">
                    <Icons.Shadow
                        className="h-6 w-6 animate-spin text-foreground-primary"
                        data-oid="g3bf.6l"
                    />
                    <div className="text-lg text-foreground-secondary" data-oid="o0zl.3s">
                        Loading projects...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col" data-oid="uqfwjo9">
            <TopBar data-oid="ap8fyax" />
            <div className="flex justify-center overflow-hidden w-full h-full" data-oid="2s_-i0n">
                <SelectProject data-oid="t-a9qqv" />
            </div>
        </div>
    );
});

export default Page;
