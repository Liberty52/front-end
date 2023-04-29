import './ImageInput.css';
import Image from './Image';
import plus from '../image/icon/plus.png';
import { useState } from 'react';

export default function ImageInput(props) {
  const [imgFile, setImgFile] = useState(props.image ? props.image : plus);
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
              event.target.parentNode.children[1].children[0].src = imgFile;
            };
          }
        }}
      ></input>
      <Image image={imgFile} />
    </label>
  );
}
