'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        const returnUrl = localStorage.getItem('returnUrl') || '/';
        localStorage.removeItem('returnUrl');
        router.push(returnUrl);
    }, [router]);

    return (
        <div className="flex h-screen w-screen items-center justify-center" data-oid="0jof1ti">
            <div className="text-center" data-oid="l05woqp">
                <h1 className="text-2xl font-semibold mb-4" data-oid="89voao0">
                    Redirecting...
                </h1>
                <p className="text-foreground-secondary" data-oid="lr1u.-n">
                    Please wait while we redirect you back.
                </p>
            </div>
        </div>
    );
}
