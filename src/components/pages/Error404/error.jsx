import { useEffect } from "react";
import { Link } from "react-router-dom";
const Error404 = () => {
  useEffect(() => {
    document.title = "Error 404";
  });
  return (
    <>
      <div className="bg-cyan-50 shadow-md p-4 rounded-xl max-w-6xl mx-auto md:p-5 opacity-90">
        <div className="flex flex-col gap-4 bg-cyan-50 rounded-xl justify-center h-96 w-full items-center text-center">
          <div className="font-mono size-10 text-4xl w-full">ERROR 404</div>
          <Link to={"/about"} className="font-mono">
            Quay Lại Trang Chủ
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
