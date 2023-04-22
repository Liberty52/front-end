import './Image.css';
import photo from '../image/icon/photo.png';

export default function Image(props) {
  return (
    <div className="image-crop">
      <img
        className="image-preview"
        src={props.image ? props.image : photo}
        alt={props.alt}
      />
    </div>
  );
}
