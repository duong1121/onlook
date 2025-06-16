import { InvitationRow } from './invitation-row';

import { MemberRow } from './member-row';

import { api } from '@/trpc/react';

import { InviteMemberInput } from './invite-member-input';
import { SuggestedTeammates } from './suggested-teammates';

export const MembersContent = ({ projectId }: { projectId: string }) => {
    const { data: members, isLoading: loadingMembers } = api.member.list.useQuery({
        projectId,
    });
    const { data: invitations, isLoading: loadingInvitations } = api.invitation.list.useQuery({
        projectId,
    });

    if (loadingMembers && loadingInvitations) {
        // TODO: Add skeleton
        return null;
    }

    return (
        <>
            <div
                className="border-b border-b-[0.5px] p-3 text-muted-foreground text-sm"
                data-oid="b55203w"
            >
                Invite Others
            </div>
            <InviteMemberInput projectId={projectId} data-oid="auc2:e5" />
            {members?.map((member) => (
                <MemberRow
                    key={member.userId}
                    user={member.user}
                    role={member.role}
                    data-oid="ogkfmgl"
                />
            ))}
            {invitations?.map((invitation) => (
                <InvitationRow key={invitation.id} invitation={invitation} data-oid="npa15og" />
            ))}
            <SuggestedTeammates projectId={projectId} data-oid="yloq-6w" />
        </>
    );
};
