import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  backgroundColor: '#E5E5E5',
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 444,
  display: 'grid',
  placeItems: 'center',
  backgroundColor: '#131F0F',
  boxShadow: '0px 16px 32px -4px rgba(145, 158, 171, 0.16)',
  borderRadius: '16px',
  margin: theme.spacing(2, 0, 2, 2),
}));

const Img = styled('img')(() => ({
  display: 'block',
  width: '100%',
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          <HeaderStyle>
            <Logo />
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Img src="/assets/TypeML_graph.svg" />
            </SectionStyle>
          )}

          <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh', width: '100%' }}>
            <Box sx={{ maxWidth: 480, width: '100%' }}>
              <Typography variant="h4" gutterBottom>
                Have a majestic launch
              </Typography>

              <Typography sx={{ color: 'text.secondary' }} variant="body1" mb={3}>
                You’re one step away
              </Typography>
              <LoginForm />
            </Box>
          </Box>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
