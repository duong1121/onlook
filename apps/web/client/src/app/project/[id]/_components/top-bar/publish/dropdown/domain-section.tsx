import { useEditorEngine } from '@/components/store/editor';
import { useDomainsManager, useProjectManager } from '@/components/store/project';
import { useUserManager } from '@/components/store/user';
import { DefaultSettings } from '@onlook/constants';
import { DomainType, PublishStatus, SettingsTabValue } from '@onlook/models';
import { UsagePlanType } from '@onlook/models/usage';
import { Button } from '@onlook/ui/button';
import { Progress } from '@onlook/ui/progress';
import { cn } from '@onlook/ui/utils';
import { timeAgo } from '@onlook/utility';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { UrlSection } from './url';

export const DomainSection = observer(({ type }: { type: DomainType }) => {
    const editorEngine = useEditorEngine();
    const domainsManager = useDomainsManager();
    const userManager = useUserManager();
    const projectManager = useProjectManager();
    const project = projectManager.project;

    const [progress, setProgress] = useState(0);
    const plan = userManager.subscription.plan;
    const state = editorEngine.hosting.state;
    const isLoading = state.status === PublishStatus.LOADING;

    const domain =
        type === DomainType.PREVIEW
            ? domainsManager.domains.preview
            : domainsManager.domains.custom;

    useEffect(() => {
        let progressInterval: Timer | null = null;

        if (state.status === PublishStatus.LOADING) {
            setProgress(0);
            progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 0.167, 100));
            }, 100);
        } else {
            setProgress(0);
            if (progressInterval) {
                clearInterval(progressInterval);
            }
        }

        return () => {
            if (progressInterval) {
                clearInterval(progressInterval);
            }
        };
    }, [state.status]);

    if (!project) {
        return 'Something went wrong. Project not found.';
    }

    const openCustomDomain = (): void => {
        editorEngine.state.publishOpen = false;
        editorEngine.state.settingsTab = SettingsTabValue.DOMAIN;
        editorEngine.state.settingsOpen = true;
    };

    const createBaseDomain = async (): Promise<void> => {
        const domain = await domainsManager.createPreviewDomain();
        if (!domain) {
            console.error('Failed to create preview domain');
            return;
        }

        publish();
    };

    const publish = async () => {
        if (!domain) {
            console.error(`No ${type} domain hosting manager found`);
            return;
        }
        const res = await editorEngine.hosting.publish(project.id, {
            buildScript: DefaultSettings.COMMANDS.build,
            urls: [domain.url],
            options: {
                skipBadge: type === DomainType.CUSTOM,
                buildFlags: DefaultSettings.EDITOR_SETTINGS.buildFlags,
                envVars: project.env || {},
            },
        });
        console.log(res);
    };

    const retry = () => {
        if (!domain) {
            console.error(`No ${type} domain hosting manager found`);
            return;
        }
        editorEngine.hosting.resetState();
        publish();
    };

    const renderNoDomainBase = () => {
        return (
            <>
                <div className="flex items-center w-full" data-oid="txd1l:m">
                    <h3 className="" data-oid="bysz1ly">
                        Publish
                    </h3>
                </div>

                <Button
                    onClick={createBaseDomain}
                    className="w-full rounded-md p-3"
                    data-oid="kpv9su9"
                >
                    Publish my site
                </Button>
            </>
        );
    };

    const renderNoDomainCustom = () => {
        return (
            <>
                <div className="flex items-center w-full" data-oid="dh6l3wq">
                    <h3 className="" data-oid="p4t86co">
                        Custom Domain
                    </h3>
                    <span
                        className="ml-auto rounded-full bg-blue-400 text-white px-1.5 py-0.5 text-xs"
                        data-oid="s6d17_."
                    >
                        PRO
                    </span>
                </div>

                <Button
                    onClick={openCustomDomain}
                    className="w-full rounded-md p-3 bg-blue-600 border-blue border hover:bg-blue-700 text-white"
                    data-oid="1uk8qdz"
                >
                    Link a Custom Domain
                </Button>
            </>
        );
    };

    const renderDomain = () => {
        if (!domain) {
            return 'Something went wrong';
        }

        // If the domain is custom, check if the user has a PRO plan
        if (type === DomainType.CUSTOM) {
            if (plan !== UsagePlanType.PRO) {
                return renderNoDomainCustom();
            }
        }

        return (
            <>
                <div className="flex items-center w-full" data-oid="32oqf5p">
                    <h3 className="" data-oid="hhcfoot">
                        {type === DomainType.PREVIEW
                            ? domain.url
                                ? 'Base Domain'
                                : 'Publish'
                            : 'Custom Domain'}
                    </h3>
                    {state.status === PublishStatus.PUBLISHED && domain.publishedAt && (
                        <div className="ml-auto flex items-center gap-2" data-oid="lwfz4wt">
                            <p className="text-green-300" data-oid="gwam20v">
                                Live
                            </p>
                            <p data-oid="sysbt1h">•</p>
                            <p data-oid="itzsh0t">Updated {timeAgo(domain.publishedAt)} ago</p>
                        </div>
                    )}
                    {state.status === PublishStatus.ERROR && (
                        <div className="ml-auto flex items-center gap-2" data-oid="0:8fnp.">
                            <p className="text-red-500" data-oid="_9d2j3j">
                                Error
                            </p>
                        </div>
                    )}
                    {state.status === PublishStatus.LOADING && (
                        <div className="ml-auto flex items-center gap-2" data-oid="kl.61:9">
                            <p className="" data-oid="nf4.-::">
                                Updating • In progress
                            </p>
                        </div>
                    )}
                </div>
                {renderActionSection()}
            </>
        );
    };

    const renderActionSection = () => {
        if (!domain) {
            return 'Something went wrong';
        }

        return (
            <div className="w-full flex flex-col gap-2" data-oid="l4:uc_f">
                <UrlSection
                    url={domain.url}
                    isCopyable={domain.type === DomainType.PREVIEW}
                    data-oid="odj.ul6"
                />
                {(state.status === PublishStatus.PUBLISHED ||
                    state.status === PublishStatus.UNPUBLISHED) && (
                    <Button
                        onClick={publish}
                        variant="outline"
                        className={cn(
                            'w-full rounded-md p-3',
                            domain.type === DomainType.CUSTOM &&
                                !domain.publishedAt &&
                                'bg-blue-400 hover:bg-blue-500 text-white',
                        )}
                        disabled={isLoading}
                        data-oid="0ks3ay3"
                    >
                        {domain.type === DomainType.PREVIEW && 'Update'}
                        {domain.type === DomainType.CUSTOM &&
                            (domain.publishedAt ? 'Update' : `Publish to ${domain.url}`)}
                    </Button>
                )}
                {state.status === PublishStatus.ERROR && (
                    <div className="w-full flex flex-col gap-2" data-oid="i30qfuj">
                        <p className="text-red-500 max-h-20 overflow-y-auto" data-oid="g8ik84i">
                            {state.message}
                        </p>
                        <Button
                            variant="outline"
                            className="w-full rounded-md p-3"
                            onClick={retry}
                            data-oid="slb-f96"
                        >
                            Try Updating Again
                        </Button>
                    </div>
                )}
                {state.status === PublishStatus.LOADING && (
                    <div className="w-full flex flex-col gap-2 py-1" data-oid="e-v161r">
                        <p data-oid="ma95w1c">{state.message}</p>
                        <Progress value={progress} className="w-full" data-oid="gam35eh" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 flex flex-col items-center gap-2" data-oid="uac6v5t">
            {domain?.url
                ? renderDomain()
                : type === DomainType.PREVIEW
                  ? renderNoDomainBase()
                  : renderNoDomainCustom()}
        </div>
    );
});
