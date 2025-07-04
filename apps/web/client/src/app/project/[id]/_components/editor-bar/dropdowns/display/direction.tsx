import { useEditorEngine } from '@/components/store/editor';
import { Icons } from '@onlook/ui/icons';
import { useEffect, useState } from 'react';
import type { CssValue } from '.';
import { InputRadio } from '../../inputs/input-radio';

const directionOptions: Record<string, CssValue> = {
    column: {
        value: 'column',
        label: 'Vertical',
        icon: <Icons.ArrowDown className="h-4 w-4" data-oid="b6fp.5m" />,
    },
    row: {
        value: 'row',
        label: 'Horizontal',
        icon: <Icons.ArrowRight className="h-4 w-4" data-oid=":od:f.v" />,
    },
};

export const DirectionInput = () => {
    const editorEngine = useEditorEngine();
    const [value, setValue] = useState<string>(
        editorEngine.style.selectedStyle?.styles.computed.flexDirection ?? 'column',
    );

    useEffect(() => {
        setValue(editorEngine.style.selectedStyle?.styles.computed.flexDirection ?? 'column');
    }, [editorEngine.style.selectedStyle?.styles.computed.flexDirection]);

    return (
        <div className="flex items-center gap-3" data-oid="f5b5yxq">
            <span className="text-sm text-muted-foreground w-24" data-oid="5zefdnp">
                Direction
            </span>
            <InputRadio
                options={Object.values(directionOptions)}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    editorEngine.style.updateMultiple({
                        'flex-direction': newValue,
                        display: 'flex',
                    });
                }}
                className="flex-1"
                data-oid=".d2zlke"
            />
        </div>
    );
};
