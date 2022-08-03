// @mui
import { Stack, Button, Typography, Modal, Box } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useLocales from '../../../hooks/useLocales';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';
import { useCallback, useMemo, useState } from 'react';
import UploadCollection from '../../../components/uploadModal';
import { ethers } from 'ethers';
import Web3 from 'web3';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useRouter } from 'next/router';
import Connect2Phantom from '../../../components/Connect2Phantom';


// ----------------------------------------------------------------------
export default function NavbarDocs() {
  const isMountedRef = useIsMountedRef();
  const [web3interface, setWeb3Interface] = useState("ethers");
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpenAddCollection = () => setOpen(true);
  const handleCloseAddCollection = () => setOpen(false);
  const handleOpenConnectWallet = () => setOpen(true);
  const handleCloseConnectWallet = () => setOpen(false);
  const router = useRouter();

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

  const redirectToAuth = async () => {
   await router.push('auth/login');
  }

  // @ts-ignore
  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <Box textAlign="center">

        <Button onClick={handleOpenConnectWallet} variant="contained" sx={{ color: 'black', backgroundColor: '#DDFF55', ':hover': { opacity: '.6', backgroundColor: '#DDFF55' } }}>Add Your Collection</Button>
        <div></div>
         <Modal
          open={open}
          onClose={handleCloseAddCollection}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <UploadCollection close={handleCloseAddCollection} />
          </Box>
        </Modal>


        <Button onClick={redirectToAuth} variant="contained" sx={{ color: 'black', backgroundColor: '#DDFF55', ':hover': { opacity: '.6', backgroundColor: '#DDFF55' } }}>Login</Button>
      </Box>
    </Stack>
  );
}
