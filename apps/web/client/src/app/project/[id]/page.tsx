import { Main } from './_components/main';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const projectId = (await params).id;
    if (!projectId) {
        return <div data-oid="r.nbls0">Invalid project ID</div>;
    }
    return <Main projectId={projectId} data-oid="jwtxbbu" />;
}
