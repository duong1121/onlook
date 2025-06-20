import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ColorSlider } from './ColorSlider';
import { SVPicker } from './SVPicker';
import tw from 'tailwind-styled-components';
import { twMerge } from 'tailwind-merge';
import { Color } from '@onlook/utility';
import { mod } from '@onlook/utility';
import { DraftableInput } from '../draftable-input';
import styled from '@emotion/styled';
import { InputGroup } from '../input-group';
import EyeDropperButton from './EyeDropperButton';

const Input = tw(DraftableInput)`
  outline-0 w-full h-6 bg-background-onlook/70 rounded focus:ring-1 ring-inset ring-foreground-active text-foreground-primary placeholder:text-foreground-disabled text-center
`;

type SliderMode = 'hsl' | 'hsv' | 'rgb' | 'hex';

const InputsRow = ({
    color,
    onChangeEnd,
    onChange,
}: {
    color: Color;
    onChangeEnd?: (color: Color) => void;
    onChange?: (color: Color) => void;
}) => {
    const [mode, setMode] = useState<SliderMode>('hex');

    const rgbColor = color.rgb;
    const hslColor = color.hsl;

    return (
        <div
            className="z-50 grid grid-cols-[48px_1fr_1fr_1fr_46px] gap-1 text-mini"
            data-oid="lsavex."
        >
            <div className="flex items-center justify-center gap-1 min-w-0 " data-oid="s1cw.2c">
                <label
                    className="text-small text-foreground-primary cursor-pointer hover:text-foreground-hover bg-background-secondary border-[0.5px] border-foreground-tertiary/50 hover:bg-background-hover w-full flex rounded-sm justify-center py-[0.5px] select-none"
                    onClick={() =>
                        mode === 'hsl'
                            ? setMode('hsv')
                            : mode === 'hsv'
                              ? setMode('rgb')
                              : mode === 'rgb'
                                ? setMode('hex')
                                : setMode('hsl')
                    }
                    data-oid="_k-w5:1"
                >
                    {mode.toUpperCase()}
                </label>
            </div>
            {mode === 'hsl' ? (
                <InputGroup
                    className="grid grid-cols-subgrid col-span-3 gap-[1px]"
                    data-oid="wokp1u-"
                >
                    <Input
                        value={Math.round(hslColor['h'] * 100).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 100, 1);
                            const newColor = Color.hsl({
                                ...hslColor,
                                h: value,
                            });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="ep3i_5x"
                    />

                    <Input
                        value={Math.round(hslColor['s'] * 100).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 100, 1);
                            const newColor = Color.hsl({
                                ...hslColor,
                                s: value,
                            });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="y8y.1hb"
                    />

                    <Input
                        value={Math.round(hslColor['l'] * 100).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 100, 1);
                            const newColor = Color.hsl({
                                ...hslColor,
                                l: value,
                            });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="zkem5qj"
                    />
                </InputGroup>
            ) : mode === 'hsv' ? (
                <InputGroup
                    className="grid grid-cols-subgrid col-span-3 gap-[1px]"
                    data-oid="o8rwx0f"
                >
                    <Input
                        value={Math.round(color.h * 360).toString()}
                        onChangeValue={(hString) => {
                            const h = mod(Number.parseInt(hString) / 360, 1);
                            const newColor = new Color({ ...color, h });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="5qt1ddo"
                    />

                    <Input
                        value={Math.round(color['s'] * 100).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 100, 1);
                            const newColor = new Color({ ...color, s: value });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="mlio6u7"
                    />

                    <Input
                        value={Math.round(color['v'] * 100).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 100, 1);
                            const newColor = new Color({ ...color, v: value });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="a7yx480"
                    />
                </InputGroup>
            ) : mode === 'rgb' ? (
                <InputGroup
                    className="grid grid-cols-subgrid col-span-3 gap-[1px]"
                    data-oid="v1dw3.m"
                >
                    <Input
                        value={Math.round(rgbColor['r'] * 255).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 255, 1);
                            const newColor = Color.rgb({
                                ...rgbColor,
                                r: value,
                            });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid=".favrb4"
                    />

                    <Input
                        value={Math.round(rgbColor['g'] * 255).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 255, 1);
                            const newColor = Color.rgb({
                                ...rgbColor,
                                g: value,
                            });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="qvazouu"
                    />

                    <Input
                        value={Math.round(rgbColor['b'] * 255).toString()}
                        onChangeValue={(valueString) => {
                            const value = mod(Number.parseInt(valueString) / 255, 1);
                            const newColor = Color.rgb({
                                ...rgbColor,
                                b: value,
                            });
                            onChangeEnd?.(newColor);
                            onChange?.(newColor);
                            return true;
                        }}
                        data-oid="lnzja3g"
                    />
                </InputGroup>
            ) : (
                <InputGroup className="col-span-3" data-oid="qiszlt5">
                    <Input
                        value={color.toHex6()}
                        onChangeValue={(hexString) => {
                            const newColor = Color.from(hexString);
                            onChange?.(newColor);
                            onChangeEnd?.(newColor);
                            return true;
                        }}
                        data-oid="mx0g_5v"
                    />
                </InputGroup>
            )}
            <div className="relative w-full" data-oid="d297f3-">
                <Input
                    value={Math.round(color.a * 100).toString()}
                    onChangeValue={(aString) => {
                        const a = mod(Number.parseInt(aString.replace('%', '')) / 100, 1);
                        const newColor = new Color({ ...color, a });
                        onChangeEnd?.(newColor);
                        onChange?.(newColor);
                        return true;
                    }}
                    className="pr-3"
                    data-oid="ql5nf3o"
                />

                <span
                    className="absolute right-[5px] top-1/2 transform -translate-y-1/2 text-foreground-tertiary"
                    style={{ userSelect: 'none' }}
                    data-oid="uyx-io-"
                >
                    %
                </span>
            </div>
        </div>
    );
};

const EyeDropperBox = styled.div`
    position: relative;
    overflow: hidden;
    width: 36px;
    height: 36px;
    border-radius: 25%;
    &::before {
        content: '';

        z-index: -1;

        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
`;

export const ColorPicker: React.FC<{
    color: Color;
    onChangeEnd?: (color: Color) => void;
    onChange?: (color: Color) => void;
    onMouseDown?: (color: Color) => void;
    className?: string;
}> = ({ color, onChangeEnd, onChange, onMouseDown, className }) => {
    const [activeHue, setActiveHue] = useState(color.h);
    const [localColor, setLocalColor] = useState(color);

    useEffect(() => {
        if (color.s > 0.01) {
            setActiveHue(color.h);
        }
        setLocalColor(color);
    }, [color]);

    const handleHueChange = useCallback(
        (h: number) => {
            const newHue = mod(h, 1);
            setActiveHue(newHue);

            const newColor = new Color({
                ...localColor,
                h: newHue,
            });

            setLocalColor(newColor);
            onChange?.(newColor);
        },
        [localColor, onChange],
    );

    const handleSVChange = useCallback(
        (newColor: Color) => {
            const updatedColor = new Color({
                h: activeHue,
                s: newColor.s,
                v: newColor.v,
                a: localColor.a,
            });

            setLocalColor(updatedColor);
            onChange?.(updatedColor);
        },
        [activeHue, localColor.a, onChange],
    );

    return (
        <div
            className={twMerge('w-[224px] flex flex-col gap-1.5 p-2', className)}
            data-oid="c7hgkqs"
        >
            <SVPicker
                width={208}
                height={160}
                handleSize={16}
                color={new Color({ ...localColor, h: activeHue, a: 1 })}
                onChangeEnd={(newColor) => {
                    const updatedColor = new Color({
                        h: activeHue,
                        s: newColor.s,
                        v: newColor.v,
                        a: localColor.a,
                    });
                    setLocalColor(updatedColor);
                    onChangeEnd?.(updatedColor);
                }}
                onChange={handleSVChange}
                onMouseDown={(newColor) => {
                    const updatedColor = new Color({
                        h: activeHue,
                        s: newColor.s,
                        v: newColor.v,
                        a: localColor.a,
                    });
                    setLocalColor(updatedColor);
                    onMouseDown?.(updatedColor);
                }}
                data-oid="tu99sn8"
            />

            <div className="z-50 flex justify-between items-center" data-oid="vzk0e-n">
                <EyeDropperBox data-oid="4pf39lk">
                    <EyeDropperButton
                        onColorSelect={(newColor) => {
                            setActiveHue(newColor.h);
                            setLocalColor(newColor);
                            onChangeEnd?.(newColor);
                        }}
                        data-oid="71dulx2"
                    />
                </EyeDropperBox>
                <div className="flex flex-col gap-1" data-oid="puhf.:y">
                    <ColorSlider
                        direction="right"
                        length={165}
                        handleSize={16}
                        railWidth={13}
                        color={new Color({ h: activeHue, s: 1, v: 1 }).toHex()}
                        colorStops={[
                            '#FF0000',
                            '#FFFF00',
                            '#00FF00',
                            '#00FFFF',
                            '#0000FF',
                            '#FF00FF',
                            '#FF0000',
                        ]}
                        value={activeHue}
                        onChangeEnd={(h) => {
                            setActiveHue(mod(h, 1));
                            const newColor = new Color({ ...localColor, h: mod(h, 1) });
                            setLocalColor(newColor);
                            onChangeEnd?.(newColor);
                        }}
                        onChange={handleHueChange}
                        onMouseDown={(h) => {
                            setActiveHue(mod(h, 1));
                            setLocalColor(new Color({ ...localColor, h: mod(h, 1) }));
                            onMouseDown?.(new Color({ ...localColor, h: mod(h, 1) }));
                        }}
                        data-oid="jrod:op"
                    />

                    <ColorSlider
                        direction="right"
                        length={165}
                        handleSize={16}
                        railWidth={13}
                        color={new Color({ ...localColor, a: 1 }).toHex()}
                        colorStops={[
                            new Color({ ...localColor, a: 0 }).toHex(),
                            new Color({ ...localColor, a: 1 }).toHex(),
                        ]}
                        value={localColor.a}
                        onChangeEnd={(a) => {
                            setLocalColor(new Color({ ...localColor, a }));
                            onChangeEnd?.(new Color({ ...localColor, a }));
                        }}
                        onChange={(a) => {
                            setLocalColor(new Color({ ...localColor, a }));
                            onChange?.(new Color({ ...localColor, a }));
                        }}
                        onMouseDown={(a) => {
                            setLocalColor(new Color({ ...localColor, a }));
                            onMouseDown?.(new Color({ ...localColor, a }));
                        }}
                        data-oid="0swaw.n"
                    />
                </div>
            </div>
            <InputsRow
                color={color}
                onChange={onChange}
                onChangeEnd={onChangeEnd}
                data-oid="obeeg_y"
            />
        </div>
    );
};
