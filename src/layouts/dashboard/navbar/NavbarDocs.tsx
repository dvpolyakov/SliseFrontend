// @mui
import { Stack, Button, Typography, Modal, Box } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useLocales from '../../../hooks/useLocales';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';
import { useState } from 'react';
import UploadCollection from '../../../components/uploadModal';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { translate } = useLocales();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '440px',
    height: '432px',
    bgcolor: '#FFFFFF',
    p: 3,
    borderRadius: '25px'
  };

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <Box textAlign="center">

        <Button onClick={handleOpen} variant="contained" sx={{ color: 'black', backgroundColor: '#DDFF55', ':hover': { opacity: '.6', backgroundColor: '#DDFF55' } }}>Add Your Collection</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <UploadCollection close={handleClose} />
          </Box>
        </Modal>
      </Box>
    </Stack>
  );
}
