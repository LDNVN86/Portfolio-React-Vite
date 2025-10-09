import { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const GALLERY_IMAGE =
  "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Nekozane.jpg";

const ContentAbout = ({ items = [], imageAlt = "" }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex((previous) => (previous === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const entryId = item.id ?? `about-item-${index}`;
        return (
          <div
            key={entryId}
            className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sm"
          >
            <button
              type="button"
              onClick={() => handleClick(index)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--surface-strong)]"
            >
              <span>{item.title}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FaArrowAltCircleDown className="text-[var(--accent-color)]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden border-t border-[var(--surface-border)] bg-[var(--surface-strong)]"
                >
                  <p className="px-4 py-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <div className="overflow-hidden rounded-3xl border-4 border-[var(--accent-soft)]">
        <img
          src={GALLERY_IMAGE}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          width="640"
          height="640"
        />
      </div>
    </div>
  );
};

export default ContentAbout;
