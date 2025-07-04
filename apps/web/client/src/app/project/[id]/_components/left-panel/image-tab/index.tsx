import { useEditorEngine } from '@/components/store/editor';
import { useProjectManager } from '@/components/store/project';
import { sendAnalytics } from '@/utils/analytics';
import { EditorMode, type ImageContentData } from '@onlook/models';
import { Button } from '@onlook/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { Input } from '@onlook/ui/input';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '@onlook/ui/tooltip';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import imageData from './data.json';
import DeleteImageModal from './delete-modal';
import RenameImageModal from './rename-modal';

export const ImagesTab = observer(() => {
    const editorEngine = useEditorEngine();
    const projectManager = useProjectManager();

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const imageFolder: string | null = null;
    const [imageToDelete, setImageToDelete] = useState<string | null>(null);
    const [imageToRename, setImageToRename] = useState<string | null>(null);
    const [newImageName, setNewImageName] = useState<string>('');
    const [renameError, setRenameError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     scanImages();
    // }, []);

    const imageAssets = useMemo(() => {
        return imageData.images;
        // return editorEngine.image.assets;
    }, [imageData.images]);

    const scanImages = async () => {
        await editorEngine.image.scanImages();
    };

    const uploadImage = async (file: File) => {
        setUploadError(null);

        if (!file.type.startsWith('image/')) {
            setUploadError('Please select a valid image file');
            return;
        }
        try {
            await editorEngine.image.upload(file);
        } catch (error) {
            setUploadError('Failed to upload image. Please try again.');
            console.error('Image upload error:', error);
        }
    };

    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));

        for (const imageFile of imageFiles) {
            await uploadImage(imageFile);
        }
    };

    const handleClickAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur(); // Removes focus from the button to prevent tooltip from showing
        const input = document.getElementById('images-upload');
        if (input) {
            input.click();
        }
    };

    const filteredImages = useMemo(() => {
        if (!search.trim()) {
            return imageAssets;
        }
        const searchLower = search.toLowerCase();
        return imageAssets.filter((image) => image.fileName?.toLowerCase()?.includes(searchLower));
    }, [search, imageAssets]);

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        setIsDragging(false);
        e.currentTarget.removeAttribute('data-dragging-image');

        const items = Array.from(e.dataTransfer.items);
        const imageFiles = items
            .filter((item) => item.type.startsWith('image/'))
            .map((item) => item.getAsFile())
            .filter((file): file is File => file !== null);

        for (const file of imageFiles) {
            await uploadImage(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleDragStateChange(true, e);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            handleDragStateChange(false, e);
        }
    };

    const handleDragStateChange = (isDragging: boolean, e: React.DragEvent<HTMLDivElement>) => {
        const hasImage =
            e.dataTransfer.types.length > 0 &&
            Array.from(e.dataTransfer.items).some(
                (item) =>
                    item.type.startsWith('image/') ||
                    (item.type === 'Files' && e.dataTransfer.types.includes('public.file-url')),
            );
        if (hasImage) {
            setIsDragging(isDragging);
            e.currentTarget.setAttribute('data-dragging-image', isDragging.toString());
        }
    };

    const handleDeleteImage = (image: ImageContentData) => {
        setImageToDelete(image.fileName);
    };

    const onDeleteImage = async () => {
        if (imageToDelete) {
            await editorEngine.image.delete(imageToDelete);
            setImageToDelete(null);
        }
    };

    const handleRenameImage = (image: ImageContentData) => {
        setImageToRename(image.fileName);
        setNewImageName(image.fileName);
    };

    const handleRenameInputBlur = (value: string) => {
        if (value.trim() === '') {
            setRenameError('Image name cannot be empty');
            return;
        }
        if (imageToRename) {
            const extension = imageToRename.split('.').pop() ?? '';
            const newBaseName = value.replace(`.${extension}`, '');
            const proposedNewName = `${newBaseName}.${extension}`;

            if (proposedNewName !== imageToRename) {
                setNewImageName(proposedNewName);
            } else {
                setImageToRename(null);
            }
        }
    };

    const onRenameImage = async (newName: string) => {
        try {
            if (imageToRename && newName && newName !== imageToRename) {
                await editorEngine.image.rename(imageToRename, newName);
            }
        } catch (error) {
            setRenameError(
                error instanceof Error
                    ? error.message
                    : 'Failed to rename image. Please try again.',
            );
            console.error('Image rename error:', error);
            return;
        } finally {
            setImageToRename(null);
            setNewImageName('');
        }
    };

    useEffect(() => {
        if (renameError) {
            const timer = setTimeout(() => {
                setRenameError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [renameError]);

    const handleImageDragStart = (e: React.DragEvent<HTMLDivElement>, image: ImageContentData) => {
        e.dataTransfer.setData(
            'application/json',
            JSON.stringify({
                type: 'image',
                fileName: image.fileName,
                content: image.content,
                mimeType: image.mimeType,
            }),
        );

        // for (const frameView of editorEngine.frames.webviews.values()) {
        //     frameView.frameView.style.pointerEvents = 'none';
        // }

        // editorEngine.mode = EditorMode.INSERT_IMAGE;
        sendAnalytics('image drag');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearch('');
            inputRef.current?.blur();
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-2 p-3 overflow-x-hidden" data-oid="vue-jhq">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="images-upload"
                onChange={handleUploadFile}
                multiple
                data-oid="mze-b6e"
            />

            {uploadError && (
                <div
                    className="mb-2 px-3 py-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md"
                    data-oid="xk1fobo"
                >
                    {uploadError}
                </div>
            )}
            {renameError && (
                <div
                    className="mb-2 px-3 py-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md"
                    data-oid="4zs47qi"
                >
                    {renameError}
                </div>
            )}
            {!!imageAssets.length && (
                <div className="flex flex-row items-center gap-2 m-0" data-oid="_.7ky-d">
                    <div className="relative min-w-0 flex-1" data-oid="h3p7nx1">
                        <Input
                            ref={inputRef}
                            className="h-8 text-xs pr-8 w-full"
                            placeholder="Search images"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            data-oid="z_voy7o"
                        />

                        {search && (
                            <button
                                className="absolute right-[1px] top-[1px] bottom-[1px] aspect-square hover:bg-background-onlook active:bg-transparent flex items-center justify-center rounded-r-[calc(theme(borderRadius.md)-1px)] group"
                                onClick={() => setSearch('')}
                                data-oid="768:1ax"
                            >
                                <Icons.CrossS
                                    className="h-3 w-3 text-foreground-primary/50 group-hover:text-foreground-primary"
                                    data-oid="f70:-yt"
                                />
                            </button>
                        )}
                    </div>
                    <Tooltip data-oid="4a2b4s0">
                        <TooltipTrigger asChild data-oid="31r32_n">
                            <Button
                                variant={'default'}
                                size={'icon'}
                                className="p-2 w-fit h-fit text-foreground-primary border-border-primary hover:border-border-onlook bg-background-secondary hover:bg-background-onlook border"
                                onClick={handleClickAddButton}
                                data-oid="x_fsje9"
                            >
                                <Icons.Plus data-oid="uofl5:f" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipPortal data-oid="joi_692">
                            <TooltipContent data-oid="q-sircn">
                                <p data-oid="_8t0ec5">Upload an image</p>
                            </TooltipContent>
                        </TooltipPortal>
                    </Tooltip>
                </div>
            )}
            <div
                className={cn(
                    'flex-1 overflow-y-auto',
                    '[&[data-dragging-image=true]]:bg-teal-500/40',
                    isDragging && 'cursor-copy',
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                data-oid="cvteyg9"
            >
                {imageAssets.length === 0 ? (
                    <div
                        className="h-full flex items-center justify-center text-center opacity-70"
                        data-oid="j:3h5bs"
                    >
                        <div data-oid="00myyd-">
                            <Button
                                onClick={handleClickAddButton}
                                variant={'ghost'}
                                size={'icon'}
                                className="p-2 w-fit h-fit hover:bg-background-onlook"
                                data-oid="sqolj_j"
                            >
                                <Icons.Plus data-oid="nu5-464" />
                            </Button>
                            <span className="block w-2/3 mx-auto text-xs" data-oid="zj8ttho">
                                Upload images using the Plus icon
                            </span>
                        </div>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div
                        className="flex items-center justify-center h-32 text-xs text-foreground-primary/50"
                        data-oid="9hsjr6."
                    >
                        No images found
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-2 gap-3 p-0" data-oid="cdptjd-">
                        {filteredImages.map((image) => (
                            <div
                                key={image.fileName}
                                className="relative group w-full"
                                draggable
                                onDragStart={(e) => handleImageDragStart(e, image)}
                                onDragEnd={() => {
                                    // for (const frameView of editorEngine.frames.webviews.values()) {
                                    //     frameView.frameView.style.pointerEvents = 'auto';
                                    // }
                                    // editorEngine.mode = EditorMode.DESIGN;
                                }}
                                onMouseDown={() =>
                                    (editorEngine.state.editorMode = EditorMode.INSERT_IMAGE)
                                }
                                onMouseUp={() =>
                                    (editorEngine.state.editorMode = EditorMode.DESIGN)
                                }
                                data-oid="c_he_fb"
                            >
                                <div
                                    className="w-full aspect-square flex flex-col justify-center rounded-lg overflow-hidden items-center cursor-move border-[0.5px] border-border"
                                    data-oid="nae6tsm"
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        src={image.content}
                                        alt={image.fileName}
                                        data-oid="f0i-hgc"
                                    />
                                </div>
                                <span
                                    className="text-xs block w-full text-center truncate"
                                    data-oid="pxhw8_h"
                                >
                                    {imageToRename === image.fileName ? (
                                        <input
                                            type="text"
                                            className="w-full p-1 text-center bg-background-active rounded "
                                            defaultValue={image.fileName.replace(/\.[^/.]+$/, '')}
                                            autoFocus
                                            onBlur={(e) => handleRenameInputBlur(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.currentTarget.blur();
                                                }
                                                if (e.key === 'Escape') {
                                                    setImageToRename(null);
                                                }
                                            }}
                                            data-oid="5602r.y"
                                        />
                                    ) : (
                                        image.fileName
                                    )}
                                </span>
                                <div
                                    className={`absolute right-2 top-2 ${
                                        activeDropdown === image.fileName
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    } group-hover:opacity-100 transition-opacity duration-300`}
                                    data-oid="zdwqtor"
                                >
                                    <DropdownMenu
                                        onOpenChange={(isOpen) =>
                                            setActiveDropdown(isOpen ? image.fileName : null)
                                        }
                                        data-oid="e291cle"
                                    >
                                        <DropdownMenuTrigger asChild data-oid="w-2i-sw">
                                            <Button
                                                variant={'ghost'}
                                                className="bg-background p-1 inline-flex items-center justify-center h-auto w-auto rounded shadow-sm"
                                                data-oid="1qtsx28"
                                            >
                                                <Icons.DotsHorizontal
                                                    className="text-foreground dark:text-white w-4 h-4"
                                                    data-oid="die2mwf"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="rounded-md bg-background"
                                            align="start"
                                            side="right"
                                            data-oid="ggf6r:b"
                                        >
                                            <DropdownMenuItem asChild data-oid="hj2yi:4">
                                                <Button
                                                    onClick={() => handleRenameImage(image)}
                                                    variant={'ghost'}
                                                    className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group"
                                                    data-oid="a0_7w:_"
                                                >
                                                    <span
                                                        className="flex w-full text-smallPlus items-center"
                                                        data-oid="g37hd_-"
                                                    >
                                                        <Icons.Pencil
                                                            className="mr-2 h-4 w-4 text-foreground-secondary group-hover:text-foreground-active"
                                                            data-oid="syv1zu2"
                                                        />

                                                        <span data-oid="w68gzh2">Rename</span>
                                                    </span>
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild data-oid="nynruls">
                                                <Button
                                                    variant={'ghost'}
                                                    className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group"
                                                    onClick={() => handleDeleteImage(image)}
                                                    data-oid="b9dqvvm"
                                                >
                                                    <span
                                                        className="flex w-full text-smallPlus items-center"
                                                        data-oid="228.:zn"
                                                    >
                                                        <Icons.Trash
                                                            className="mr-2 h-4 w-4 text-foreground-secondary group-hover:text-foreground-active"
                                                            data-oid="om8yehx"
                                                        />

                                                        <span data-oid="qjnxwl.">Delete</span>
                                                    </span>
                                                </Button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild data-oid="x2ulm2c">
                                                <Button
                                                    variant={'ghost'}
                                                    className="hover:bg-background-secondary focus:bg-background-secondary w-full rounded-sm group"
                                                    onClick={() => {
                                                        if (!imageFolder) {
                                                            return;
                                                        }
                                                        // invokeMainChannel(
                                                        //     MainChannels.OPEN_IN_EXPLORER,
                                                        //     imageFolder,
                                                        // );
                                                    }}
                                                    data-oid="7c02vjk"
                                                >
                                                    <span
                                                        className="flex w-full text-smallPlus items-center"
                                                        data-oid="0zdyucg"
                                                    >
                                                        <Icons.DirectoryOpen
                                                            className="mr-2 h-4 w-4 text-foreground-secondary group-hover:text-foreground-active"
                                                            data-oid="o3nrm5n"
                                                        />

                                                        <span data-oid="zk8wocx">Open Folder</span>
                                                    </span>
                                                </Button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <DeleteImageModal
                onDelete={onDeleteImage}
                isOpen={!!imageToDelete}
                toggleOpen={() => setImageToDelete(null)}
                data-oid="zc7x0cb"
            />

            <RenameImageModal
                onRename={onRenameImage}
                isOpen={!!imageToRename && !!newImageName && newImageName !== imageToRename}
                toggleOpen={() => {
                    setImageToRename(null);
                    setNewImageName('');
                }}
                newName={newImageName}
                data-oid="59gl1nq"
            />
        </div>
    );
});
