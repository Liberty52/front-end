import './ImageInput.css';
import Button from './Button';
import plus from '../image/icon/plus.png';
import { useState } from 'react';

export default function ImageInput(props) {
  const [imgFile, setImgFile] = useState(props.image);

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
              const img = e.target.parentNode.children[1].children[1];
              img.src = imgFile;
              const label = e.target.parentNode;
              label.classList.add('value');
            };
          }
        }}
      />
      <div className="image-crop">
        <Button
          type="button"
          text="삭제"
          onClick={e => {
            const label = e.target.parentNode.parentNode;
            const input = label.children[0];
            input.value = '';
            setImgFile(undefined);
            label.classList.remove('value');
          }}
        />
        <img
          className="image-preview"
          src={imgFile ? imgFile : plus}
          alt={props.alt}
        />
      </div>
    </label>
  );
}
