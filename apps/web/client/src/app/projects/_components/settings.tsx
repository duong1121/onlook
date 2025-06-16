import { useProjectsManager } from '@/components/store/projects';
import { transKeys } from '@/i18n/keys';
import type { Project } from '@onlook/models';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@onlook/ui/alert-dialog';
import { Button } from '@onlook/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { Input } from '@onlook/ui/input';
import { Label } from '@onlook/ui/label';
import { cn } from '@onlook/ui/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

export function Settings({ project }: { project: Project }) {
    const projectsManager = useProjectsManager();
    const t = useTranslations();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showRenameDialog, setShowRenameDialog] = useState(false);
    const [projectName, setProjectName] = useState(project.name);
    const isProjectNameEmpty = useMemo(() => projectName.length === 0, [projectName]);
    const [isDirectoryHovered, setIsDirectoryHovered] = useState(false);

    useEffect(() => {
        setProjectName(project.name);
    }, [project.name]);

    const handleDeleteProject = () => {
        projectsManager.deleteProject(project);
        setShowDeleteDialog(false);
    };

    const handleRenameProject = () => {
        projectsManager.updateProject({ ...project, name: projectName });
        setShowRenameDialog(false);
    };

    return (
        <>
            <DropdownMenu data-oid="p84ltmn">
                <DropdownMenuTrigger asChild data-oid="lsjv-.d">
                    <Button
                        size="default"
                        variant="ghost"
                        className="w-10 h-10 p-0 flex items-center justify-center hover:bg-background-onlook cursor-pointer"
                        data-oid="9m0di-3"
                    >
                        <Icons.DotsVertical data-oid="714j.2p" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent data-oid="gf:ech:">
                    <DropdownMenuItem
                        onSelect={() => setShowRenameDialog(true)}
                        className="text-foreground-active hover:!bg-background-onlook hover:!text-foreground-active gap-2"
                        data-oid="itraw99"
                    >
                        <Icons.Pencil className="w-4 h-4" data-oid="-zuxo4n" />
                        {t(transKeys.projects.actions.renameProject)}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteDialog(true)}
                        className="gap-2 text-red-400 hover:!bg-red-200/80 hover:!text-red-700 dark:text-red-200 dark:hover:!bg-red-800 dark:hover:!text-red-100"
                        data-oid="5b_zwzc"
                    >
                        <Icons.Trash className="w-4 h-4" data-oid="4rsx6zn" />
                        {t(transKeys.projects.actions.deleteProject)}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                data-oid="nfkm0za"
            >
                <AlertDialogContent data-oid="c96d4h:">
                    <AlertDialogHeader data-oid="g.o-j89">
                        <AlertDialogTitle data-oid="s241qdo">
                            {t(transKeys.projects.dialogs.delete.title)}
                        </AlertDialogTitle>
                        <AlertDialogDescription data-oid="lek7m-o">
                            {t(transKeys.projects.dialogs.delete.description)}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter data-oid="hg8x7nt">
                        <Button
                            variant={'ghost'}
                            onClick={() => setShowDeleteDialog(false)}
                            data-oid="ih_ao:b"
                        >
                            {t(transKeys.projects.actions.cancel)}
                        </Button>
                        <Button
                            variant={'destructive'}
                            className="rounded-md text-sm"
                            onClick={handleDeleteProject}
                            data-oid="bjb16-a"
                        >
                            {t(transKeys.projects.actions.delete)}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog
                open={showRenameDialog}
                onOpenChange={setShowRenameDialog}
                data-oid="djo3f9v"
            >
                <AlertDialogContent data-oid="6l4_kbt">
                    <AlertDialogHeader data-oid="3m3ee01">
                        <AlertDialogTitle data-oid="pcp94l6">
                            {t(transKeys.projects.dialogs.rename.title)}
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex flex-col w-full gap-2" data-oid="i_:l_yo">
                        <Label htmlFor="text" data-oid="-y_cx_n">
                            {t(transKeys.projects.dialogs.rename.label)}
                        </Label>
                        <Input
                            minLength={0}
                            type="text"
                            value={projectName || ''}
                            onInput={(e) => setProjectName(e.currentTarget.value)}
                            data-oid="u1qjwt_"
                        />

                        <p
                            className={cn(
                                'text-xs text-red-500 transition-opacity',
                                isProjectNameEmpty ? 'opacity-100' : 'opacity-0',
                            )}
                            data-oid="94_uy6k"
                        >
                            {t(transKeys.projects.dialogs.rename.error)}
                        </p>
                    </div>
                    <AlertDialogFooter data-oid="0pam-ld">
                        <Button
                            variant={'ghost'}
                            onClick={() => setShowRenameDialog(false)}
                            data-oid="-.54bkc"
                        >
                            {t(transKeys.projects.actions.cancel)}
                        </Button>
                        <Button
                            disabled={isProjectNameEmpty}
                            className="rounded-md text-sm"
                            onClick={handleRenameProject}
                            data-oid="emby0gv"
                        >
                            {t(transKeys.projects.actions.rename)}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
