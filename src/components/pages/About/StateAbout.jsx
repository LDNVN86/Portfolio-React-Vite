import { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ContentAbout() {
  const [isOpen, setIsOpen] = useState(null);

  const data = [
    {
      id: "1",
      title: "Trường Tôi Từng Học",
      content: `Tôi Đã Học Mọi Loại Trường Trên Thế Giới 🐧🐧`,
    },
    {
      id: "2",
      title: "Công Việc Của Tôi",
      content: `Hiện Tại Tôi Vẫn Đang Học Đại Học Và Thường Code Dạo Vài Dự Án Nhỏ`,
    },
  ];

  const HandleClick = (id) => {
    //mở đồng bộ cái này mở thì cái kia(nếu đang mở) đóng
    setIsOpen((prevId) => (prevId === id ? null : id));
    //mở không đồng bộ
    // setIsOpen((prev) => ({
    //   ...prev,
    //   [id]: !prev[id] ? !prev[id] : !prev[id],
    // }));
  };

  return (
    <>
      <div className="flex flex-col gap-2 mt-5">
        {data.map((item) => {
          return (
            <div key={item.id} className=" flex flex-col">
              <h2 className=" bg-cyan-200  rounded-lg p-0">
                <button
                  type="button"
                  onClick={() => HandleClick(item.id)}
                  className="flex justify-between items-center w-full p-5 "
                >
                  <span>{item.title}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 flex justify-between ${
                      isOpen === item.id ? "-rotate-180" : ""
                    }`}
                  >
                    <FaArrowAltCircleDown />
                  </svg>
                </button>
              </h2>

              <AnimatePresence initial={false}>
                {isOpen === item.id && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden bg-cyan-100 rounded-xl"
                  >
                    <div className="p-5 border border-b-0">
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <img
          src={
            "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Nekozane.jpg"
          }
        ></img>
      </div>
    </>
  );
}
