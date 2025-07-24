import MaoMao from "../../../assets/Maomao.jpg";
import { useEffect } from "react";

const MySpace = () => {
  useEffect(() => {
    document.title = "Không Gian Làm Việc";
  }, []);
  return (
    <>
      <div className="bg-cyan-50 p-4 shadow-md rounded-xl max-w-6xl mx-auto md:p-5 opacity-90 Content-Container-AGPSS">
        <div className="mb-3 flex text-3xl gap-2 font-bold">
          <div className="bg-neutral-800 h-[36px] w-2"></div>
          <h2>Space 💻</h2>
        </div>
        <header className="mt-10">
          <div>
            <div
              className="w-full mt-4 grid md:grid-cols-2 grid-cols-1 gap-5"
              bis_skin_checked="1"
            >
              <div bis_skin_checked="1">
                <div
                  className="mb-4 p-2 rounded-xl bg-cyan-200"
                  bis_skin_checked="1"
                >
                  <h4 className="mb-1 text-2xl font-bold">
                    Laptop{" "}
                    <span className="text-xl ml-2 inline-block">
                      (MSI Bravo 15 Version: C7VFK)
                    </span>
                  </h4>
                  <ul className="list-disc text-sm ml-6">
                    <li>
                      CPU: AMD Ryzen 7 7735HS (8 nhân, 16 luồng, xung nhịp cơ
                      bản 3.2GHz)
                    </li>
                    <li>GPU: NVIDIA GeForce RTX 4060 Laptop GPU 8GB GDDR6</li>
                    <li>RAM: 16GB DDR5-5200MHz</li>
                    <li>Disk: : 1TB SSD NVMe</li>
                    <li>
                      Màn: 115.6" Full HD (1920x1080), tấm nền IPS, tần số quét
                      144Hz
                    </li>
                    <li>OS: Windows 11 Home</li>
                  </ul>
                </div>
                <div
                  className="p-2 rounded-xl bg-cyan-200"
                  bis_skin_checked="1"
                >
                  <h4 className="mb-1 text-2xl font-bold">Phone</h4>
                  <ul className="list-disc text-sm ml-6">
                    <li>Redmi Note 11</li>
                    <li>CPU: Snapdragon 680 (6nm)</li>
                    <li>RAM: 4GB/6GB</li>
                    <li>Disk: UFS 2.2 64GB/128GB</li>
                    <li>Màn: AMOLED 6.43" FHD+, 90Hz</li>
                    <li>OS: Android 11/12 (MIUI 13)</li>
                    <li>Camera: 13 MP (f/2.4)</li>
                    <li>Pin, sạc: 5000mAh (sạc nhanh 33W)</li>
                  </ul>
                </div>
              </div>
              <div bis_skin_checked="1">
                <div
                  className="mb-4 p-2 rounded-xl bg-cyan-200"
                  bis_skin_checked="1"
                >
                  <h4 className="mb-1 text-2xl font-bold">Mạng</h4>
                  <ul className="list-disc text-sm ml-6">
                    <li>Mạng 5G: Viettel</li>
                    <li>Tốc độ download: 50MB/s</li>
                    <li>Tốc độ upload: 2MB/s</li>
                  </ul>
                </div>
                <div
                  className="p-2 rounded-xl bg-cyan-200"
                  bis_skin_checked="1"
                >
                  <h4 className="mb-1 text-2xl font-bold">Thiết Bị Khác</h4>
                  <ul className="list-disc text-sm ml-6">
                    <li>Chuột: Logitech G304 LightSync</li>
                    <li>Thiết Bị Ngoài: USB 8GB, HUB USB 3.0,...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="my-6 border-dashed border-8 border-cyan-500 rounded-3xl overflow-hidden w-11/12 rotate-[355deg] mx-auto">
          <img src={MaoMao}></img>
        </div>
      </div>
    </>
  );
};

export default MySpace;
