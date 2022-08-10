// @mui
import { Stack, Button, Typography, Modal, Box, Link } from '@mui/material';
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
import Connect2Phantom from '../../../components/PhantomProvider';
import { deleteCookie, getCookie } from 'cookies-next';

// ----------------------------------------------------------------------
export default function NavbarDocs() {
  const jwt = getCookie('jwt-token');
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

  const logOut = () => {
    deleteCookie('jwt-token');
    deleteCookie('jwt-token-exp');
    deleteCookie('current-chain');
    router.reload();
  }

  // @ts-ignore
  return (
    <Stack
      spacing={2}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <Box textAlign="center">

        {jwt !== undefined ?
          <Box>
            <Link onClick={logOut} color='#212B36' target="_blank" rel="noopener" underline="always">
              <Typography sx={{ color: '#637381', fontSize: 14, textAlign: 'center' }}>
                Log Out
              </Typography>
            </Link>
          </Box>
          :
          <Button  onClick={redirectToAuth} variant="contained" sx={{ width:'200px', color: 'black', backgroundColor: '#DDFF55', ':hover': { opacity: '1', backgroundColor: '#DDFF55' } }}>Go to your collection</Button>

        }

      </Box>
    </Stack>
  );
}
