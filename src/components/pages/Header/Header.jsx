import IconHomePage from "./icon";
import User from "../../../APIs/users";
import Text from "../../contents/text";

const Hearder = () => {
  const TextWriter = `Tôi Chỉ Là Một Coder Lod Thuộc Mảng Dev. 
    Bạn Muốn Xem Thông Tin Về Tôi? Tất Cả Về Tôi Đều Ở Bên Dưới!!`;
  return (
    <>
      <div className="flex flex-col gap-5 opacity-90 Bio-Container-111">
        <div className="mx-auto w-full bg-cyan-50 overflow-hidden rounded-xl shadow-md custom:max-w-full Bio-Container">
          <div className="w-full custom:max-w-7xl custom:mx-auto overflow-hidden rounded-xl ">
            <div className="md:flex Bio-contents-container">
              <div className="md:shrink-0 flex Bio-Ava">
                <img
                  className="  w-full object-cover mx-auto md:h-full md:w-48"
                  alt="Profile"
                  src={
                    "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Ava.jpg"
                  }
                />
              </div>
              <div className="w-full p-[10px] Bio-content-title">
                <div className="mt-1 block text-2xl leading-tight font-medium text-black hover:underline Bio-Personal">
                  Hello, Mình là{" "}
                  <span className="text-indigo-600 Bio-Name">
                    Seno Impotent
                  </span>
                  <div className="w-full h-1 bg-cyan-500 rounded-sm my-1"></div>
                </div>
                <div className="font-mono flex flex-wrap">
                  <div className=" text-gray-500 " id="Typewriter">
                    {TextWriter}
                    <strong>
                      <Text></Text>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Bio-Status-Location mt-4 flex flex-col gap-3">
            <div className="My-Status flex items-center gap-2">
              <span className="">
                <User></User>
              </span>
            </div>
          </div>
          <div className=" fa-icon-container">
            <IconHomePage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hearder;
