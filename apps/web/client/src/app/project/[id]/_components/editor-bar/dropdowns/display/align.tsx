import { useEditorEngine } from '@/components/store/editor';
import { Icons } from '@onlook/ui/icons';
import { useEffect, useState } from 'react';
import type { CssValue } from '.';
import { InputRadio } from '../../inputs/input-radio';

const verticalAlignOptions: Record<string, CssValue> = {
    'flex-start': {
        value: 'flex-start',
        label: 'Top',
        icon: <Icons.AlignTop className="h-4 w-4" data-oid="zydf38g" />,
    },
    center: {
        value: 'center',
        label: 'Center',
        icon: <Icons.AlignCenterVertically className="h-4 w-4" data-oid="bmlk2hw" />,
    },
    'flex-end': {
        value: 'flex-end',
        label: 'Bottom',
        icon: <Icons.AlignBottom className="h-4 w-4" data-oid="9h8ul_l" />,
    },
    stretch: {
        value: 'stretch',
        label: 'Stretch',
        icon: <Icons.SpaceBetweenVertically className="h-4 w-4" data-oid="uear761" />,
    },
};

const horizontalAlignOptions: Record<string, CssValue> = {
    'flex-start': {
        value: 'flex-start',
        label: 'Left',
        icon: <Icons.AlignLeft className="h-4 w-4" data-oid="xbq1taj" />,
    },
    center: {
        value: 'center',
        label: 'Center',
        icon: <Icons.AlignCenterHorizontally className="h-4 w-4" data-oid="dmpbskj" />,
    },
    'flex-end': {
        value: 'flex-end',
        label: 'Right',
        icon: <Icons.AlignRight className="h-4 w-4" data-oid="06dr2v3" />,
    },
    'space-between': {
        value: 'space-between',
        label: 'Space Between',
        icon: <Icons.SpaceBetweenHorizontally className="h-4 w-4" data-oid="::h_zsk" />,
    },
};

export const VerticalAlignInput = () => {
    const editorEngine = useEditorEngine();
    const [value, setValue] = useState<string>(
        editorEngine.style.selectedStyle?.styles.computed.alignItems ?? 'flex-start',
    );

    useEffect(() => {
        setValue(editorEngine.style.selectedStyle?.styles.computed.alignItems ?? 'flex-start');
    }, [editorEngine.style.selectedStyle?.styles.computed.alignItems]);

    return (
        <div className="flex items-center gap-3" data-oid="hrqphnq">
            <span className="text-sm text-muted-foreground w-24" data-oid="_b:gny_">
                Vertical
            </span>
            <InputRadio
                options={Object.values(verticalAlignOptions)}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    editorEngine.style.update('align-items', newValue);
                }}
                className="flex-1"
                data-oid="qae6f.l"
            />
        </div>
    );
};

export const HorizontalAlignInput = () => {
    const editorEngine = useEditorEngine();
    const [value, setValue] = useState<string>(
        editorEngine.style.selectedStyle?.styles.computed.justifyContent ?? 'flex-start',
    );

    useEffect(() => {
        setValue(editorEngine.style.selectedStyle?.styles.computed.justifyContent ?? 'flex-start');
    }, [editorEngine.style.selectedStyle?.styles.computed.justifyContent]);

    return (
        <div className="flex items-center gap-3" data-oid="ffz-qkq">
            <span className="text-sm text-muted-foreground w-24" data-oid="v:z_kk:">
                Horizontal
            </span>
            <InputRadio
                options={Object.values(horizontalAlignOptions)}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    editorEngine.style.update('justify-content', newValue);
                }}
                className="flex-1"
                data-oid="c15uvw0"
            />
        </div>
    );
};
