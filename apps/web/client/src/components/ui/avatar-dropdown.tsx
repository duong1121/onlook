'use client';

import { useUserManager } from '@/components/store/user';
import { Routes } from '@/utils/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@onlook/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons/index';
import { redirect } from 'next/navigation';

export const CurrentUserAvatar = ({
    className,
    disableDropdown = false,
}: {
    className?: string;
    disableDropdown?: boolean;
}) => {
    const userManager = useUserManager();
    const user = userManager.user;
    const initials = user?.name
        ?.split(' ')
        ?.map((word) => word[0])
        ?.join('')
        ?.toUpperCase();

    const handleSignOut = async () => {
        await userManager.signOut();
        redirect(Routes.LOGIN);
    };

    return (
        <DropdownMenu data-oid="sykjzaa">
            <DropdownMenuTrigger asChild disabled={disableDropdown} data-oid="wlvf_5w">
                <Avatar className={className} data-oid="-nbp2dt">
                    {user?.avatarUrl && (
                        <AvatarImage src={user.avatarUrl} alt={initials} data-oid="i50.r83" />
                    )}
                    <AvatarFallback data-oid="skcll2y">{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent data-oid="l6zh.m4">
                <DropdownMenuItem onClick={handleSignOut} data-oid="8y7a-.m">
                    <Icons.Exit className="w-4 h-4 mr-2" data-oid="j:dkcdp" /> Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
