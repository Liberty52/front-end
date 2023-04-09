import './ImageInput.css';
import Image from './Image';
import photo from '../image/icon/photo.png';
import { useState } from 'react';

export default function ImageInput(props) {
  const [imgFile, setImgFile] = useState(props.image ? props.image : photo);
  const reader = new FileReader();
  return (
    <label className="image-input">
      <input
        className="image-input-input"
        type="file"
        name="file"
        accept="image/*"
        onChange={event => {
          const file = event.currentTarget.files[0];
          if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setImgFile(reader.result);
              document.querySelector('.image-preview').src = imgFile;
            };
          }
        }}
      ></input>
      <Image image={imgFile} />
    </label>
  );
}
