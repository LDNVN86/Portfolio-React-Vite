import { useEffect } from "react";
const MyProject = () => {
  useEffect(() => {
    document.title = "Dự Án Mà Tôi Từng Làm";
  }, []);
  return (
    <>
      <div className="bg-cyan-50 shadow-md p-4 rounded-xl max-w-6xl mx-auto md:p-5 opacity-90 Content-Container-AGPSS">
        <div className="mb-3 flex text-3xl gap-2 font-bold">
          <div className="bg-neutral-800 h-[36px] w-2"></div>
          <h2>Project 📽️</h2>
        </div>
        <header className="mt-10">
          <div>
            <h1>Tôi Lười Kéo Dự Án Github Về Đây</h1>
          </div>
        </header>
      </div>
    </>
  );
};

export default MyProject;
