import { Card, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { formatNumber } from './utils';
import Icon from './img/discord.svg';
import ConnectButton from 'src/components/ConnectButton';
import DashboardWidgetWrapper from 'src/components/DashboardWidgetWrapper';

const DiscordMembers = ({ value }: any) => {
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
    <DashboardWidgetWrapper gridArea="DiscordMembers">
      <img {...Icon} />
      <Typography variant="subtitle2">Discord Members</Typography>
      {connected || value > 0 ? (
        <Typography variant="h3">{formatNumber(value, 2)}</Typography>
      ) : (
        <ConnectButton onClick={handleConnect} disabled={loading} />
      )}
    </DashboardWidgetWrapper>
  );
};

export default DiscordMembers;
