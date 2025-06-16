'use client';

import { useUserManager } from '@/components/store/user';
import { CurrentUserAvatar } from '@/components/ui/avatar-dropdown';
import { Routes } from '@/utils/constants';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { GitHubButton } from './github';

export const TopBar = observer(() => {
    const userManager = useUserManager();
    const user = userManager.user;

    return (
        <div
            className="w-full max-w-6xl mx-auto flex items-center justify-between p-4 h-12 text-small text-foreground-secondary"
            data-oid="14hs_d_"
        >
            <div className="flex items-center gap-10" data-oid="dkc11af">
                <Link href={Routes.HOME} data-oid="nlboefh">
                    <Icons.OnlookTextLogo className="h-3" data-oid="x:.rgtf" />
                </Link>
                <Link
                    href="https://docs.onlook.com"
                    target="_blank"
                    className="text-regular hover:opacity-80"
                    data-oid="ompa3e1"
                >
                    Docs
                </Link>
                {/* <Link href={Routes.PRICING} className="text-regular hover:opacity-80">
             Pricing
          </Link> */}
                <GitHubButton data-oid="pe20dk0" />
            </div>
            <div className="flex items-center gap-3" data-oid="aukkhy0">
                {user ? (
                    <>
                        <Button
                            variant="secondary"
                            asChild
                            className="rounded cursor-pointer"
                            data-oid="h0yhfcs"
                        >
                            <Link href={Routes.PROJECTS} data-oid="z8qqr31">
                                Projects
                            </Link>
                        </Button>
                        <CurrentUserAvatar
                            className="cursor-pointer hover:opacity-80"
                            data-oid="xzu:iwd"
                        />
                    </>
                ) : (
                    <Button
                        variant="secondary"
                        asChild
                        className="rounded cursor-pointer"
                        data-oid="knw_s9g"
                    >
                        <Link href={Routes.LOGIN} data-oid="no6n0ob">
                            Sign In
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
});
