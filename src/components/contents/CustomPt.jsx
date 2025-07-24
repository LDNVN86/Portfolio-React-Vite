import { useState, useEffect } from "react";

const ClickTextEffect = () => {
  const [clicks, setClicks] = useState([]);
  const text = [
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

  const handleClick = (e) => {
    const RandomText = text[Math.floor(Math.random() * text.length)];
    const newClick = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      text: RandomText,
    };
    setClicks((prev) => [...prev, newClick]);
  };

  useEffect(() => {
    if (clicks.length === 0) return;

    const timer = setTimeout(() => {
      setClicks((prev) => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [clicks]);

  return (
    <div
      onClick={handleClick}
      style={{ position: "absolute", width: "100vw", height: "100vh" }}
    >
      {clicks.map(({ id, x, y, text }) => (
        <span
          key={id}
          style={{
            position: "fixed",
            top: y,
            left: x,
            pointerEvents: "none",
            userSelect: "none",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ff4d4d",
            animation: "fadeMoveUp 1s forwards",
          }}
        >
          {text}
        </span>
      ))}

      <style>{`
        @keyframes fadeMoveUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
};

export default ClickTextEffect;
