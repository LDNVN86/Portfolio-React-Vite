import { useEffect } from "react";
import GameGallery from "./gameArray";

const MyGame = () => {
  useEffect(() => {
    document.title = "Game Tôi Chơi";
  }, []);
  return (
    <>
      <div className="bg-cyan-50 shadow-md p-4 rounded-xl max-w-6xl mx-auto md:p-5 opacity-90 Content-Container-AGPSS">
        <div className="mb-3 flex text-3xl gap-2 font-bold">
          <div className="bg-neutral-800 h-[36px] w-2"></div>
          <h2>Game 🎮</h2>
        </div>
        <div>Đây Là Tất Cả Game Mình Chơi Cho Đến Hiện Tại</div>
        <header className="mt-10">
          <div>
            <GameGallery></GameGallery>
          </div>
        </header>
      </div>
    </>
  );
};

export default MyGame;
