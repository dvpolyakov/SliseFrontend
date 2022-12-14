import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import React from 'react';
import { formatNumber } from './utils';
import Link from 'next/link';

const Root = styled('div')(() => ({
  background: '#131F0F',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
  color: '#fff',
  display: 'grid',
  gridTemplateRows: 'min-content min-content 1fr',
  overflow: 'hidden',
}));
const Img = styled('img')(() => ({
  display: 'block',
  width: '100%',
  maxWidth: '80%',
  margin: '0 auto',
}));

const TargetWallets = () => {
  const theme = useTheme();

  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <Link href={'/mltargeting'}>
      <Root>
        <Typography variant="h3" align="left">
          {formatNumber(4293, 2)}
        </Typography>
        <Typography variant="subtitle2" align="left" sx={{ opacity: 0.72 }} mb={'34px'}>
          Target wallets identified
        </Typography>

        <Img src="/assets/TypeML_graph.svg" />
      </Root>
    </Link>
  );
};

export default TargetWallets;
