import './Image.css';
import photo from '../../image/icon/photo.png';

export default function SquareImage(props) {
  return (
    <div className='image-square'>
      <img
        className='image-preview'
        src={props.image ? props.image : photo}
        onClick={props.onClick ? (e) => props.onClick(e) : () => {}}
        alt={props.alt}
      />
    </div>
  );
}
