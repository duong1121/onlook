import { useEditorEngine } from '@/components/store/editor';
import { useUserManager } from '@/components/store/user';
import { transKeys } from '@/i18n/keys';
import { Links } from '@onlook/constants';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@onlook/ui/dropdown-menu';
import { Icons } from '@onlook/ui/icons';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useState } from 'react';
// import { invokeMainChannel } from '@/lib/utils';

export const HelpDropdown = observer(() => {
    const editorEngine = useEditorEngine();
    const userManager = useUserManager();

    const { theme, setTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const t = useTranslations();

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} data-oid="geqpvun">
            <DropdownMenuTrigger asChild data-oid=".dbzv19">
                <button
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1.5 p-2 text-muted-foreground hover:text-foreground"
                    data-oid="tz9i-r7"
                >
                    <Icons.QuestionMarkCircled className="w-5 h-5" data-oid="530yyty" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                side="left"
                alignOffset={55}
                sideOffset={-55}
                className="w-48"
                data-oid=".:xf-mn"
            >
                {/* <<DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
          {theme === SystemTheme.DARK && <Icons.Moon className="w-4 h-4 mr-2" />}
          {theme === SystemTheme.LIGHT && <Icons.Sun className="w-4 h-4 mr-2" />}
          {theme === SystemTheme.SYSTEM && <Icons.Laptop className="w-4 h-4 mr-2" />}
          {t(transKeys.help.menu.theme.title)}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-32 ml-2">
          <DropdownMenuItem
          className="text-sm"
          onClick={() => {
          setTheme(SystemTheme.LIGHT);
          }}
          >
          <Icons.Sun className="w-4 h-4 mr-2" />
          {t(transKeys.help.menu.theme.light)}
          </DropdownMenuItem>
          <DropdownMenuItem
          className="text-sm"
          onClick={() => {
          setTheme(SystemTheme.DARK);
          }}
          >
          <Icons.Moon className="w-4 h-4 mr-2" />
          {t(transKeys.help.menu.theme.dark)}
          </DropdownMenuItem>
          <DropdownMenuItem
          className="text-sm"
          onClick={() => {
          setTheme(SystemTheme.SYSTEM);
          }}
          >
          <Icons.Laptop className="w-4 h-4 mr-2" />
          {t(transKeys.help.menu.theme.system)}
          </DropdownMenuItem>
          </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
          <Icons.Globe className="w-4 h-4 mr-2" />
          {t(transKeys.help.menu.language)}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-32 ml-2">
          {Object.values(Language).map((language) => (
          <DropdownMenuItem
          key={language}
          className="text-sm"
          onClick={() => userManager.language.update(language)}
          >
          {LANGUAGE_DISPLAY_NAMES[language]}
          </DropdownMenuItem>
          ))}
          </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem
          className="text-sm"
          onClick={() => (editorEngine.state.hotkeysOpen = true)}
          >
          <Icons.Keyboard className="w-4 h-4 mr-2" />
          {t(transKeys.help.menu.shortcuts)}
          </DropdownMenuItem>
          DropdownMenuItem
          className="text-sm"
          onClick={() => (editorEngine.state.settingsOpen = true)}
          >
          <Icons.Gear className="w-4 h-4 mr-2" />
          {t(transKeys.help.menu.openSettings)}
          </DropdownMenuItem> 
          <DropdownMenuSeparator />*/}

                <DropdownMenuSub data-oid="4jdyaam">
                    <DropdownMenuSubTrigger className="text-sm gap-2" data-oid="ctily0.">
                        <Icons.EnvelopeClosed className="w-4 h-4 mr-2" data-oid="xjg7jia" />
                        {t(transKeys.help.menu.contactUs.title)}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48 ml-2" data-oid="b.0:95-">
                        <DropdownMenuItem
                            onClick={() => window.open('https://onlook.com', '_blank')}
                            data-oid="fftcw1w"
                        >
                            <Icons.Globe className="w-4 h-4 mr-2" data-oid="::k9f4s" />
                            {t(transKeys.help.menu.contactUs.website)}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => window.open(Links.DISCORD, '_blank')}
                            data-oid="th:41n0"
                        >
                            <Icons.DiscordLogo className="w-4 h-4 mr-2" data-oid=":6.rnw9" />
                            {t(transKeys.help.menu.contactUs.discord)}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => window.open(Links.GITHUB, '_blank')}
                            data-oid="ux7cs8c"
                        >
                            <Icons.GitHubLogo className="w-4 h-4 mr-2" data-oid="8rp-cqs" />
                            {t(transKeys.help.menu.contactUs.github)}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => window.open('mailto:support@onlook.com', '_blank')}
                            data-oid="qqezy67"
                        >
                            <Icons.EnvelopeClosed className="w-4 h-4 mr-2" data-oid="ljjw.6d" />
                            {t(transKeys.help.menu.contactUs.email)}
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem
                    onClick={() => window.open(Links.OPEN_ISSUE, '_blank')}
                    data-oid="ya4ued1"
                >
                    <Icons.ExclamationTriangle className="w-4 h-4 mr-2" data-oid="kh6i_ma" />
                    {t(transKeys.help.menu.reportIssue)}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});
