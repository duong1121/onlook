import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsBody, DocsPage } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { EditGitHub } from './edit-gh';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    const MDXContent = page.data.body;

    let filePath = '';
    if (page.file && typeof page.file === 'object' && 'path' in page.file) {
        const path = page.file.path as string;
        filePath = path.replace(/^.*?\/content\//, 'content/');
    }

    return (
        <DocsPage toc={page.data.toc} full={page.data.full} data-oid="xc0zqkf">
            <DocsBody data-oid="lnkafe3">
                <MDXContent
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(source, page),
                    })}
                    data-oid="vv:b.4h"
                />
            </DocsBody>
            <EditGitHub filePath={filePath} data-oid="hasdix3" />
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
