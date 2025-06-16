import React from 'react';

interface TestimonialCardProps {
    text: string;
    name: string;
    label: string;
    // Optionally, you could add a profileImage prop for real images
    // profileImage?: string;
    profileColor?: string; // For placeholder avatar color
}

export function TestimonialCard({
    text,
    name,
    label,
    profileColor = '#222',
}: TestimonialCardProps) {
    return (
        <div
            className="bg-background-onlook border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[160px] shadow-md hover:shadow-lg transition-shadow duration-200"
            data-oid="ijgmnru"
        >
            <div className="text-foreground-primary text-regular mb-6" data-oid="wz6v97c">
                {text}
            </div>
            <div className="flex items-center gap-3 mt-auto" data-oid="e9_4wh1">
                {/* Placeholder for profile picture */}
                <div
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                    style={{ background: profileColor }}
                    data-oid="r3_y.7q"
                >
                    {/* Optionally, initials or icon */}
                </div>
                <div className="flex flex-col" data-oid="zu61_ku">
                    <span className="text-foreground-secondary text-small" data-oid="kts6nlz">
                        {name}
                    </span>
                    <span className="text-foreground-secondary text-small" data-oid="q6_0qaf">
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );
}
