import {Avatar, Stack, Typography} from '@mui/material';
import React from 'react';

const OneAvatar = ({holdings, alt, index, children}) => {
  console.log(holdings);
  return (
    <div style={{position: 'relative', zIndex: 1000 - index, transform: `translateX(-${index * 4}px)`}}>
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
      {index >= 3 ? <Avatar sx={{width: 32, height: 32, zIndex: 1000 - index, bgcolor: '#DDFF55'}}
                            alt={alt}>
          <Typography color="#131F0F" variant="caption">
            {children}
          </Typography>
        </Avatar> :
        <Avatar sx={{width: 32, height: 32, zIndex: 1000 - index, bgcolor: '#DDFF55'}}
                src={holdings?.logo || 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s120'}
                alt={alt}>
          <Typography color="#131F0F" variant="caption">
            {children}
          </Typography>
        </Avatar>}

    </div>
  );
};

const NftStackCell = ({value, colDef}) => {
  const width = colDef.computedWidth - 20;
  const avatarImgCount = 3;

  return (
    <Stack direction={'row'}>
      {value.collectionInfo.map((av, index) => (
          <OneAvatar {...av} index={index}/>
        )
      )}
      <OneAvatar index={avatarImgCount}>+{value.total}</OneAvatar>
    </Stack>
  );
};

export default NftStackCell;
