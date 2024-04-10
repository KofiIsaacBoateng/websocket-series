import React, { useState } from "react";

function Image({ src, style }) {
  const [loading, setLoading] = useState(false);
  return (
    <img
      src={src}
      style={style}
      onLoadStart={() => setLoading(false)}
      onLoad={() => setLoading(true)}
    />
  );
}

export default Image;
