import { useEditorEngine } from '@/components/store/editor';
import { stringToParsedValue } from '@onlook/utility';
import { useEffect, useState } from 'react';
import { InputIcon } from '../../inputs/input-icon';

export const GapInput = () => {
    const editorEngine = useEditorEngine();
    const { num, unit } = stringToParsedValue(
        editorEngine.style.selectedStyle?.styles.computed.gap?.toString() ?? '12px',
    );
    const [numValue, setNumValue] = useState(num);
    const [unitValue, setUnitValue] = useState(unit);

    useEffect(() => {
        const { num, unit } = stringToParsedValue(
            editorEngine.style.selectedStyle?.styles.computed.gap?.toString() ?? '12px',
        );
        setNumValue(num);
        setUnitValue(unit);
    }, [editorEngine.style.selectedStyle?.styles.computed.gap]);

    return (
        <div className="flex items-center gap-3" data-oid="7ubn-kr">
            <span className="text-sm text-muted-foreground w-24" data-oid="q0-drcd">
                Gap
            </span>
            <InputIcon
                value={numValue}
                unit={unitValue}
                onChange={(newValue) => {
                    setNumValue(newValue);
                    editorEngine.style.update('gap', `${newValue}${unitValue}`);
                }}
                onUnitChange={(newUnit) => {
                    setUnitValue(newUnit);
                    editorEngine.style.update('gap', `${numValue}${newUnit}`);
                }}
                data-oid=":.o8qiu"
            />
        </div>
    );
};
