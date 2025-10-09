import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const imageAva = {
  img1: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/AOV.png",
  img2: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Genshin.png",
  img3: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Honkai.png",
  img4: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Wuwa.png",
};

const GAME_ITEMS = [
  { id: "1", img: imageAva.img2, name: "Genshin Impact" },
  { id: "2", img: imageAva.img3, name: "Honkai Star Rail" },
  { id: "3", img: imageAva.img4, name: "Wuthering Wave" },
  { id: "4", img: imageAva.img1, name: "Liên Quân Mobile" },
];

const GameGallery = ({ imageAltPrefix = "Artwork" }) => {
  useEffect(() => {
    const selector = '[data-fancybox="gallery"]';

    Fancybox.bind(selector, {
      Thumbs: { autoStart: true },
      compact: false,
      Toolbar: {
        items: {
          left: ["infobar"],
          middle: [
            "zoomIn",
            "zoomOut",
            "toggle1to1",
            "rotateCCW",
            "rotateCW",
            "flipX",
            "flipY",
          ],
          right: ["slideshow", "thumbs", "close"],
        },
      },
    });

    return () => {
      Fancybox.unbind(selector);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {GAME_ITEMS.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 text-center shadow-sm transition hover:shadow-lg"
        >
          <a
            data-fancybox="gallery"
            href={item.img}
            aria-label={item.name}
            data-caption={item.name}
          >
            <img
              src={item.img}
              alt={`${imageAltPrefix} ${item.name}`}
              className="mb-3 h-44 w-full rounded-xl object-cover transition-transform hover:scale-[1.03] cursor-zoom-in"
              loading="lazy"
            />
          </a>
          <div className="text-lg font-semibold text-[var(--text-primary)]">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GameGallery;
