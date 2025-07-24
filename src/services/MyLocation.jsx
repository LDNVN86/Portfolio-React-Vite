import { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const MyLocation = ({ MyWeather }) => {
  const [isHoverWeather, setHoverWeather] = useState(false);
  return (
    <>
      <Tippy
        content={
          MyWeather ? (
            <>
              <p>
                <span className="">Thành phố:</span>{" "}
                {MyWeather?.name || "Không Rõ"}
              </p>
              <p>
                <span className="">Nhiệt độ:</span>{" "}
                {MyWeather?.main?.temp || "Không Rõ"}°C
              </p>
              <p>
                <span className="">Thời tiết:</span>{" "}
                {MyWeather?.weather?.[0]?.description || `Không Rõ`}
              </p>
            </>
          ) : (
            <div className="">Đang Tải</div>
          )
        }
        visible={isHoverWeather}
        placement="top"
        animation="scale"
      >
        <div
          className="flex flex-row item-center gap-2"
          onMouseEnter={() => setHoverWeather(true)}
          onMouseLeave={() => setHoverWeather(false)}
        >
          <span>
            <FaMapMarkedAlt />
          </span>
          Bình Thuận, Việt Nam!!
        </div>
      </Tippy>
    </>
  );
};

export default MyLocation;
