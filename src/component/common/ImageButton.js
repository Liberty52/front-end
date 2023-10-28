import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 5px;
  border-radius: 50%;
`;

const Image = styled.img`
  width: ${(props) => (props.width ? props.width : '30px')};
`;

export default function ImageButton({ src, onClick, width }) {
  return (
    <StyledButton
      type='button'
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <Image width={width} src={src} />
    </StyledButton>
  );
}
