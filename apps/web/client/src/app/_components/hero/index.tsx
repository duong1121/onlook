'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { vujahdayScript } from '../../fonts';
import { Create } from './create';
import { CreateError } from './create-error';
import { HighDemand } from './high-demand';
import { UnicornBackground } from './unicorn-background';

export function Hero() {
    const [isMounted, setIsMounted] = useState(false);
    const [cardKey, setCardKey] = useState(0);

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center gap-12 p-8 text-lg text-center relative"
            data-oid="i-4qaf-"
        >
            <UnicornBackground setIsMounted={setIsMounted} data-oid="9zw_m7s" />
            <div
                className="flex flex-col gap-3 items-center relative z-20 pt-4 pb-2"
                data-oid="9ab:lfc"
            >
                <motion.h1
                    className="text-6xl font-light leading-tight text-center !leading-[0.9]"
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={
                        isMounted
                            ? { opacity: 1, filter: 'blur(0px)' }
                            : { opacity: 0, filter: 'blur(4px)' }
                    }
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ willChange: 'opacity, filter', transform: 'translateZ(0)' }}
                    data-oid="-msv.my"
                >
                    Make your
                    <br data-oid="wm6p37u" />
                    <span className="font-light" data-oid="moir9e5">
                        designs{' '}
                    </span>
                    <span
                        className={`italic font-normal ${vujahdayScript.className} text-[4.75rem] ml-1 leading-[1.0]`}
                        data-oid="aqchgl_"
                    >
                        real
                    </span>
                </motion.h1>
                <motion.p
                    className="text-lg text-foreground-secondary max-w-xl text-center mt-2"
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={
                        isMounted
                            ? { opacity: 1, filter: 'blur(0px)' }
                            : { opacity: 0, filter: 'blur(4px)' }
                    }
                    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    style={{ willChange: 'opacity, filter', transform: 'translateZ(0)' }}
                    data-oid="vv8t3.u"
                >
                    Onlook is a next-generation visual code editor
                    <br data-oid="k1kzbxw" />
                    that lets designers and product managers craft
                    <br data-oid="2iub9tm" />
                    web experiences with AI
                </motion.p>
                <HighDemand isMounted={isMounted} data-oid="y_atic_" />
                <CreateError data-oid="z3kzufv" />
            </div>
            <div
                className="sm:flex hidden flex-col gap-4 items-center relative z-20"
                data-oid="s96odco"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    onAnimationComplete={() => {
                        setCardKey((prev) => prev + 1);
                    }}
                    data-oid="e:niyqh"
                >
                    <Create cardKey={cardKey} data-oid="z:agc_4" />
                </motion.div>
                <motion.div
                    className="text-center text-xs text-foreground-secondary mt-2 opacity-80"
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={
                        isMounted
                            ? { opacity: 1, filter: 'blur(0px)' }
                            : { opacity: 0, filter: 'blur(4px)' }
                    }
                    transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
                    style={{ willChange: 'opacity, filter', transform: 'translateZ(0)' }}
                    data-oid="bba.go1"
                >
                    No Credit Card Required &bull; Get a Site in Seconds
                </motion.div>
            </div>
            <div
                className="sm:hidden text-balance flex flex-col gap-4 items-center relative z-20 px-10"
                data-oid="0y0uz0o"
            >
                Onlook isn’t ready for Mobile – Please open on a larger screen
            </div>
        </div>
    );
}
