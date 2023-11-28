import { Box, Modal } from '@mui/material';

const PreviewLicense = ({ optionItems, onHandleImg, open, handleClose }) => {
  console.log(optionItems);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box>
        {optionItems?.map((optionItem) => {
          return (
            <div key={optionItem.id} style={{ width: '300px', height: '150px' }}>
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
            </div>
          );
        })}
      </Box>
    </Modal>
  );
};
export default PreviewLicense;
