// 상품 소개
export default function Introduction({ introductionImageUrl }) {
  return introductionImageUrl ? (
    <img src={introductionImageUrl} alt='상품 정보' style={{ width: '100%' }} />
  ) : (
    <div style={{ textAlign: 'center' }}>상품 정보가 없습니다</div>
  );
}
