import { Button } from '@onlook/ui/button';

export function CTASection() {
    return (
        <div
            className="w-full max-w-6xl mx-auto py-32 px-8 flex flex-col md:flex-row items-right gap-24 md:gap-12"
            data-oid="ccoa4ip"
        >
            <div
                className="flex-1 flex flex-col items-end justify-center mx-auto text-right"
                data-oid="ucwpthq"
            >
                <h1
                    className="text-foreground-primary text-[5vw] md:text-[5vw] leading-[1.05] font-light mb-8 max-w-4xl"
                    data-oid="gz1v65h"
                >
                    Craft a website
                    <br className="hidden md:block" data-oid="zb2:c4:" /> for free today
                </h1>
                <div
                    className="flex flex-col sm:flex-row items-center justify-right gap-0"
                    data-oid="vh9hsnf"
                >
                    <Button
                        variant="secondary"
                        size="lg"
                        className="p-6 cursor-pointer hover:bg-foreground-primary hover:text-background-primary transition-colors"
                        data-oid="ogz9e_t"
                    >
                        Get Started
                    </Button>
                    <span
                        className="text-foreground-tertiary text-regular text-left ml-0 sm:ml-6 mt-2 sm:mt-0"
                        data-oid="pcj5roz"
                    >
                        No credit card required.
                        <br data-oid="0.c6zcp" /> Cancel anytime.
                    </span>
                </div>
            </div>
        </div>
    );
}
