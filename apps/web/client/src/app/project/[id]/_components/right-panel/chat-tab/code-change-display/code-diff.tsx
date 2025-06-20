import { SystemTheme } from '@onlook/models';
import { useTheme } from 'next-themes';
import CodeMirrorMerge from 'react-codemirror-merge';
import { getExtensions } from '../../dev-tab/code-mirror-config';
interface CodeDiffProps {
    originalCode: string;
    modifiedCode: string;
    language?: string;
    showLineNumbers?: boolean;
    variant?: 'minimal' | 'normal';
}

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export const CodeDiff = ({ originalCode, modifiedCode }: CodeDiffProps) => {
    const { theme } = useTheme();

    const extensions = getExtensions('javascript');

    return (
        <CodeMirrorMerge
            orientation="a-b"
            theme={theme === SystemTheme.DARK ? SystemTheme.DARK : SystemTheme.LIGHT}
            data-oid="aofcz.g"
        >
            <Original value={originalCode} extensions={extensions} readOnly data-oid="v5b61-z" />
            <Modified value={modifiedCode} extensions={extensions} readOnly data-oid="-0fmcxt" />
        </CodeMirrorMerge>
    );
};
