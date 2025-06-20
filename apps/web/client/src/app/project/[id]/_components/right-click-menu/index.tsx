import { Hotkey } from '@/components/hotkey';
import { IDE } from '@/components/ide';
import { useEditorEngine } from '@/components/store/editor';
import { EditorTabValue } from '@onlook/models/editor';
import type { DomElement } from '@onlook/models/element';
import { DEFAULT_IDE } from '@onlook/models/ide';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@onlook/ui/context-menu';
import { Icons } from '@onlook/ui/icons';
import { Kbd } from '@onlook/ui/kbd';
import { cn } from '@onlook/ui/utils';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

interface RightClickMenuProps {
    children: React.ReactNode;
}

interface MenuItem {
    label: string;
    action: () => void;
    hotkey?: Hotkey;
    children?: MenuItem[];
    icon: React.ReactNode;
    disabled?: boolean;
    destructive?: boolean;
}

export const RightClickMenu = observer(({ children }: RightClickMenuProps) => {
    const editorEngine = useEditorEngine();
    const [menuItems, setMenuItems] = useState<MenuItem[][]>([]);
    const ide = IDE.fromType(DEFAULT_IDE);

    useEffect(() => {
        updateMenuItems();
    }, [
        editorEngine.elements.selected,
        editorEngine.ast.mappings.layers,
        editorEngine.frames.selected,
    ]);

    const TOOL_ITEMS: MenuItem[] = [
        {
            label: 'Add to AI Chat',
            action: () => {
                editorEngine.state.rightPanelTab = EditorTabValue.CHAT;
                editorEngine.chat.focusChatInput();
            },
            icon: <Icons.MagicWand className="mr-2 h-4 w-4" data-oid="leg.t08" />,
            hotkey: Hotkey.ADD_AI_CHAT,
            disabled: !editorEngine.elements.selected.length,
        },
        {
            label: 'New AI Chat',
            action: () => {
                editorEngine.state.rightPanelTab = EditorTabValue.CHAT;
                editorEngine.chat.conversation.startNewConversation();
                editorEngine.chat.focusChatInput();
            },
            icon: <Icons.MagicWand className="mr-2 h-4 w-4" data-oid="e2s.3w0" />,
            hotkey: Hotkey.NEW_AI_CHAT,
        },
    ];

    const GROUP_ITEMS: MenuItem[] = [
        {
            label: 'Group',
            action: () => editorEngine.group.groupSelectedElements(),
            icon: <Icons.Box className="mr-2 h-4 w-4" data-oid="qg2tfky" />,
            // disabled: !editorEngine.group.canGroupElements(),
            hotkey: Hotkey.GROUP,
        },
        {
            label: 'Ungroup',
            action: () => editorEngine.group.ungroupSelectedElement(),
            icon: <Icons.Group className="mr-2 h-4 w-4" data-oid="cd9g7ed" />,
            disabled: !editorEngine.group.canUngroupElement(),
            hotkey: Hotkey.UNGROUP,
        },
    ];

    const EDITING_ITEMS: MenuItem[] = [
        {
            label: 'Edit text',
            action: () => editorEngine.text.editSelectedElement(),
            icon: <Icons.Pencil className="mr-2 h-4 w-4" data-oid="k7tt0ef" />,
            hotkey: Hotkey.ENTER,
        },
        {
            label: 'Copy',
            action: () => editorEngine.copy.copy(),
            icon: <Icons.Clipboard className="mr-2 h-4 w-4" data-oid="q9-n.sy" />,
            hotkey: Hotkey.COPY,
        },
        {
            label: 'Paste',
            action: () => editorEngine.copy.paste(),
            icon: <Icons.ClipboardCopy className="mr-2 h-4 w-4" data-oid="h688ju_" />,
            hotkey: Hotkey.PASTE,
        },
        {
            label: 'Cut',
            action: () => editorEngine.copy.cut(),
            icon: <Icons.Scissors className="mr-2 h-4 w-4" data-oid="oweewhh" />,
            hotkey: Hotkey.CUT,
        },
        {
            label: 'Duplicate',
            action: () => editorEngine.copy.duplicate(),
            icon: <Icons.Copy className="mr-2 h-4 w-4" data-oid="k48uwp_" />,
            hotkey: Hotkey.DUPLICATE,
        },
        {
            label: 'Delete',
            action: () => editorEngine.elements.delete(),
            icon: <Icons.Trash className="mr-2 h-4 w-4" data-oid="zh5_b_6" />,
            hotkey: Hotkey.DELETE,
            destructive: true,
        },
    ];

    const WINDOW_ITEMS: MenuItem[] = [
        {
            label: 'Duplicate',
            action: () => editorEngine.frames.duplicateSelected(),
            icon: <Icons.Copy className="mr-2 h-4 w-4" data-oid="7gxw00u" />,
            hotkey: Hotkey.DUPLICATE,
        },
        {
            label: 'Delete',
            action: () => editorEngine.frames.deleteSelected(),
            icon: <Icons.Trash className="mr-2 h-4 w-4" data-oid="c10wxgs" />,
            hotkey: Hotkey.DELETE,
            destructive: true,
            disabled: !editorEngine.frames.canDelete(),
        },
    ];

    const updateMenuItems = () => {
        let instance: string | null = null;
        let root: string | null = null;

        if (editorEngine.elements.selected.length > 0) {
            const element: DomElement | undefined = editorEngine.elements.selected[0];
            if (element) {
                instance = element.instanceId;
                root = element.oid;
            }
        }
        let menuItems: MenuItem[][] = [];

        if (editorEngine.frames.selected.length > 0) {
            menuItems = [WINDOW_ITEMS];
        } else {
            const updatedToolItems = [
                instance !== null && {
                    label: 'View instance code',
                    action: () => viewSource(instance),
                    icon: <Icons.ComponentInstance className="mr-2 h-4 w-4" data-oid="l2bgc__" />,
                },
                {
                    label: `View ${instance ? 'component' : 'element'} in ${ide.displayName}`,
                    disabled: !root,
                    action: () => viewSource(root),
                    icon: instance ? (
                        <Icons.Component className="mr-2 h-4 w-4" data-oid="6reojzf" />
                    ) : (
                        <Icons.ExternalLink className="mr-2 h-4 w-4" data-oid="8f57m_n" />
                    ),
                },
                ...TOOL_ITEMS,
            ].filter(Boolean) as MenuItem[];

            menuItems = [updatedToolItems, GROUP_ITEMS, EDITING_ITEMS];
        }

        setMenuItems(menuItems);
    };

    function viewSource(oid: string | null) {
        if (!oid) {
            console.error('No oid found');
            return;
        }
        editorEngine.code.viewCodeBlock(oid);
    }

    return (
        <ContextMenu data-oid="9xdnmc9">
            <ContextMenuTrigger data-oid="d6zd2qt">{children}</ContextMenuTrigger>
            <ContextMenuContent
                className="w-64 bg-background/95 backdrop-blur-lg"
                data-oid="me5w7ph"
            >
                {menuItems.map((group, groupIndex) => (
                    <div key={groupIndex} data-oid="f603tc2">
                        {group.map((item) => (
                            <ContextMenuItem
                                key={item.label}
                                onClick={item.action}
                                disabled={item.disabled}
                                className="cursor-pointer"
                                data-oid="r8y:7dy"
                            >
                                <span
                                    className={cn(
                                        'flex w-full items-center gap-1',
                                        item.destructive && 'text-red',
                                    )}
                                    data-oid="dp_mra:"
                                >
                                    <span data-oid="0teb3vj">{item.icon}</span>
                                    <span data-oid="bjfyx:v">{item.label}</span>
                                    <span className="ml-auto" data-oid="3utgf.6">
                                        {item.hotkey && (
                                            <Kbd data-oid="p9-r0uw">
                                                {item.hotkey.readableCommand}
                                            </Kbd>
                                        )}
                                    </span>
                                </span>
                            </ContextMenuItem>
                        ))}
                        {groupIndex < menuItems.length - 1 && (
                            <ContextMenuSeparator data-oid="_kx__44" />
                        )}
                    </div>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    );
});
