import type { FrameImpl, WebFrameImpl } from '@/components/store/editor/frames/frame';
import { FrameType } from '@onlook/models';
import { useRef } from 'react';
import { GestureScreen } from './gesture';
import { ResizeHandles } from './resize-handles';
import { TopBar } from './top-bar';
import { WebFrameComponent, type WebFrameView } from './web-frame';

export const FrameView = ({ frame }: { frame: FrameImpl }) => {
    const webFrameRef = useRef<WebFrameView>(null);
    return (
        <div
            className="flex flex-col fixed"
            style={{ transform: `translate(${frame.position.x}px, ${frame.position.y}px)` }}
            data-oid="-mlh4cc"
        >
            <TopBar frame={frame as WebFrameImpl} data-oid="jzc0qd3" />
            <div className="relative" data-oid="oynko3l">
                <ResizeHandles frame={frame} data-oid="ksqc:ab" />
                {frame.type === FrameType.WEB && (
                    <WebFrameComponent
                        frame={frame as WebFrameImpl}
                        ref={webFrameRef}
                        data-oid="eapf10q"
                    />
                )}
                <GestureScreen frame={frame as WebFrameImpl} data-oid="o:s5r6h" />
            </div>
        </div>
    );
};
