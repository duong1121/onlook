import { Icons } from '@onlook/ui/icons/index';
import { useRouter } from 'next/navigation';

export function Footer() {
    const router = useRouter();

    return (
        <footer
            className="w-full text-foreground-primary border-t border-foreground-primary/10 mt-24 pb-24"
            data-oid="2b9wmja"
        >
            <div
                className="max-w-6xl mx-auto px-8 pt-16 pb-24 flex flex-col md:flex-row md:items-start gap-24"
                data-oid="gvafryh"
            >
                {/* Left: Slogan */}
                <div
                    className="flex-1 flex flex-col gap-8 min-w-[250px] cursor-pointer"
                    onClick={() => router.push('/')}
                    data-oid="cwiinhq"
                >
                    <Icons.OnlookTextLogo
                        className="w-24 h-5 text-foreground-primary"
                        data-oid="lfqtaos"
                    />
                </div>
                {/* Center: Links */}
                <div
                    className="flex-1 flex flex-col md:flex-row gap-12 md:gap-24 justify-center"
                    data-oid="4-46wya"
                >
                    <div data-oid=":3twfwg">
                        <h4
                            className="text-regularPlus mb-4 text-foreground-primary"
                            data-oid="4s2id_g"
                        >
                            Company
                        </h4>
                        <ul
                            className="flex flex-col gap-4 text-regular text-foreground-secondary"
                            data-oid="tr.v:gt"
                        >
                            {/* <li><a href="#" className="hover:underline">About</a></li> */}
                            <li data-oid="q3nuo.b">
                                <a
                                    href="https://docs.onlook.com"
                                    target="_blank"
                                    className="hover:underline"
                                    data-oid="-1r9h9t"
                                >
                                    Docs
                                </a>
                            </li>
                            {/* <li><a href="/faq" className="hover:underline">FAQ</a></li> */}
                            <li data-oid="ezo1r2w">
                                <a
                                    href="https://onlook.substack.com"
                                    target="_blank"
                                    className="hover:underline"
                                    data-oid="n91gak_"
                                >
                                    Blog
                                </a>
                            </li>
                            {/* <li><a href="#" className="hover:underline">Careers</a></li> */}
                            <li data-oid="917-nht">
                                <a
                                    href="mailto:contact@onlook.com"
                                    className="hover:underline"
                                    data-oid="u-1m:.8"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="min-w-[200px]" data-oid="orvqqu3">
                        <h4
                            className="text-regularPlus mb-4 text-foreground-primary"
                            data-oid="b35eujq"
                        >
                            Product
                        </h4>
                        <ul
                            className="flex flex-col gap-4 text-regular text-foreground-secondary"
                            data-oid="1jqhcm-"
                        >
                            <li data-oid="u5h2.7d">
                                <a href="/projects" className="hover:underline" data-oid="9kx46is">
                                    My Projects
                                </a>
                            </li>
                            <li data-oid="ys1rpd4">
                                <a
                                    href="https://github.com/onlook-dev/onlook"
                                    target="_blank"
                                    className="hover:underline"
                                    data-oid="xihmt7t"
                                >
                                    GitHub Repo
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div data-oid="v392e5z">
                        <h4
                            className="text-regularPlus mb-4 text-foreground-primary"
                            data-oid="l660cfm"
                        >
                            Follow Us
                        </h4>
                        <div className="flex gap-6 mt-2" data-oid="-bz.d_t">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-oid="iiovz0q"
                            >
                                <Icons.GitHubLogo
                                    className="w-6 h-6 text-white hover:text-white/70 transition-colors"
                                    data-oid="mj3l4tr"
                                />
                            </a>
                            <a
                                href="https://discord.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-oid="5mo32oe"
                            >
                                <Icons.DiscordLogo
                                    className="w-6 h-6 text-white hover:text-white/70 transition-colors"
                                    data-oid="8ackxxf"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="max-w-6xl mx-auto px-8 pb-4 pt-24" data-oid="z2wdati">
                <div
                    className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between w-full gap-0 md:gap-4 border-t border-foreground-primary/10 pt-6"
                    data-oid="io1_wyb"
                >
                    {/* Center: Links */}
                    <div
                        className="flex gap-8 text-foreground-tertiary text-small justify-center w-full md:w-auto mb-4 md:mb-0"
                        data-oid="gt0h.rf"
                    >
                        <a href="/terms-of-service" className="hover:underline" data-oid="858o5rg">
                            Terms of Service
                        </a>
                        <a href="/privacy-policy" className="hover:underline" data-oid="tdajbx.">
                            Privacy Policy
                        </a>
                        <a href="/sitemap.xml" className="hover:underline" data-oid="-6utu2o">
                            Sitemap
                        </a>
                    </div>
                    {/* Right: Copyright */}
                    <div
                        className="text-foreground-tertiary text-small w-full md:w-auto flex justify-center md:justify-end"
                        data-oid="040.pi."
                    >
                        © {new Date().getFullYear()} On Off, Inc.
                    </div>
                </div>
            </div>
        </footer>
    );
}
