import { redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/docs');

    return (
        <main className="flex flex-1 flex-col justify-center text-center" data-oid="tp3y96x">
            <h1 className="mb-4 text-2xl font-bold" data-oid="yxojei:">
                Welcome to Onlook Docs
            </h1>
        </main>
    );
}
