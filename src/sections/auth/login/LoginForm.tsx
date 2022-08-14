import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Connect2Phantom from '../../../hooks/usePhantom';
import useMetaMask from '../../../hooks/useMetamask';
import axiosInstance from '../../../utils/axios';

import { setCookie } from 'cookies-next';
import { styled } from '@mui/material/styles';
import NavItem from '../../../components/nav-section/horizontal/NavItem';
import usePhantom from '../../../hooks/usePhantom';
import { ethers } from 'ethers';
import { authUser } from '../../../utils/authUtils';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

const MetaMaskStyle = styled('button')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  variant: 'Contained',
  backgroundColor: '#1098FC',
  padding: theme.spacing(12, 0),
}));

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {

    // Asking if metamask is already present or not
    if (window.ethereum) {

      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (res) => {
          const sig = await signMessage({
            setError,
            message: res[0]
          });
          accountChangeHandler(res[0]);
        });
    } else {
    }
  };
  const getbalance = (address) => {

    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"]
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  const signMessage = async ({ setError, message }) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
      const whitelistId = await authUser(message, 'Ethereum');
      if(whitelistId) {
        localStorage.setItem('whitelistId', whitelistId);
        await router.push('/project-info');
      }
      await router.push('/dashboard');

      return {
        message,
        signature,
        address
      };
    } catch (err) {
      setError(err.message);
    }
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    // Setting a balance
    getbalance(account);
  };
  const {
    walletAvail,
    provider,
    connected,
    pubKey,
    connectHandler,
    disconnectHandler
  } = usePhantom();

  const isMountedRef = useIsMountedRef();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <div>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        {typeof window.ethereum !== 'undefined' ?
          <Button fullWidth variant='contained' sx={{
            backgroundColor: '#1098FC',
            variant: 'contained',
            maxWidth: 480,
            height: 48,
            ':hover': { opacity: '.9', backgroundColor: '#1098FC' }
          }} onClick={btnhandler}>
            <img src="/assets/metamask_l.svg" alt="MetaMask" width="24" height="24"
                 style={{ marginRight: 8 }}/> Metamask
          </Button>
          :
          <Typography sx={{ fontSize: 14, textAlign: 'center' }}>Oops!!! MetaMask is not available. Go get it <Link
            target="_blank" rel="noopener" href="https://metamask.io/">https://metamask.io/</Link>.</Typography>
        }
        <Divider><Typography color={'#637381'}>OR</Typography></Divider>
        {walletAvail ?
          <>
            {pubKey !== null ?
              <Button fullWidth variant="contained" sx={{
                backgroundColor: '#513DBE',
                variant: 'contained',
                maxWidth: 480,
                height: 48,
                ':hover': { opacity: '.9', backgroundColor: '#513DBE' }
              }} disabled={!connected} onClick={disconnectHandler}>
                <img src="/assets/phantom_l.svg" alt="MetaMask" width="24" height="24"
                     style={{ marginRight: 8 }}/> Disconnect from Phantom</Button>
              :
              <Button fullWidth variant="contained" sx={{
                backgroundColor: '#513DBE',
                variant: 'contained',
                maxWidth: 480,
                height: 48,
                ':hover': { opacity: '.9', backgroundColor: '#513DBE' }
              }} disabled={connected} onClick={connectHandler}>
                <img src="/assets/phantom_l.svg" alt="MetaMask" width="24" height="24"
                     style={{ marginRight: 8 }}/> Phantom
              </Button>
            }


            {/*{connected ? <p>Your public key is : {pubKey?.toBase58()}</p> : null}*/}
          </>
          :
          <>
            <Typography sx={{ fontSize: 14, textAlign: 'center' }}>Oops!!! Phantom is not available. Go get it <Link
              target="_blank" rel="noopener" href="https://phantom.app/">https://phantom.app/</Link>.</Typography>
          </>
        }
        <Typography sx={{ color: '#637381', fontSize: 14, textAlign: 'center' }}>
          By signing up, I agree to Slise <Link color='#212B36' target="_blank" rel="noopener" underline="always">
          Terms of Service
        </Link> and <Link color='#212B36' target="_blank" rel="noopener" underline="always">
          Privacy Policy
        </Link>.
        </Typography>
      </Stack>

      {/*  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>*/}

      {/*<div className="mt-2 mb-2">
        Connected Account: { isActive ? account : '' }
      </div>*/}
      {/* <Button variant="contained" onClick={disconnect}>
        Disconnect MetaMask<img src="/assets/disconnect_metamask.svg" width="50" height="50" />
      </Button>*/}
    </div>
  );
}
