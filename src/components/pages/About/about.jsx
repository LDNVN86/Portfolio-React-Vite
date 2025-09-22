import { useEffect } from "react";

import ContentAbout from "./StateAbout";

const MyAbout = () => {
  useEffect(() => {
    document.title = "Về Bản Thân Tôi";
  }, []);
  return (
    <>
      <div className="bg-cyan-50 shadow-md p-4 rounded-xl max-w-6xl mx-auto md:p-5 opacity-90  Content-Container-AGPSS">
        <div className="mb-3 flex text-3xl gap-2 font-bold">
          <div className="bg-neutral-800 h-[36px] w-2"></div>
          <h2>About ❔</h2>
        </div>

        <header className="flex mt-10 font-semibold md:grid grid-cols-2 sm:flex flex-col gap-x-4">
          <div>
            <div>
              <h1 className="text-xl font-mono">
                Tại Sao Tôi Lại Đi Nghành Lập Trình Viên?
              </h1>
              <div>
                <p className=" font-extralight">
                  🤌Tôi chọn ngành lập trình viên vì đây là công việc gắn liền
                  với sự sáng tạo, logic và công nghệ – những điều tôi luôn yêu
                  thích từ nhỏ. Thế giới số đang phát triển nhanh chóng, và lập
                  trình là chìa khóa mở ra cánh cửa tương lai. Tôi muốn tạo ra
                  những sản phẩm hữu ích, giúp giải quyết vấn đề trong cuộc sống
                  bằng công nghệ. Ngoài ra, lập trình mang lại cơ hội việc làm
                  rộng mở, thu nhập ổn định và khả năng làm việc toàn cầu. Quan
                  trọng hơn, mỗi dòng code tôi viết đều mang lại cảm giác chinh
                  phục và tự hào – cảm giác mà tôi khó tìm thấy ở bất kỳ ngành
                  nghề nào khác.
                </p>
              </div>
            </div>
            <div>
              <div>
                <h1 className="text-xl font-mono">
                  Hành Trình Học Lập Trình Của Mình NTN? 🤔
                </h1>
                <div>
                  <img
                    src={
                      "https://omghmofravozvmqvjtns.supabase.co/storage/v1/object/public/ldn86dev/Elaina.jpg"
                    }
                    className="drag-none size-40 sm:size-44 md:size-48 lg:size-60 float-right mb-1 ml-2 select-none rounded-md border-4 border-pink-600/50 "
                  />
                  <p className="font-extralight">
                    Bước đầu của mình là từ lớp 11 thì trường mình có dạy{" "}
                    <span>
                      <a
                        href="https://vi.wikipedia.org/wiki/Pascal_(ng%C3%B4n_ng%E1%BB%AF_l%E1%BA%ADp_tr%C3%ACnh)"
                        className="text-inherit text-red-800"
                        target="_blank"
                      >
                        ngôn ngữ lập trình Pascal.
                      </a>{" "}
                    </span>
                    Khi lên 12 thì không còn học nữa mình tập trung vào thi tốt
                    nghiệp. Sau khi thi xong mình bắt đầu học lập trình lại từ{" "}
                    <span>
                      <a
                        href="https://vi.wikipedia.org/wiki/C%2B%2B"
                        className="text-inherit text-red-800"
                        target="_blank"
                      >
                        ngôn ngữ C/C++
                      </a>{" "}
                    </span>{" "}
                    sau khi học 1 lượng kiến thức ổn định thì mình chuyển sang
                    lập trình hướng đối tượng và mình lựa chọn{" "}
                    <span>
                      <a
                        href="https://vi.wikipedia.org/wiki/Java_(ng%C3%B4n_ng%E1%BB%AF_l%E1%BA%ADp_tr%C3%ACnh)"
                        className="text-inherit text-red-800"
                        target="_blank"
                      >
                        JAVA
                      </a>{" "}
                    </span>{" "}
                    để học (OOP). Sau đó thì mình chuyển sang cấu trúc dữ liệu
                    và giải thật (
                    <span>
                      <a
                        href="https://vi.wikipedia.org/wiki/C%E1%BA%A5u_tr%C3%BAc_d%E1%BB%AF_li%E1%BB%87u"
                        className="text-inherit text-red-800"
                        target="_blank"
                      >
                        DSA
                      </a>{" "}
                    </span>
                    ) mình giải bài trên LeetCode, HackerRank và CodeForce. Sau
                    đó mình chuyển sang hướng Full-Stack và trang web này là 1
                    trong quá trình học của mình.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="  bg-cyan-50 ">
              <ContentAbout />
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default MyAbout;
