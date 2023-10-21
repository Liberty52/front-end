import "./Image.css";
import photo from "../../image/icon/photo.png";

export default function Image(props) {
  return (
    <div className="image-crop" style={{ borderRadius: "50%" }}>
      <img
        style={{
          width: "100%",
        }}
        className="image-preview"
        src={props.image ? props.image : photo}
        onClick={props.onClick ? (e) => props.onClick(e) : () => {}}
        alt={props.alt}
      />
    </div>
  );
}
