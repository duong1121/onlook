'use client';

import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '../utils';

function InputOTP({
    className,
    containerClassName,
    ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
    return (
        <OTPInput
            data-slot="input-otp"
            containerClassName={cn(
                'flex items-center gap-2 has-disabled:opacity-50',
                containerClassName,
            )}
            className={cn('disabled:cursor-not-allowed', className)}
            {...props}
            data-oid="-pcia8_"
        />
    );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="input-otp-group"
            className={cn('flex items-center', className)}
            {...props}
            data-oid="7rcfv8m"
        />
    );
}

function InputOTPSlot({
    index,
    className,
    ...props
}: React.ComponentProps<'div'> & { index: number }) {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

    return (
        <div
            data-slot="input-otp-slot"
            data-active={isActive}
            className={cn(
                'data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]',
                className,
            )}
            {...props}
            data-oid="9w_w3k0"
        >
            {char}
            {hasFakeCaret && (
                <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    data-oid="3os7iyf"
                >
                    <div
                        className="animate-caret-blink bg-foreground h-4 w-px duration-1000"
                        data-oid="-:im_ez"
                    />
                </div>
            )}
        </div>
    );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
    return (
        <div data-slot="input-otp-separator" role="separator" {...props} data-oid="cy5kcwt">
            <MinusIcon data-oid="552b:yy" />
        </div>
    );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
