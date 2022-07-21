import { formatNumber } from './utils';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import Icon from './img/whitelist.svg';

const Root = styled('div')(() => ({
  gridArea: 'WhitelistSize',

  background: '#FFFFFF',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
}));

const WhitelistSize = ({ value }) => {
  return (
    <Root>
      <Stack direction="column" alignItems="center">
        <img {...Icon} />
        <Typography variant="subtitle2" mb={1} mt={0.5}>
          Whitelist Size
        </Typography>
        <Typography variant="h3">{formatNumber(value)}</Typography>
      </Stack>
    </Root>
  );
};

export default WhitelistSize;
