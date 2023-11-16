import React, { useState } from "react";

function Image({ src, style, status, imageStyle }) {
  const [loading, setLoading] = useState(false);
  return (
    <div style={style} className="custom-image">
      {status && <div className="custom-image-badge" />}
      <img
        className="custom-image-img"
        src={src}
        style={imageStyle}
        onLoadStart={() => setLoading(false)}
        onLoad={() => setLoading(true)}
      />
    </div>
  );
}

export default Image;
