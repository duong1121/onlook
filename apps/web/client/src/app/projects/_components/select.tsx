'use client';

import { useProjectsManager } from '@/components/store/projects';
import { Icons } from '@onlook/ui/icons/index';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useState } from 'react';
import { Carousel } from './carousel';
import { ProjectInfo } from './info';

export const SelectProject = observer(() => {
    const projectsManager = useProjectsManager();
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const projects = projectsManager.projects.toSorted(
        (a, b) =>
            new Date(b.metadata.updatedAt).getTime() - new Date(a.metadata.updatedAt).getTime(),
    );

    const handleProjectChange: (index: number) => void = (index: number) => {
        if (currentProjectIndex === index) {
            return;
        }
        setDirection(index > currentProjectIndex ? 1 : -1);
        setCurrentProjectIndex(index);
    };

    return (
        <div className="flex flex-row w-full" data-oid="xb7tjuk">
            {projects.length === 0 ? (
                <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4"
                    data-oid="z-ncy_o"
                >
                    <div className="text-xl text-foreground-secondary" data-oid=".3fpiq2">
                        No projects found
                    </div>
                    <div className="text-md text-foreground-tertiary" data-oid="9qjsrvf">
                        Create a new project to get started
                    </div>
                    <div className="flex justify-center" data-oid="kbw5zhp">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            data-oid="s2n-tf1"
                        >
                            <Icons.ArrowLeft className="h-4 w-4" data-oid="qn5-af4" />
                            Back to home
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-3/5 h-full" data-oid="d.z:bh:">
                        <Carousel
                            slides={projects}
                            onSlideChange={handleProjectChange}
                            data-oid="ywzh6yy"
                        />
                    </div>
                    <div
                        className="w-2/5 flex flex-col justify-center items-start p-4 mr-10 gap-6"
                        data-oid="hpiu8q:"
                    >
                        {projects[currentProjectIndex] && (
                            <ProjectInfo
                                project={projects[currentProjectIndex]}
                                direction={direction}
                                data-oid="p:sw8.c"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
});
