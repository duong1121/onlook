import { DomainType } from '@onlook/models';
import { Separator } from '@onlook/ui/separator';
import { DomainSection } from './domain-section';

export const PublishDropdown = () => {
    return (
        <div className="rounded-md flex flex-col text-foreground-secondary" data-oid="lmj6yt:">
            <DomainSection type={DomainType.PREVIEW} data-oid="2xtub1u" />
            <Separator data-oid=".00edb6" />
            {/* <DomainSection
           domain={customDomain}
           type={DomainType.CUSTOM}
        />
        <Separator />
        <AdvancedSettingsSection /> */}
        </div>
    );
};
