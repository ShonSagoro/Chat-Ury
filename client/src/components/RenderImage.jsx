import { useEffect, useState } from "react";

function RenderImage(props) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [props.blob]);

  return (
    <img className="w-72 h-auto" src={imageSrc} alt={props.fileName}></img>
  );
}

export default RenderImage;
