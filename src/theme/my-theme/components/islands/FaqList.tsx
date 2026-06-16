import { useState } from 'react';

type FaqItem = {
  question?: string;
  answer?: string;
};

export default function FaqList({ items = [] }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-aq-gray-200 border-y border-aq-gray-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans font-semibold text-aq-gray-900"
            >
              <span>{item.question}</span>
              <span className="ml-4 shrink-0 text-2xl leading-none text-aq-primary">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <p className="pb-5 font-sans leading-relaxed text-aq-gray-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
