import { FixedSizeList as List } from "react-window";

// Component để render 1 dòng (ảnh hoặc video)
function Row({ index, style, data }) {
  const item = data[index];
  if (item.endsWith(".mp4")) {
    return (
      <div style={style}>
        <video src={item} width={300} controls preload="none" />
      </div>
    );
  }
  return (
    <div style={style}>
      <img src={item} width={180} loading="lazy" />
    </div>
  );
}

export default function VirtualMediaList() {
  // Import tự động toàn bộ ảnh/video
  const images = import.meta.glob("../assets/*.{jpg,png}", {
    eager: true,
    import: "default",
  });
  const videos = import.meta.glob("../assets/*.mp4", {
    eager: true,
    import: "default",
  });

  // Gộp thành 1 list
  const mediaList = [...Object.values(images), ...Object.values(videos)];

  // Nếu không có media, return null hoặc Loading
  if (!mediaList.length) return <div>No media found</div>;

  return (
    <List
      height={600}
      itemCount={mediaList.length}
      itemSize={200}
      width={400}
      itemData={mediaList} // truyền mediaList cho Row qua prop "data"
    >
      {Row}
    </List>
  );
}
