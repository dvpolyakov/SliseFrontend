import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from '@mui/material';
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

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {
  const { login } = useAuth();
  // @ts-ignore
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask();

  const isMountedRef = useIsMountedRef();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
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

        <Connect2Phantom/>

      </Stack>

      {/*  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>*/}
      <Button fullWidth variant="outlined" onClick={connect} disabled={shouldDisable}>
        <img src="/assets/metamask.svg" alt="MetaMask" width="50" height="50"/> Connect to MetaMask
      </Button>
      {/*<div className="mt-2 mb-2">
        Connected Account: { isActive ? account : '' }
      </div>*/}
      {/* <Button variant="contained" onClick={disconnect}>
        Disconnect MetaMask<img src="/assets/disconnect_metamask.svg" width="50" height="50" />
      </Button>*/}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </div>
  );
}
