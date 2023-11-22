import photoNotFound from '../../image/icon/photo-not-found.svg';

export default function ProductImage({ productInfo }) {
  return (
    <div className='product'>
      <div className='product-image'>
        <img
          style={{ width: !productInfo.pictureUrl && '50%' }}
          src={productInfo.pictureUrl ? productInfo.pictureUrl : photoNotFound}
          alt='제품 이미지'
        />
      </div>
    </div>
  );
}
