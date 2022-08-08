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
import Connect2Phantom from '../../../components/Connect2Phantom';
import useMetaMask from '../../../hooks/useMetamask';
import axiosInstance from '../../../utils/axios';
import { BACKEND_URL } from '../../../utils/endpoints';
import { setCookie } from 'cookies-next';
import { styled } from '@mui/material/styles';
import NavItem from '../../../components/nav-section/horizontal/NavItem';

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
  // @ts-ignore
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask();

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
          <Button fullWidth variant='contained' sx={{backgroundColor: '#1098FC', variant: 'contained', maxWidth: 480, height: 48, ':hover': { opacity: '.9', backgroundColor: '#1098FC' }}}  onClick={connect} disabled={shouldDisable}>
            <img src="/assets/metamask_l.svg" alt="MetaMask" width="24" height="24" style={{marginRight:8}} /> Metamask
          </Button>
          :
          <Typography sx={{fontSize: 14, textAlign:'center'}}>Opps!!! MetaMask is not available. Go get it <Link target="_blank" rel="noopener" href="https://metamask.io/">https://metamask.io/</Link>.</Typography>
        }
        <Divider><Typography color={'#637381'}>OR</Typography></Divider>
        <Connect2Phantom/>
        <Typography sx={{ color: '#637381', fontSize:14, textAlign:'center'}}>
          By signing up, I agree to Slise <Link color='#212B36' target="_blank" rel="noopener" underline="always">
            Terms of Service
          </Link> and <Link color='#212B36' target="_blank" rel="noopener"  underline="always">
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
