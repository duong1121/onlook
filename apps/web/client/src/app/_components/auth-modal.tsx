import { transKeys } from '@/i18n/keys';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@onlook/ui/alert-dialog';
import { Button } from '@onlook/ui/button';
import { useTranslations } from 'next-intl';
import { useAuthContext } from '../auth/auth-context';
import { GithubLoginButton, GoogleLoginButton } from './login-button';

export function AuthModal() {
    const { setIsAuthModalOpen, isAuthModalOpen } = useAuthContext();
    const t = useTranslations();
    return (
        <AlertDialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} data-oid="5y-ifj3">
            <AlertDialogContent className="!max-w-sm bg-black" data-oid="ui1paqq">
                <AlertDialogHeader data-oid="37sw819">
                    <AlertDialogTitle
                        className="text-center text-xl font-normal"
                        data-oid="ou1hc__"
                    >
                        {t(transKeys.welcome.login.loginToEdit)}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center" data-oid="kno.r9b">
                        {t(transKeys.welcome.login.shareProjects)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2 flex flex-col" data-oid="zzcpga-">
                    <GithubLoginButton className="!bg-black" data-oid="l2px5zf" />
                    <GoogleLoginButton className="!bg-black" data-oid="sgcovla" />
                </div>
                <AlertDialogFooter className="flex !justify-center w-full" data-oid="vux99qv">
                    <Button
                        variant={'ghost'}
                        onClick={() => setIsAuthModalOpen(false)}
                        data-oid="xd.szpv"
                    >
                        {t(transKeys.projects.actions.close)}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
