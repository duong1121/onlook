import { Icons } from '@onlook/ui/icons/index';
import { ButtonLink } from '../button-link';

export function FeaturesSection() {
    return (
        <>
            <div
                className="w-full max-w-6xl mx-auto py-32 px-8 flex flex-col items-start"
                data-oid="ujjjp6:"
            >
                <h2
                    className="text-foreground-primary text-[6vw] leading-[1.1] font-light mb-12 max-w-5xl"
                    data-oid="bed-g3s"
                >
                    See what you can
                    <br data-oid="bs9yopl" />
                    craft in Onlook
                </h2>
                <ButtonLink
                    href="#"
                    rightIcon={<Icons.ArrowRight className="w-5 h-5" data-oid=":g2fyrs" />}
                    data-oid="y97sk23"
                >
                    Browse more
                </ButtonLink>
            </div>

            {/* New Features Section */}
            <div
                className="w-full max-w-6xl mx-auto py-20 px-8 flex flex-col md:flex-row items-start md:items-stretch gap-12 md:gap-0"
                data-oid="m.2geax"
            >
                <div className="flex-1 mb-12 md:mb-0 md:mr-8" data-oid="2tvefbz">
                    <h3 className="text-foreground-primary text-lg mb-4" data-oid="0f6dija">
                        Real Code
                    </h3>
                    <p
                        className="text-foreground-secondary text-regular text-balance"
                        data-oid="::3:k2_"
                    >
                        This is where more information
                        <br data-oid="a1pkten" />
                        would go
                    </p>
                </div>
                <div className="flex-1 mb-12 md:mb-0 md:mr-8" data-oid="e13f7.2">
                    <h3 className="text-foreground-primary text-lg mb-4" data-oid="hq4o5mw">
                        AI powered
                    </h3>
                    <p
                        className="text-foreground-secondary text-regular text-balance"
                        data-oid="pdsg:.3"
                    >
                        Even more control and power with
                        <br data-oid="i11jk1p" />
                        the interface
                    </p>
                </div>
                <div className="flex-1" data-oid="uj.5-k_">
                    <h3 className="text-foreground-primary text-lg mb-4" data-oid="fqwcm.y">
                        Publish in a click
                    </h3>
                    <p
                        className="text-foreground-secondary text-regular text-balance"
                        data-oid="uxa6p9d"
                    >
                        Share a link with colleagues or
                        <br data-oid="cwbbcvq" />
                        attach a domain in seconds
                    </p>
                </div>
            </div>
        </>
    );
}
