import { useEditorEngine } from '@/components/store/editor';
import { VARIANTS } from '@onlook/fonts';
import { observer } from 'mobx-react-lite';
import { FontFamily } from './font-family';

const SystemFont = observer(() => {
    const editorEngine = useEditorEngine();
    const fontManager = editorEngine.font;

    return (
        <div className="flex flex-col divide-y divide-border" data-oid="hi1ese3">
            {!fontManager.fonts.length ? (
                <div
                    className="flex justify-center items-center border-dashed border-default border-2 rounded-lg h-20 my-2"
                    data-oid="ui1cd7d"
                >
                    <span className="text-sm text-muted-foreground" data-oid="bj4lkds">
                        No fonts added
                    </span>
                </div>
            ) : (
                fontManager.fonts.map((font, index) => (
                    <div key={`system-${font.family}-${index}`} data-oid="nht8taw">
                        <div className="flex justify-between items-center" data-oid="j7qiwlv">
                            <FontFamily
                                name={font.family}
                                variants={
                                    font.weight?.map(
                                        (weight) => VARIANTS.find((v) => v.value === weight)?.name,
                                    ) as string[]
                                }
                                showDropdown={true}
                                showAddButton={false}
                                isDefault={font.id === fontManager.defaultFont}
                                onRemoveFont={() => fontManager.removeFont(font)}
                                onSetFont={() => fontManager.setDefaultFont(font)}
                                data-oid="12yokso"
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
});

export default SystemFont;
