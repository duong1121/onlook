import { useEditorEngine } from '@/components/store/editor';
import type { FileNode } from '@onlook/models';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@onlook/ui/context-menu';
import { Icons } from '@onlook/ui/icons';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';
import { motion } from 'motion/react';
import { useState } from 'react';
import type { NodeApi } from 'react-arborist';
import { FileModal } from './file-modal';
import { FolderModal } from './folder-modal';

interface FileTreeNodeProps {
    node: NodeApi<FileNode>;
    style: React.CSSProperties;
    files?: string[];
}

export const FileTreeNode: React.FC<FileTreeNodeProps> = observer(({ node, style, files = [] }) => {
    const editorEngine = useEditorEngine();
    const isDirectory = node.data.isDirectory;
    const [fileModalOpen, setFileModalOpen] = useState(false);
    const [folderModalOpen, setFolderModalOpen] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        if (isDirectory) {
            node.toggle();
            return;
        }

        // Load the file into the editor
        try {
            const content = await editorEngine.sandbox.readFile(node.data.path);
            if (content === null) {
                throw new Error(`File content for ${node.data.path} not found`);
            }
            // This will be handled in the parent component
            node.select();
        } catch (error) {
            console.error('Failed to load file:', error);
        }
    };

    // Get file icon based on extension
    const getFileIcon = () => {
        const extension = node.data.extension?.toLowerCase();

        if (isDirectory) {
            return <Icons.Directory className="w-4 h-4 mr-2" data-oid="y35h6_:" />;
        }

        switch (extension) {
            case '.js':
            case '.jsx':
            case '.ts':
            case '.tsx':
                return <Icons.Code className="w-4 h-4 mr-2" data-oid="h5tdq6:" />;
            case '.css':
            case '.scss':
            case '.sass':
                return <Icons.Box className="w-4 h-4 mr-2" data-oid="jv_-fdv" />;
            case '.html':
                return <Icons.Frame className="w-4 h-4 mr-2" data-oid="fcfiusp" />;
            case '.json':
                return <Icons.Code className="w-4 h-4 mr-2" data-oid="ltc-2hj" />;
            case '.md':
            case '.mdx':
                return <Icons.Text className="w-4 h-4 mr-2" data-oid=":xlists" />;
            case '.jpg':
            case '.jpeg':
            case '.png':
            case '.gif':
            case '.svg':
                return <Icons.Image className="w-4 h-4 mr-2" data-oid="yl1c:v5" />;
            default:
                return <Icons.File className="w-4 h-4 mr-2" data-oid="tnyh0e-" />;
        }
    };

    const basePath = node.data.path;

    const menuItems = [
        ...(isDirectory
            ? [
                  {
                      label: 'New File',
                      action: () => setFileModalOpen(true),
                      icon: <Icons.File className="mr-2 h-4 w-4" data-oid="0ck1m8g" />,
                      separator: false,
                  },
                  {
                      label: 'New Folder',
                      action: () => setFolderModalOpen(true),
                      icon: <Icons.Directory className="mr-2 h-4 w-4" data-oid="e4b_.np" />,
                      separator: true,
                  },
              ]
            : []),
        {
            label: 'Open File',
            action: handleClick,
            icon: <Icons.File className="mr-2 h-4 w-4" data-oid="uumm.6k" />,
            disabled: isDirectory,
            separator: false,
        },
        {
            label: 'Copy Path',
            action: () => {
                navigator.clipboard.writeText(node.data.path);
            },
            icon: <Icons.Copy className="mr-2 h-4 w-4" data-oid="97pg1:." />,
            separator: false,
        },
        {
            label: 'Delete',
            action: () => {
                editorEngine.sandbox.delete(node.data.path);
            },
            icon: <Icons.Trash className="mr-2 h-4 w-4" data-oid="ou07trg" />,
            separator: false,
        },
    ];

    return (
        <>
            <ContextMenu data-oid="24r2rqk">
                <ContextMenuTrigger data-oid="rm4w104">
                    <div
                        style={style}
                        className={cn(
                            'flex items-center h-6 cursor-pointer hover:bg-background-hover rounded',
                        )}
                        onClick={handleClick}
                        data-oid="w909ix6"
                    >
                        <span className="w-4 h-4 flex-none relative" data-oid="mp-pziu">
                            {isDirectory && (
                                <div
                                    className="w-4 h-4 flex items-center justify-center absolute z-50"
                                    data-oid="bva-7r8"
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: node.isOpen ? 90 : 0 }}
                                        data-oid="zfwh582"
                                    >
                                        <Icons.ChevronRight
                                            className="h-2.5 w-2.5"
                                            data-oid="bz3:xcj"
                                        />
                                    </motion.div>
                                </div>
                            )}
                        </span>
                        {getFileIcon()}
                        <span className="truncate" data-oid=".de75d9">
                            {node.data.name}
                        </span>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent data-oid="d_-oj6h">
                    {menuItems.map((item, index) => (
                        <div key={item.label} data-oid="cmha.4g">
                            <ContextMenuItem
                                onClick={item.action}
                                className="cursor-pointer"
                                disabled={item.disabled}
                                data-oid="34_qshy"
                            >
                                <span
                                    className={cn('flex w-full items-center gap-1')}
                                    data-oid="m0avr9_"
                                >
                                    {item.icon}
                                    {item.label}
                                </span>
                            </ContextMenuItem>
                            {item.separator && <ContextMenuSeparator data-oid="3vf3vsr" />}
                        </div>
                    ))}
                </ContextMenuContent>
            </ContextMenu>

            <FileModal
                open={fileModalOpen}
                onOpenChange={setFileModalOpen}
                basePath={basePath}
                files={files}
                data-oid=":e2i1yn"
            />

            <FolderModal
                open={folderModalOpen}
                onOpenChange={setFolderModalOpen}
                basePath={basePath}
                files={files}
                data-oid="9lk3k-u"
            />
        </>
    );
});
