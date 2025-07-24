import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Ava1 from "../../../assets/Genshin.png";
import Ava2 from "../../../assets/Honkai.png";
import Ava3 from "../../../assets/Wuwa.png";
import Ava4 from "../../../assets/AOV.png";

const GmArray = [
  { id: "1", img: Ava1, Name: "Genshin Impact" },
  { id: "2", img: Ava2, Name: "Honkai Star Rail" },
  { id: "3", img: Ava3, Name: "Wuthering Wave" },
  { id: "4", img: Ava4, Name: "Liên Quân Mobile" },
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
