import './ImageInput.css';
import Button from './Button';
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
        onChange={e => {
          const file = e.currentTarget.files[0];
          if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setImgFile(reader.result);
              e.target.parentNode.children[1].children[1].src = imgFile;
            };
          }
        }}
      />
      <div className="image-crop">
        <Button
          type="button"
          text="삭제"
          onClick={e => {
            e.target.parentNode.parentNode.children[0].value = '';
            setImgFile(plus);
          }}
        />
        <img className="image-preview" src={imgFile} alt={props.alt} />
      </div>
    </label>
  );
}
