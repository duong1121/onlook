'use client';

import { api } from '@/trpc/react';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@onlook/ui/skeleton';
import { Routes } from '@/utils/constants';

export function Main({ invitationId }: { invitationId: string }) {
    const router = useRouter();
    const token = useSearchParams().get('token');
    const { data: invitation, isLoading: loadingInvitation } = api.invitation.get.useQuery({
        id: invitationId,
    });
    const acceptInvitationMutation = api.invitation.accept.useMutation({
        onSuccess: () => {
            router.push(Routes.PROJECTS);
        },
    });

    if (loadingInvitation) {
        return (
            <div className="flex justify-center w-full h-full" data-oid=":mxxx5t">
                <div
                    className="flex flex-col items-center justify-center w-5/6 md:w-1/2 gap-4"
                    data-oid="ou1r63b"
                >
                    <Skeleton className="w-full h-10" data-oid="917v1qx" />
                    <Skeleton className="w-full h-40" data-oid="ev3tdte" />
                    <div className="flex justify-center" data-oid="zpb56ae">
                        <Skeleton className="w-full h-10 w-20" data-oid="-zvesm1" />
                    </div>
                </div>
            </div>
        );
    }

    if (!invitation || !token) {
        return (
            <div className="flex flex-row w-full" data-oid="8::nvqd">
                <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4"
                    data-oid="_:lrzr_"
                >
                    <div className="text-xl text-foreground-secondary" data-oid="nh5k0k_">
                        Invitation not found
                    </div>
                    <div className="text-md text-foreground-tertiary" data-oid="ry0i_fc">
                        The invitation you are looking for does not exist or has expired.
                    </div>
                    <div className="flex justify-center" data-oid="3c4p-pf">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            data-oid="rg7gfof"
                        >
                            <Icons.ArrowLeft className="h-4 w-4" data-oid="fp0nt3g" />
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const inviter = invitation.inviter.name ?? invitation.inviter.email;

    return (
        <div className="flex flex-row w-full" data-oid="poigik3">
            <div
                className="w-full h-full flex flex-col items-center justify-center gap-4"
                data-oid="f.ohy9_"
            >
                <div className="text-xl" data-oid="mvls653">
                    Join {inviter} on Onlook
                </div>
                <div className="text-md text-foreground-tertiary" data-oid="bgsenu_">
                    {inviter} has invited you to join their project
                </div>
                <div className="flex justify-center" data-oid="1les8-j">
                    <Button
                        type="button"
                        onClick={() => {
                            acceptInvitationMutation.mutate({
                                id: invitationId,
                                token: invitation.token,
                            });
                        }}
                        disabled={acceptInvitationMutation.isPending}
                        data-oid=".h20wxj"
                    >
                        Join Project
                    </Button>
                </div>
            </div>
        </div>
    );
}
