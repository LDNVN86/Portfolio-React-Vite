import { useState } from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const MyStatus = ({ Status, TimesetDate }) => {
  const customStatus = Status?.activities?.find((a) => a?.type === 4);
  const Spotify = Status?.activities?.find((a) => a?.type === 2);
  const Playing = Status?.activities?.find((a) => a?.type === 0);

  const CheckStatus = Status?.discord_status;
  const Activity = Status?.activities;
  const CurrentStatus = (Check) => {
    switch (Check) {
      case "dnd":
        return (
          <>
            <h1 className="text-red-300">Đang Bận Gì Rồi</h1>
          </>
        );
      case "idle":
        return <h1 className="text-yellow-300"> Có Thể Là Đang Chill</h1>;

      case "online":
        return <h1 className="text-green-300">Đang Hoạt Động</h1>;
      case "offline":
        return <h1 className="text-gray-300">Đang Offline</h1>;
      default:
        return <h1 className="text-red-600">Đang Tải...</h1>;
    }
  };
  const PingStatus = (Check) => {
    switch (Check) {
      case "dnd":
        return (
          <>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
          </>
        );

      case "idle":
        return (
          <>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-yellow-500"></span>
            </span>
          </>
        );

      case "online":
        return (
          <>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
          </>
        );
      case "offline":
        return (
          <>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
          </>
        );
      default:
        return <h1>Đang Tải</h1>;
    }
  };
  const replaceChar = (data) => data?.replace(/"/g, "");
  const [isHoverStatus, setHoverStatus] = useState(false);
  return (
    <Tippy
      className="w-full h-full "
      content={
        Status && (
          <div className="flex w-full h-full flex-col">
            <div className="flex flex-row gap-1 font-mono ">
              Current Status:{CurrentStatus(CheckStatus)}
            </div>
            <div>
              {Status?.discord_user?.display_name && (
                <div className="font-mono">
                  Name Global: {replaceChar(Status.discord_user.display_name)}
                </div>
              )}
              {Activity && Activity.length > 0 && (
                <div className="space-y-2">
                  {Activity.map((item) => {
                    switch (item.type) {
                      case 0:
                        return (
                          <div key={item.id}>
                            <strong>Đang Chơi:</strong>
                            <li>
                              {item.name}{" "}
                              <span className="font-mono">{TimesetDate}</span>
                            </li>
                          </div>
                        );
                      case 2:
                        return Status?.spotify?.song ? (
                          <div key={item.id}>
                            <strong>Đang Nghe Nhạc Trên Spotify:</strong>
                            <ul>
                              <li>Bài hát: {Status.spotify.song}</li>
                              {Status.spotify.artist && (
                                <li>Nghệ sĩ: {Status.spotify.artist}</li>
                              )}
                              {Status.spotify.album && (
                                <li>Album: {Status.spotify.album}</li>
                              )}
                            </ul>
                          </div>
                        ) : null;
                      case 4:
                        return (
                          <div key={item.id}>
                            <strong>Custom Status:</strong>
                            <div>{item.state || "Không có mô tả."}</div>
                          </div>
                        );
                      default:
                        return (
                          <div key={item.id}>
                            <strong>Hoạt động khác:</strong> {item.name}
                          </div>
                        );
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        )
      }
      visible={isHoverStatus}
      placement="bottom"
      animation="scale"
    >
      <div
        className="flex flex-row items-center gap-2"
        onMouseEnter={() => setHoverStatus(true)}
        onMouseLeave={() => setHoverStatus(false)}
      >
        <span>{PingStatus(CheckStatus)}</span>Thanh Trạng Thái
      </div>
    </Tippy>
  );
};
export default MyStatus;
