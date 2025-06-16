import type { ProjectRole, UserMetadata } from '@onlook/models';
import { Avatar, AvatarFallback, AvatarImage } from '@onlook/ui/avatar';
import { getInitials } from '@onlook/utility';

interface MemberRowProps {
    user: UserMetadata;
    role: ProjectRole;
}

export const MemberRow = ({ user, role }: MemberRowProps) => {
    const initials = getInitials(user.name ?? '');

    return (
        <div className="py-2 px-3 flex gap-2 items-center" data-oid="6uwd5x8">
            <Avatar data-oid="025awhi">
                {user?.avatarUrl && (
                    <AvatarImage src={user.avatarUrl} alt={initials} data-oid="qa3aue_" />
                )}
                <AvatarFallback data-oid="ad19uyq">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center gap-0.5 flex-1" data-oid="nx_zkql">
                <div data-oid="zhyun4p">{user.name}</div>
                <div className="text-xs text-muted-foreground" data-oid="a0zlfv2">
                    {user.email}
                </div>
            </div>
        </div>
    );
};
