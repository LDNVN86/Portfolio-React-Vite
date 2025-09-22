import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const imageAva = {
  img1: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/AOV.png",
  img2: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Genshin.png",
  img3: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Honkai.png",
  img4: "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Wuwa.png",
};

const GmArray = [
  { id: "1", img: imageAva.img2, Name: "Genshin Impact" },
  { id: "2", img: imageAva.img3, Name: "Honkai Star Rail" },
  { id: "3", img: imageAva.img4, Name: "Wuthering Wave" },
  { id: "4", img: imageAva.img1, Name: "Liên Quân Mobile" },
];

const GameGallery = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-1">
      {GmArray.map((item) => (
        <div
          key={item.id}
          className="bg-cyan-50 rounded-2xl shadow hover:shadow-lg transition p-4 text-center"
        >
          <a
            data-fancybox="gallery"
            href={item.img}
            aria-label={item.Name}
            data-caption={item.Name}
          >
            <img
              src={item.img}
              alt={`Ảnh ${item.Name}`}
              className="w-full h-50 object-cover rounded-xl mb-3 hover:scale-105 transition-transform cursor-zoom-in"
            />
          </a>
          <div className="text-lg font-semibold">{item.Name}</div>
        </div>
      ))}
    </div>
  );
};

export default GameGallery;
