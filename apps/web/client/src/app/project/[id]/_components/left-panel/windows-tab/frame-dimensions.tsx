import { useEditorEngine } from '@/components/store/editor';
import { DefaultSettings, DEVICE_OPTIONS, Orientation } from '@onlook/constants';
import type { WindowMetadata } from '@onlook/models';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import { Input } from '@onlook/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@onlook/ui/select';
import { computeWindowMetadata } from '@onlook/utility';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

export const FrameDimensions = observer(({ frameId }: { frameId: string }) => {
    const editorEngine = useEditorEngine();
    const frameData = editorEngine.frames.get(frameId);

    if (!frameData) {
        return (
            <p className="text-sm text-foreground-primary" data-oid="k--os20">
                Frame not found
            </p>
        );
    }

    console.log(
        'FrameDimensions',
        frameData.frame.dimension.width.toString(),
        frameData.frame.dimension.height.toString(),
    );

    const [metadata, setMetadata] = useState<WindowMetadata>(() =>
        computeWindowMetadata(
            frameData.frame.dimension.width.toString(),
            frameData.frame.dimension.height.toString(),
        ),
    );

    const [device, setDevice] = useState(() => {
        for (const category in DEVICE_OPTIONS) {
            for (const deviceName in DEVICE_OPTIONS[category]) {
                const res = DEVICE_OPTIONS[category][deviceName];
                if (res === `${metadata.width}x${metadata.height}`) {
                    return `${category}:${deviceName}`;
                }
            }
        }
        return 'Custom:Custom';
    });

    const updateFrame = (width: number, height: number) => {
        const newMetadata = computeWindowMetadata(width.toString(), height.toString());
        setMetadata(newMetadata);
        const newFrame = { ...frameData.frame, dimension: { width, height } };
        editorEngine.frames.updateLocally(frameId, newFrame);
    };

    const handleDimensionInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        dimension: 'width' | 'height',
    ) => {
        const value = parseInt(event.target.value);
        if (isNaN(value)) return;

        if (dimension === 'width') {
            updateFrame(value, metadata.height);
        } else {
            updateFrame(metadata.width, value);
        }
    };

    const handleOrientationChange = () => {
        if (
            metadata.width >= parseInt(DefaultSettings.MIN_DIMENSIONS.width) &&
            metadata.height >= parseInt(DefaultSettings.MIN_DIMENSIONS.height)
        ) {
            updateFrame(metadata.height, metadata.width);
        }
    };

    const handleDeviceChange = (value: string) => {
        setDevice(value);
        const [category, deviceName] = value.split(':');
        if (
            category &&
            deviceName &&
            DEVICE_OPTIONS[category] &&
            DEVICE_OPTIONS[category][deviceName] &&
            deviceName !== 'Custom'
        ) {
            const [w, h] = DEVICE_OPTIONS[category][deviceName].split('x').map(Number);
            if (typeof w === 'number' && !isNaN(w) && typeof h === 'number' && !isNaN(h)) {
                updateFrame(w, h);
            }
        }
    };

    return (
        <div className="flex flex-col gap-2" data-oid="-u252xg">
            <p className="text-sm text-foreground-primary" data-oid="2f:la:4">
                Frame Dimensions
            </p>
            <div className="flex flex-row justify-between items-center" data-oid="qyy:zz.">
                <span className="text-xs text-foreground-secondary" data-oid="vz3hgaq">
                    Device
                </span>
                <Select value={device} onValueChange={handleDeviceChange} data-oid="byyia.w">
                    <SelectTrigger
                        className="w-3/5 bg-background-secondary border-background-secondary py-1.5 px-2 h-fit text-xs rounded focus:outline-none focus:ring-0"
                        data-oid=".0j_jzs"
                    >
                        <SelectValue placeholder="Select device" data-oid="tp2w4zd" />
                    </SelectTrigger>
                    <SelectContent
                        className="rounded-md bg-background-secondary"
                        data-oid="s6kz671"
                    >
                        {Object.entries(DEVICE_OPTIONS).map(([category, devices], index) =>
                            category !== 'Custom' ? (
                                <React.Fragment key={index}>
                                    <SelectGroup key={index} data-oid="2c1h57l">
                                        <SelectLabel data-oid="7riwf2n">{category}</SelectLabel>
                                        {Object.entries(devices).map(([deviceName], idx) => (
                                            <SelectItem
                                                key={idx}
                                                value={category + ':' + deviceName}
                                                className="focus:bg-background-tertiary rounded-md text-xs cursor-pointer"
                                                data-oid="op1vd7e"
                                            >
                                                {deviceName}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    {index < Object.entries(DEVICE_OPTIONS).length - 1 && (
                                        <SelectSeparator
                                            className="text-white"
                                            data-oid="ea-4z1z"
                                        />
                                    )}
                                </React.Fragment>
                            ) : (
                                <SelectItem
                                    key={'Custom'}
                                    value={'Custom:Custom'}
                                    className="focus:bg-background-tertiary rounded-md text-xs cursor-pointer"
                                    data-oid="zt:7lda"
                                >
                                    {'Custom'}
                                </SelectItem>
                            ),
                        )}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-row justify-between items-center" data-oid="xrw17rr">
                <span className="text-xs text-foreground-secondary" data-oid="xmnklju">
                    Orientation
                </span>
                <div
                    className="flex flex-row p-0.5 w-3/5 bg-background-secondary rounded"
                    data-oid="c_hjvb7"
                >
                    <Button
                        size={'icon'}
                        className={`flex-1 h-full px-0.5 py-1.5 bg-background-secondary rounded-sm ${metadata.orientation === Orientation.Portrait ? 'bg-background-tertiary hover:bg-background-tertiary' : 'hover:bg-background-tertiary/50'}`}
                        variant={'ghost'}
                        onClick={handleOrientationChange}
                        data-oid="hvdbyqv"
                    >
                        <Icons.Portrait
                            className={`h-4 w-4 ${metadata.orientation !== Orientation.Portrait ? 'text-foreground-secondary hover:text-foreground-onlook' : ''}`}
                            data-oid="nw9j9pr"
                        />
                    </Button>
                    <Button
                        size={'icon'}
                        className={`flex-1 h-full px-0.5 py-1.5 bg-background-secondary rounded-sm ${metadata.orientation === Orientation.Landscape ? 'bg-background-tertiary hover:bg-background-tertiary' : 'hover:bg-background-tertiary/50'}`}
                        variant={'ghost'}
                        onClick={handleOrientationChange}
                        data-oid="h8xnu86"
                    >
                        <Icons.Landscape
                            className={`h-4 w-4 ${metadata.orientation !== Orientation.Landscape ? 'text-foreground-secondary hover:text-foreground-onlook' : ''}`}
                            data-oid="2o7dv2t"
                        />
                    </Button>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center relative" data-oid="b78iqd.">
                <span className="text-xs text-foreground-secondary" data-oid="9t.0j.v">
                    Width
                </span>
                <div className="relative w-3/5" data-oid="w9vchcl">
                    <Input
                        className="w-full px-2 h-8 text-xs rounded border-none text-foreground-active bg-background-secondary text-start focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={metadata.width}
                        min={parseInt(DefaultSettings.MIN_DIMENSIONS.width)}
                        type="number"
                        onChange={(event) => handleDimensionInput(event, 'width')}
                        data-oid="wsxh-s0"
                    />

                    <p
                        className="p-0 h-fit w-fit absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground-secondary text-xs"
                        data-oid="kv2-0fq"
                    >
                        px
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center relative" data-oid="yuob:s_">
                <span className="text-xs text-foreground-secondary" data-oid="4rl837b">
                    Height
                </span>
                <div className="relative w-3/5" data-oid="t_kv2hp">
                    <Input
                        className="w-full px-2 h-8 text-xs rounded border-none text-foreground-active bg-background-secondary text-start focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={metadata.height}
                        min={parseInt(DefaultSettings.MIN_DIMENSIONS.height)}
                        type="number"
                        onChange={(event) => handleDimensionInput(event, 'height')}
                        data-oid=":y6zbrg"
                    />

                    <p
                        className="p-0 h-fit w-fit absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground-secondary text-xs"
                        data-oid="vy735bl"
                    >
                        px
                    </p>
                </div>
            </div>
        </div>
    );
});
