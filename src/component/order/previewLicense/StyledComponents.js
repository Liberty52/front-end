import styled from 'styled-components';
import { Box } from '@mui/system';

export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 16px;
`;

export const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: box-shadow 0.3s;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    transform-origin: center center;
  }

  .check-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    color: blue;
    background-color: white;
    border-radius: 50%;
    padding: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;
