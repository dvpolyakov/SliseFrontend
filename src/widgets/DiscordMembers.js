import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { formatNumber } from './utils';
import Icon from './img/discord.svg';
import ConnectButton from 'src/components/ConnectButton';

const Root = styled('div')(() => ({
  gridArea: 'DiscordMembers',

  background: '#FFFFFF',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 12,
}));

const DiscordMembers = ({ value }) => {
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
    <Root>
      <Stack direction="column" alignItems="center">
        <img {...Icon} />
        <Typography variant="subtitle2">Discord Members</Typography>
        {connected || value > 0 ? (
          <Typography variant="h3">{formatNumber(value)}</Typography>
        ) : (
          <ConnectButton onClick={handleConnect} disabled={loading} />
        )}
      </Stack>
    </Root>
  );
};

export default DiscordMembers;
