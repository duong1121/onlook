import { Icons } from '@onlook/ui/icons/index';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main
            className="flex flex-1 flex-col items-center justify-center p-4 text-center"
            data-oid="fu4acoa"
        >
            <div className="max-w-md space-y-6" data-oid="9p6aek_">
                <div className="space-y-2" data-oid="_rpg0d6">
                    <h1 className="text-4xl font-bold tracking-tight" data-oid="7rrha3-">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold tracking-tight" data-oid="6vk30e4">
                        Page not found
                    </h2>
                    <p className="text-muted-foreground" data-oid="kapcpuj">
                        {`The page you're looking for doesn't exist or has been moved.`}
                    </p>
                </div>

                <div className="flex justify-center" data-oid="c5i-6j8">
                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        data-oid="zu_19mt"
                    >
                        <Icons.ArrowLeft className="h-4 w-4" data-oid="5dskzho" />
                        Back to documentation
                    </Link>
                </div>
            </div>
        </main>
    );
}
