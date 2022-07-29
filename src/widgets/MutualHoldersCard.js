import { Avatar, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Root = styled('div')(() => ({
  background: '#DDFF55',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 24,
  overflow: 'hidden',
}));
const MutualHoldersCard = ({ title, value, image }) => {
  return (
    <Root>
      <Stack direction={'row'} gap={3} alignItems="center">
        <Avatar src={image} sx={{ width: 64, height: 64 }}>
          {title}
        </Avatar>
        <div>
          <Typography variant="h5"> {title === null ? 'Loading..' : title}</Typography>
          <Typography variant="subtitle2">{value === null ? 'Loading..' : `${value} Mutual Holders`} </Typography>
        </div>
      </Stack>
    </Root>
  );
};

export default MutualHoldersCard;
