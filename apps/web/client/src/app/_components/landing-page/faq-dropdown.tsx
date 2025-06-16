import { useState } from 'react';
import { Icons } from '@onlook/ui/icons/index';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQDropdownProps {
    faqs: FAQ[];
}

export function FAQDropdown({ faqs }: FAQDropdownProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-1 w-full" data-oid="-bkgxu:">
            {faqs.map((faq, idx) => (
                <div key={faq.question} className="px-0 py-6" data-oid=".jggqq5">
                    <button
                        className="flex items-center justify-between w-full text-left text-foreground-primary text-lg focus:outline-none cursor-pointer py-2"
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        aria-expanded={openIndex === idx}
                        data-oid="23mgq9d"
                    >
                        <span data-oid="sl0ga3.">{faq.question}</span>
                        <span className="ml-4 flex items-center" data-oid="i80fnqs">
                            {openIndex === idx ? (
                                <Icons.Minus
                                    className="w-6 h-6 text-foreground-primary transition-transform duration-200"
                                    data-oid="0m.pmpp"
                                />
                            ) : (
                                <Icons.Plus
                                    className="w-6 h-6 text-foreground-primary transition-transform duration-200"
                                    data-oid="pio00i-"
                                />
                            )}
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}
                        style={{ pointerEvents: openIndex === idx ? 'auto' : 'none' }}
                        data-oid="dii7obj"
                    >
                        <p
                            className="text-foreground-secondary text-regular leading-relaxed"
                            data-oid="0lx3q7."
                        >
                            {faq.answer}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
