import { useState, useEffect, useRef } from "react";
import AudioHomePage from "../../assets/Audio.mp3";

const AudioModal = () => {
  const ID = ["9HbIb62aEZQ", "5kbk0b3DMSk", "Hq_Q9vSIg2M", "3O3eJ9j0ors"];
  const [showModal, setShowModal] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const [randomId, setRandomId] = useState(ID[0]);
  const audioRef = useRef(null);
  const playlistId = "PLTaxR39ggBO7wfVjUjCkcBmyzVcckvN-5";

  useEffect(() => {
    if (canPlay && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("Auto-play was prevented:", e);
      });
    }
  }, [canPlay]);

  const handleYes = () => {
    const index = Math.floor(Math.random() * ID.length);
    setRandomId(ID[index]);
    setCanPlay(true);
    setShowModal(false);
  };

  const handleNo = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="audio-modal-overlay">
          <div className="audio-modal fixed text-white rounded-xl z-10 bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p>Bạn Có Muốn Bật Nhạc Khi Đang Xem Thông Tin Về Tôi Không?? </p>
            <div className="audio-buttons">
              <button onClick={handleYes}>Có</button>
              <button onClick={handleNo}>Không</button>
            </div>
          </div>
        </div>
      )}
      {canPlay && (
        <iframe
          src={`https://www.youtube.com/embed/${randomId}?autoplay=1&list=${playlistId}`}
          width="1"
          height="1"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Nhạc nền"
          className="fixed"
        ></iframe>
      )}
      {/* <audio ref={audioRef} src={AudioHomePage} loop /> */}
    </>
  );
};

export default AudioModal;
