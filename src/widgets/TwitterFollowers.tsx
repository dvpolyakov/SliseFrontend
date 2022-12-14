import { formatNumber } from './utils';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Icon from './img/twitter.svg';
import ConnectButton from 'src/components/ConnectButton';
import DashboardWidgetWrapper from 'src/components/DashboardWidgetWrapper';

const Root = styled('div')(() => ({
  gridArea: 'TwitterFollowers',

  background: '#FFFFFF',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 12,
}));

const TwitterFollowers = ({ value }: any) => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
    }, 500);
  };

  return (
    <DashboardWidgetWrapper gridArea="TwitterFollowers">
      <img {...Icon} />
      <Typography variant="subtitle2">Twitter Followers</Typography>
      {connected || value > 0 ? (
        <Typography variant="h3">{formatNumber(value, 2)}</Typography>
      ) : (
        <ConnectButton onClick={handleConnect} disabled={loading} />
      )}
    </DashboardWidgetWrapper>
  );
};

export default TwitterFollowers;
