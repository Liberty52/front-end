import './ImageInputGroup.css';
import Button from './Button';
import plus from '../../image/icon/plus.png';
import { useState } from 'react';

/**
 * 여러 개의 사진을 받을 때 사용하는 Component입니다.
 * @param imageUrls 기존 이미지 Url들 : String[]
 * @param addImageFile(file) 이미지 파일 추가될 때 실행될 함수
 * @param deleteImageFile(index) 이미지 파일 삭제될 떄 실행될 함수
 * @param deleteImageUrl(url) 기존 이미지 Url 삭제될 때 실행될 함수
 * @param num 한 줄에 보여줄 이미지의 개수 : int (기본값 5)
 * @param max 최대 이미지 개수 : int (기본값 10)
 * @returns
 */

export default function ImageInputGroup(props) {
  const defaultImageUrls = props.imageUrls ? props.imageUrls : [];
  const [imageUrls, setImageUrls] = useState(defaultImageUrls);
  const addImageFile = props.addImageFile ? props.addImageFile : () => {};
  const deleteImageFile = props.deleteImageFile ? props.deleteImageFile : () => {};
  const deleteImageUrl = props.deleteImageUrl ? props.deleteImageUrl : () => {};
  const num = props.num ? props.num : 5;
  const max = props.max ? props.max : 10;

  const images = [];
  let imageInputs = [];

  var i = 0;
  var until = max === imageUrls.length ? imageUrls.length : imageUrls.length + 1;
  while (i < until) {
    imageInputs = [];
    for (var index = i; index < i + num; index++) {
      if (imageUrls[index] === undefined) {
        if (imageUrls.length < max && index === imageUrls.length)
          imageInputs.push(<GroupImageInput nth={index} />);
        else imageInputs.push(<div className='image-crop hidden'></div>);
      } else {
        imageInputs.push(
          <GroupImageInput
            nth={index}
            image={imageUrls[index]}
            alt={'첨부 이미지 ' + index}
            readOnly
          />,
        );
      }
    }
    i = index;
    images.push(<div className='image-input-row'>{imageInputs}</div>);
  }

  /**
   * ImageInputGroup에서만 사용하는 ImageInput(!== Component/ImageInput.js)
   */
  function GroupImageInput(props) {
    const imageFile = props.image;
    const nth = props.nth;
    const alt = props.alt;
    const readOnly = props.readOnly;
    const reader = new FileReader();

    return (
      <label key={nth} className={imageFile ? 'image-input value' : 'image-input'}>
        <input
          className='image-input-input'
          type='file'
          name='file'
          accept='image/*'
          onClick={(e) => {
            if (readOnly) e.preventDefault();
          }}
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            if (file) {
              addImageFile(file);
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                setImageUrls([...imageUrls, reader.result]); // 이미지 추가
              };
            }
          }}
        />
        <div className='image-crop'>
          <Button
            type='button'
            text='삭제'
            onClick={() => {
              if (defaultImageUrls[nth]) {
                deleteImageUrl(defaultImageUrls[nth]);
                defaultImageUrls.splice(nth, 1);
              } else {
                deleteImageFile(nth - defaultImageUrls.length);
              }
              setImageUrls(
                imageUrls.filter((imageUrl, index) => index !== nth), // 이미지 삭제
              );
            }}
          />
          <img className='image-preview' src={imageFile ? imageFile : plus} alt={alt} />
        </div>
      </label>
    );
  }

  return (
    <div className='image-input-group'>
      {images}
      <span>
        ({imageUrls.length}/{max})
      </span>
    </div>
  );
}
