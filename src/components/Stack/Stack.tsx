function Stack(props: any) {
  return (
    <div
      style={{
        position: "relative",
        height: "200px",
        width: "100%",
        objectFit: "cover",
      }}>
      {props.children}
    </div>
  );
}

export default Stack;
