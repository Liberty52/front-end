import { Box, Modal, Typography, Button } from '@mui/material';

const PreviewLicense = ({ optionItems, onHandleImg, open, handleClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          라이센스 이미지
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {optionItems?.map((optionItem) => {
            return (
              <div key={optionItem.id} style={{ display: 'flex', width: '400px', height: '300px' }}>
                <label>
                  <input type='radio' name='test' />
                  <img
                    src={optionItem.artUrl}
                    alt={optionItem.artName}
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      onHandleImg(optionItem.id, e.target.src);
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </label>
              </div>
            );
          })}
        </Typography>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleClose}>확인</Button>
      </Box>
    </Modal>
  );
};
export default PreviewLicense;
