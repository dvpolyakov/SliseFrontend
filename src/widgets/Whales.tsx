import { formatNumber } from './utils';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import Icon from './img/whales.svg';
import DashboardWidgetWrapper from 'src/components/DashboardWidgetWrapper';

const Root = styled('div')(() => ({
  gridArea: 'Whales',

  background: '#FFFFFF',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 12,
}));

const Whales = ({ value }: any) => {
  return (
    <DashboardWidgetWrapper gridArea="Whales">
      <img {...Icon} />
      <Typography variant="subtitle2">Whales</Typography>
      <Typography variant="h3">{formatNumber(value, 2)}</Typography>
    </DashboardWidgetWrapper>
  );
};

export default Whales;
