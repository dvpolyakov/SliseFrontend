import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

const OneAvatar = ({ src, alt, index, children }) => {
  return (
    <div style={{ position: 'relative', zIndex: 1000 - index, transform: `translateX(-${index * 4}px)` }}>
      <div
        style={{
          width: 36,
          height: 36,
          backgroundColor: '#fff',
          position: 'absolute',
          left: -2,
          top: -2,
          borderRadius: 36,
          zIndex: 1000 - index,
        }}
      />
      <Avatar sx={{ width: 32, height: 32, zIndex: 1000 - index, bgcolor: '#DDFF55' }} src={src} alt={alt}>
        <Typography color="#131F0F" variant="caption">
          {children}
        </Typography>
      </Avatar>
    </div>
  );
};

const NftCell = ({ value, colDef }) => {
  const width = colDef.computedWidth - 20;
  const avatarImgCount = Math.floor((width - 32) / 28);
const firstNum = Math.floor(Math.random() * 5) 
const secondNum = firstNum +1
  return (
    <Stack >
      {value.slice(firstNum, secondNum).map((av, index) => (
        <OneAvatar {...av} index={index} />
      ))}
      {avatarImgCount < 1 && <OneAvatar index={avatarImgCount}>+{1 - avatarImgCount}</OneAvatar>}
    </Stack>
  );
};

export default NftCell;