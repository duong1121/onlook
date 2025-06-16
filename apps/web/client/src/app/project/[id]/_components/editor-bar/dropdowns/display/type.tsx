import { useEditorEngine } from '@/components/store/editor';
import { memo, useEffect, useState } from 'react';
import { InputRadio } from '../../inputs/input-radio';
import { layoutTypeOptions } from './index';

export const TypeInput = memo(() => {
    const editorEngine = useEditorEngine();
    const [value, setValue] = useState<string>(
        editorEngine.style.selectedStyle?.styles.computed.display ?? 'block',
    );

    useEffect(() => {
        setValue(editorEngine.style.selectedStyle?.styles.computed.display ?? 'block');
    }, [editorEngine.style.selectedStyle?.styles.computed.display]);

    return (
        <div className="flex items-center gap-3" data-oid="r6d_-gt">
            <span className="text-sm text-muted-foreground w-24" data-oid="7j61grg">
                {' '}
                Type{' '}
            </span>
            <InputRadio
                options={Object.values(layoutTypeOptions)}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    editorEngine.style.update('display', newValue);
                }}
                className="flex-1"
                data-oid="sut2l.3"
            />
        </div>
    );
});
