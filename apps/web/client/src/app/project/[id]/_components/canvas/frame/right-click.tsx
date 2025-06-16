import { Hotkey } from '@/components/hotkey';
import { IDE } from '@/components/ide';
import { useEditorEngine } from '@/components/store/editor';
import { DEFAULT_IDE, EditorTabValue, type DomElement } from '@onlook/models';
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
            icon: <Icons.MagicWand className="mr-2 h-4 w-4" data-oid="m7ojnr5" />,
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
            icon: <Icons.MagicWand className="mr-2 h-4 w-4" data-oid="5y9l7nr" />,
            hotkey: Hotkey.NEW_AI_CHAT,
        },
    ];

    const GROUP_ITEMS: MenuItem[] = [
        {
            label: 'Group',
            icon: <Icons.Box className="mr-2 h-4 w-4" data-oid="wpvun0t" />,
            action: () => editorEngine.group.groupSelectedElements(),
            disabled: !editorEngine.group.canGroupElements(),
            hotkey: Hotkey.GROUP,
        },
        {
            label: 'Ungroup',
            action: () => editorEngine.group.ungroupSelectedElement(),
            disabled: !editorEngine.group.canUngroupElement(),
            icon: <Icons.Group className="mr-2 h-4 w-4" data-oid="ouw-gna" />,
            hotkey: Hotkey.UNGROUP,
        },
    ];

    const EDITING_ITEMS: MenuItem[] = [
        {
            label: 'Edit text',
            action: () => editorEngine.text.editSelectedElement(),
            icon: <Icons.Pencil className="mr-2 h-4 w-4" data-oid="y1m7vsp" />,
            hotkey: Hotkey.ENTER,
        },
        {
            label: 'Copy',
            action: () => editorEngine.copy.copy(),
            icon: <Icons.Clipboard className="mr-2 h-4 w-4" data-oid="fbq-76y" />,
            hotkey: Hotkey.COPY,
        },
        {
            label: 'Paste',
            action: () => editorEngine.copy.paste(),
            icon: <Icons.ClipboardCopy className="mr-2 h-4 w-4" data-oid="dgh38g-" />,
            hotkey: Hotkey.PASTE,
        },
        {
            label: 'Cut',
            action: () => editorEngine.copy.cut(),
            icon: <Icons.Scissors className="mr-2 h-4 w-4" data-oid="p-k:z-e" />,
            hotkey: Hotkey.CUT,
        },
        {
            label: 'Duplicate',
            action: () => editorEngine.copy.duplicate(),
            icon: <Icons.Copy className="mr-2 h-4 w-4" data-oid="f-1uu.u" />,
            hotkey: Hotkey.DUPLICATE,
        },
        {
            label: 'Delete',
            action: () => editorEngine.elements.delete(),
            icon: <Icons.Trash className="mr-2 h-4 w-4" data-oid="gvljmzy" />,
            hotkey: Hotkey.DELETE,
            destructive: true,
        },
    ];

    const WINDOW_ITEMS: MenuItem[] = [
        {
            label: 'Duplicate',
            action: () => editorEngine.frames.duplicateSelected(),
            icon: <Icons.Copy className="mr-2 h-4 w-4" data-oid="._ir3vv" />,
            hotkey: Hotkey.DUPLICATE,
            disabled: !editorEngine.frames.canDuplicate(),
        },
        {
            label: 'Delete',
            action: () => editorEngine.frames.deleteSelected(),
            icon: <Icons.Trash className="mr-2 h-4 w-4" data-oid="al18.qz" />,
            hotkey: Hotkey.DELETE,
            destructive: true,
            disabled: !editorEngine.frames.canDelete(),
        },
    ];

    const updateMenuItems = () => {
        let instance: string | null = null;
        let root: string | null = null;

        if (editorEngine.elements.selected.length > 0 && editorEngine.elements.selected[0]) {
            const element: DomElement = editorEngine.elements.selected[0];
            instance = element.instanceId;
            root = element.oid;
        }
        let menuItems: MenuItem[][] = [];

        if (!editorEngine.elements.selected.length) {
            menuItems = [WINDOW_ITEMS];
        } else {
            const updatedToolItems = [
                instance !== null && {
                    label: 'View instance code',
                    action: () => viewSource(instance),
                    icon: <Icons.ComponentInstance className="mr-2 h-4 w-4" data-oid="miga9.w" />,
                },
                {
                    label: `View ${instance ? 'component' : 'element'} in ${ide.displayName}`,
                    disabled: !root,
                    action: () => viewSource(root),
                    icon: instance ? (
                        <Icons.Component className="mr-2 h-4 w-4" data-oid="nxnbf:p" />
                    ) : (
                        <Icons.ExternalLink className="mr-2 h-4 w-4" data-oid="m_hh-o7" />
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
        <ContextMenu data-oid="xki:s82">
            <ContextMenuTrigger data-oid="yuw6o8w">{children}</ContextMenuTrigger>
            <ContextMenuContent
                className="w-64 bg-background/95 backdrop-blur-lg"
                data-oid="_gg6n:1"
            >
                {menuItems.map((group, groupIndex) => (
                    <div key={groupIndex} data-oid="6f1_yye">
                        {group.map((item) => (
                            <ContextMenuItem
                                key={item.label}
                                onClick={item.action}
                                disabled={item.disabled}
                                className="cursor-pointer"
                                data-oid="f:jhgr6"
                            >
                                <span
                                    className={cn(
                                        'flex w-full items-center gap-1',
                                        item.destructive && 'text-red',
                                    )}
                                    data-oid="rixf-8_"
                                >
                                    <span data-oid="tb-v_.:">{item.icon}</span>
                                    <span data-oid="pdkik.m">{item.label}</span>
                                    <span className="ml-auto" data-oid="yepzbqn">
                                        {item.hotkey && (
                                            <Kbd data-oid="2gj-515">
                                                {item.hotkey.readableCommand}
                                            </Kbd>
                                        )}
                                    </span>
                                </span>
                            </ContextMenuItem>
                        ))}
                        {groupIndex < menuItems.length - 1 && (
                            <ContextMenuSeparator data-oid="0_-kzli" />
                        )}
                    </div>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    );
});
