import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { formatNumber } from './utils';

const Root = styled('div')(() => ({
  background: '#131F0F',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
  color: '#fff',
  overflow: 'hidden',
}));
const Img = styled('img')(() => ({
  display: 'block',
  width: '100%',
  maxWidth: '90%',
  margin: '0 auto',
}));

const TargetWallets = () => {
  return (
    <Root>
      <Typography variant="h3" align="left">
        {formatNumber(4293)}
      </Typography>
      <Typography variant="subtitle2" align="left" sx={{ opacity: 0.72 }} mb={'34px'}>
        Target wallets identified
      </Typography>
      <Img src="https://i.ibb.co/k1GH2YF/Type-ML-dashboard.png" />
    </Root>
  );
};

export default TargetWallets;
