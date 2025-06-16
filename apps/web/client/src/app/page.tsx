'use client';

import { AuthModal } from './_components/auth-modal';
import { Hero } from './_components/hero';
import { ContributorSection } from './_components/landing-page/contributor-section';
import { Footer } from './_components/landing-page/page-footer';
import { TopBar } from './_components/top-bar';

export default function Main() {
    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center relative overflow-x-hidden"
            data-oid="9t1.20c"
        >
            <div
                className="fixed top-0 left-0 w-full h-12 bg-background/80 backdrop-blur-sm z-50"
                data-oid="h4-:aqj"
            >
                <TopBar data-oid="j4j9r-t" />
            </div>
            <div className="w-screen h-screen flex items-center justify-center" data-oid="ywl4l4_">
                <Hero data-oid="rwfg7xz" />
            </div>

            {/* <FeaturesSection /> */}
            {/* <CodeOneToOneSection /> */}
            {/* <TestimonialsSection /> */}
            {/* <CTASection /> */}
            <ContributorSection data-oid="n9-6l_e" />
            {/* <FAQSection /> */}
            {/* <WhatCanOnlookDoSection /> */}
            <Footer data-oid="cbvprv:" />
            <AuthModal data-oid="u28k:w9" />
        </div>
    );
}
