'use client';

import { ChatType } from '@/app/api/chat/route';
import { useChatContext } from '@/app/project/[id]/_hooks/use-chat';
import { useCreateManager } from '@/components/store/create';
import { useEditorEngine } from '@/components/store/editor';
import { useProjectManager } from '@/components/store/project';
import { useUserManager } from '@/components/store/user';
import { api } from '@/trpc/react';
import { Routes } from '@/utils/constants';
import { Icons } from '@onlook/ui/icons';
import { TooltipProvider } from '@onlook/ui/tooltip';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePanelMeasurements } from '../_hooks/use-panel-measure';
import { useTabActive } from '../_hooks/use-tab-active';
import { BottomBar } from './bottom-bar';
import { Canvas } from './canvas';
import { EditorBar } from './editor-bar';
import { LeftPanel } from './left-panel';
import { RightPanel } from './right-panel';
import { TopBar } from './top-bar';

export const Main = observer(({ projectId }: { projectId: string }) => {
    const editorEngine = useEditorEngine();
    const projectManager = useProjectManager();
    const createManager = useCreateManager();
    const userManager = useUserManager();
    const { sendMessages } = useChatContext();
    const { data: result, isLoading } = api.project.getFullProject.useQuery({ projectId });
    const leftPanelRef = useRef<HTMLDivElement | null>(null);
    const rightPanelRef = useRef<HTMLDivElement | null>(null);
    const { tabState } = useTabActive();

    const { toolbarLeft, toolbarRight, editorBarAvailableWidth } = usePanelMeasurements(
        leftPanelRef,
        rightPanelRef,
    );

    useEffect(() => {
        const initializeProject = async () => {
            if (!result) {
                return;
            }
            const { project, userCanvas, frames } = result;
            projectManager.project = project;

            if (project.sandbox?.id) {
                if (userManager.user?.id) {
                    if (!editorEngine.sandbox.session.session) {
                        await editorEngine.sandbox.session.start(
                            project.sandbox.id,
                            userManager.user.id,
                        );
                    }
                } else {
                    console.error('Initializing project: No user id');
                }
            } else {
                console.error('Initializing project: No sandbox id');
            }

            editorEngine.canvas.applyCanvas(userCanvas);
            editorEngine.frames.applyFrames(frames);
            await editorEngine.chat.conversation.fetchOrCreateConversation(project.id);
            resumeCreate();
        };

        initializeProject().catch((error) => {
            console.error('Error initializing project:', error);
        });
    }, [result, userManager.user?.id]);

    const resumeCreate = async () => {
        const creationData = createManager.pendingCreationData;
        if (!creationData) return;

        if (projectId !== creationData.project.id) return;

        const messages = await editorEngine.chat.getStreamMessages(
            creationData.prompt,
            creationData.images,
        );

        if (!messages) {
            console.error('Failed to get creation messages');
            return;
        }
        createManager.pendingCreationData = null;
        sendMessages(messages, ChatType.CREATE);
    };

    useEffect(() => {
        if (tabState === 'reactivated') {
            editorEngine.sandbox.session.reconnect(projectId, userManager.user?.id);
        }
    }, [tabState]);

    if (isLoading) {
        return (
            <div
                className="h-screen w-screen flex items-center justify-center gap-2"
                data-oid="m3.vt:r"
            >
                <Icons.Shadow
                    className="h-6 w-6 animate-spin text-foreground-primary"
                    data-oid="kalo:2y"
                />

                <div className="text-xl" data-oid=":b1vl64">
                    Loading project...
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div
                className="h-screen w-screen flex flex-col items-center justify-center gap-4"
                data-oid="tpy9-_4"
            >
                <div className="text-xl" data-oid="xmjcw.r">
                    Project not found
                </div>
                <Link
                    href={Routes.PROJECTS}
                    className="text-sm text-foreground-secondary"
                    data-oid="h327p0i"
                >
                    Go to projects
                </Link>
            </div>
        );
    }

    if (editorEngine.sandbox.session.isConnecting) {
        return (
            <div
                className="h-screen w-screen flex items-center justify-center gap-2"
                data-oid="tq7mfc2"
            >
                <Icons.Shadow
                    className="h-6 w-6 animate-spin text-foreground-primary"
                    data-oid="2az2612"
                />

                <div className="text-xl" data-oid="13v0s.c">
                    Connecting to sandbox...
                </div>
            </div>
        );
    }

    return (
        <TooltipProvider data-oid=":jd:ob2">
            <div
                className="h-screen w-screen flex flex-row select-none relative"
                data-oid="r0iue-k"
            >
                <Canvas data-oid="2rwu2gs" />

                <div className="absolute top-0 w-full" data-oid="x2as7qu">
                    <TopBar projectId={projectId} data-oid="87vrnoq" />
                </div>

                {/* Left Panel */}
                <div
                    ref={leftPanelRef}
                    className="absolute top-10 left-0 animate-layer-panel-in h-[calc(100%-40px)] z-50"
                    data-oid=":a7yop8"
                >
                    <LeftPanel data-oid="fmv4r32" />
                </div>

                {/* EditorBar anchored between panels */}
                <div
                    className="absolute top-10 z-49"
                    style={{
                        left: toolbarLeft,
                        right: toolbarRight,
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        maxWidth: editorBarAvailableWidth,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                    data-oid="lgze8v7"
                >
                    <div style={{ pointerEvents: 'auto' }} data-oid="6x38v.n">
                        <EditorBar availableWidth={editorBarAvailableWidth} data-oid="42h2j12" />
                    </div>
                </div>

                {/* Right Panel */}
                <div
                    ref={rightPanelRef}
                    className="absolute top-10 right-0 animate-edit-panel-in h-[calc(100%-40px)] z-50"
                    data-oid="yajy0ra"
                >
                    <RightPanel data-oid="vm-xd0x" />
                </div>

                <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-toolbar-up "
                    data-oid="wu0.1ly"
                >
                    <BottomBar data-oid="k3b83e5" />
                </div>
            </div>
        </TooltipProvider>
    );
});
