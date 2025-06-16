'use client';

import { Icons } from '@onlook/ui/icons/index';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main
            className="flex flex-1 flex-col items-center justify-center h-screen w-screen p-4 text-center"
            data-oid="cx:lrpa"
        >
            <div className="max-w-md space-y-6" data-oid="2-jq9zk">
                <div className="space-y-2" data-oid="kng71--">
                    <h1
                        className="text-4xl font-bold tracking-tight text-foreground-primary"
                        data-oid="2-s_epq"
                    >
                        404
                    </h1>
                    <h2
                        className="text-2xl font-semibold tracking-tight text-foreground-primary"
                        data-oid="4h033p_"
                    >
                        Page not found
                    </h2>
                    <p className="text-foreground-secondary" data-oid="2e4j:wi">
                        {`The page you're looking for doesn't exist or has been moved.`}
                    </p>
                </div>

                <div className="flex justify-center" data-oid="x8w1q-f">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        data-oid="588df5b"
                    >
                        <Icons.ArrowLeft className="h-4 w-4" data-oid="pwgig2s" />
                        Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
