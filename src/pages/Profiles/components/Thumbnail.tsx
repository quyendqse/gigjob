interface ThumbnailProps {
  image: string;
}

function Thumbnail(props: ThumbnailProps) {
  return (
    <img
      src={props.image}
      draggable={"false"}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "16px",
      }}
      alt=""
    />
  );
}

export default Thumbnail;
