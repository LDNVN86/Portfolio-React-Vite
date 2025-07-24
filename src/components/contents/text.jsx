import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Text = () => {
  const custom = [
    "tôi đã rất cố gắng",
    "cuộc đời là 1 quãng đường dài",
    "tôi không giỏi, chỉ là tôi không từ bỏ",
    "cứ đi, rồi sẽ đến",
    "cố gắng không phải để hơn người khác, mà để không thua chính mình hôm qua",
    "tôi từng muốn bỏ cuộc, nhưng rồi nhớ lý do mình bắt đầu",
    "cuộc đời không phải là đích đến, mà là hành trình để hiểu chính mình",
    "mỗi người đều mang trong mình một hành trình mà không ai hiểu trọn vẹn được",
    "chúng ta không sống hai lần, nên hãy sống đủ sâu cho một lần",
    "tôi mỉm cười không phải vì tôi ổn, mà vì tôi đủ mạnh mẽ để đối diện",
    "im lặng đôi khi là cách tâm hồn nói lên điều mà lời nói bất lực",
    "không phải lúc nào cũng mạnh mẽ, chỉ là tôi không có lựa chọn nào khác",
    "có những ngày mỏi mệt, chỉ cần một câu 'ổn thôi' cũng đủ để sống tiếp",
    "cuộc sống giống như dòng sông – có đoạn chảy xiết, có đoạn lặng im",
    "thanh xuân không phải lúc nào cũng đẹp, nhưng nó thật",
  ];
  const [Dinamic, setDinamic] = useState(
    custom[Math.floor(Math.random() * custom.length)]
  );
  useEffect(() => {
    const CurrentText = setInterval(() => {
      setDinamic(custom[Math.floor(Math.random() * custom.length)]);
    }, 5000);
    return () => clearInterval(CurrentText);
  }, []);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          style={
            ({ fontFamily: "Poetsen One" },
            { fontWeight: "800" },
            { fontStyle: "nomal" })
          }
        >
          {Dinamic}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Text;
