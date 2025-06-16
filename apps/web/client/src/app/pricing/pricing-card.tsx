'use client';

import { Button } from '@onlook/ui/button';
import { MotionCard } from '@onlook/ui/motion-card';
import { Icons } from '@onlook/ui/icons';
import { motion } from 'motion/react';

export interface PricingCardProps {
    plan: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
}

export function PricingCard({ plan, price, description, features, buttonText }: PricingCardProps) {
    return (
        <MotionCard className="flex flex-col p-5 pb-8 h-full" data-oid="m_8::nc">
            <motion.div className="flex flex-col gap-2" data-oid="oeq6j67">
                <h2 className="text-[18px] font-medium" data-oid="f2qv0:n">
                    {plan}
                </h2>
                <p className="text-[40px] font-medium flex items-baseline" data-oid="b06pn92">
                    <span data-oid="xt909k4">{price.split('/')[0]}</span>
                    <span
                        className="text-[18px] font-normal ml-1 text-muted-foreground"
                        data-oid="ce470c6"
                    >
                        /month
                    </span>
                </p>
            </motion.div>
            <p className="text-muted-foreground text-sm mt-2 mb-4 flex-grow-0" data-oid="ur.cxsf">
                {description}
            </p>
            <div className="h-[0.5px] bg-white/20 -mx-5 my-5" data-oid="pz6kim0" />
            <div className="space-y-2 mb-6 flex-grow" data-oid="12l4u.0">
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-start gap-2 text-sm text-foreground-secondary/80"
                        data-oid="5j5ltuv"
                    >
                        <Icons.Check className="w-4 h-4 mt-0.5" data-oid="nb2.y1i" />
                        <span className="text-balance" data-oid="k:nhbe7">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
            <Button className="mt-auto" data-oid="nwar5a2">
                {buttonText}
            </Button>
        </MotionCard>
    );
}
