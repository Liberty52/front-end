import React from 'react';
import { Modal, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { StyledModalBox, StyledLabel, ImagesContainer, ButtonContainer } from './StyledComponents';

const PreviewLicense = ({ optionItems, onHandleImg, open, handleClose }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <StyledModalBox>
        <Typography variant='h6' component='h2'>
          라이센스 이미지
        </Typography>
        <ImagesContainer>
          {optionItems?.map((optionItem) => {
            const isSelected = selectedOption === optionItem.id;

            return (
              <StyledLabel key={optionItem.id} isSelected={isSelected}>
                <input
                  type='radio'
                  name='test'
                  checked={isSelected}
                  onChange={() => setSelectedOption(optionItem.id)}
                />
                <img
                  src={optionItem.artUrl}
                  alt={optionItem.artName}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  onClick={(e) => {
                    setSelectedOption(optionItem.id);
                    onHandleImg(optionItem.id, e.target.src);
                  }}
                />
                <CheckIcon className='check-icon' />
              </StyledLabel>
            );
          })}
        </ImagesContainer>
        <ButtonContainer>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>확인</Button>
        </ButtonContainer>
      </StyledModalBox>
    </Modal>
  );
};

export default PreviewLicense;
