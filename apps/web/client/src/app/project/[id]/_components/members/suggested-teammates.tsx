import { api } from '@/trpc/react';
import { ProjectRole } from '@onlook/models';
import { Button } from '@onlook/ui/button';
import { Icons } from '@onlook/ui/icons/index';
import { Separator } from '@onlook/ui/separator';

interface SuggestedTeammateProps {
    projectId: string;
}

export const SuggestedTeammates = ({ projectId }: SuggestedTeammateProps) => {
    const apiUtils = api.useUtils();
    const { data: suggestedUsers } = api.invitation.suggested.useQuery({ projectId });
    const createInvitationMutation = api.invitation.create.useMutation({
        onSuccess: () => {
            apiUtils.invitation.suggested.invalidate();
            apiUtils.invitation.list.invalidate();
        },
    });

    return (
        <div className="flex flex-col gap-2 p-3" data-oid="lilf5n:">
            <Separator data-oid="w:j.8t_" />
            <div className="space-y-0.5" data-oid="3.ng_yi">
                <div className="text-sm" data-oid="_cyc2zd">
                    Suggested Teammates
                </div>
                <div className="text-xs text-muted-foreground" data-oid="hc.f2fe">
                    Invite relevant people to collaborate
                </div>
            </div>
            <div className="flex gap-0.5" data-oid="lq2:mr1">
                {suggestedUsers?.map((email) => (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl font-normal"
                        onClick={() => {
                            createInvitationMutation.mutate({
                                projectId,
                                inviteeEmail: email,
                                role: ProjectRole.ADMIN,
                            });
                        }}
                        data-oid="527uqzk"
                    >
                        {email}
                        <Icons.PlusCircled className="ml-1 size-4" data-oid=".em7be_" />
                    </Button>
                ))}
            </div>
        </div>
    );
};
