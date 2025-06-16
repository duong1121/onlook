import { useEditorEngine } from '@/components/store/editor';
import { Button } from '@onlook/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@onlook/ui/dialog';
import { Icons } from '@onlook/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { useState } from 'react';
import { CodeBlock } from './code-block';
import { CodeDiff } from './code-diff';

enum TabValue {
    BLOCK = 'diff',
    DIFF = 'block',
}

export const CodeModal = ({
    fileName,
    value,
    original,
    children,
}: {
    fileName: string;
    value: string;
    original: string;
    children?: React.ReactNode;
}) => {
    const editorEngine = useEditorEngine();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(TabValue.DIFF);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} data-oid="-406lau">
            <DialogTrigger asChild data-oid="1o3vwne">
                {children}
            </DialogTrigger>
            <DialogContent className="h-[80vh] min-w-[90vw]" data-oid="dr.3_ag">
                <DialogTitle className="sr-only" data-oid="p8uis03">
                    {fileName}
                </DialogTitle>
                <Tabs
                    value={selectedTab}
                    onValueChange={(val) => setSelectedTab(val as TabValue)}
                    data-oid="rz2reop"
                >
                    <TabsList
                        className="w-full justify-start gap-2 bg-transparent"
                        data-oid="15yqdzp"
                    >
                        <TabsTrigger
                            value={TabValue.DIFF}
                            className="hover:text-foreground-hover bg-transparent px-1 py-2"
                            data-oid="umgqwuw"
                        >
                            Diffs
                        </TabsTrigger>
                        <TabsTrigger
                            value={TabValue.BLOCK}
                            className="hover:text-foreground-hover bg-transparent px-1 py-2"
                            data-oid="xwj3kkc"
                        >
                            Full Code
                        </TabsTrigger>
                        <Button
                            className="ml-auto gap-2"
                            variant={'ghost'}
                            onClick={() => editorEngine.code.viewSourceFile(fileName)}
                            data-oid="e7t4h35"
                        >
                            {'View source'} <Icons.ExternalLink data-oid="80-_11g" />
                        </Button>
                    </TabsList>
                    <TabsContent value={TabValue.DIFF} data-oid="z:0pvbe">
                        <div
                            className="flex h-[70vh] flex-col space-y-6 overflow-auto rounded border"
                            data-oid="pjzsp1l"
                        >
                            <CodeDiff
                                originalCode={original}
                                modifiedCode={value}
                                data-oid="ff:5_cl"
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value={TabValue.BLOCK} data-oid="sx_z_0x">
                        <div
                            className="flex h-[70vh] flex-col space-y-6 overflow-auto rounded border"
                            data-oid="r7.u-i8"
                        >
                            <CodeBlock className="h-full" code={value} data-oid="lk15sgp" />
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
