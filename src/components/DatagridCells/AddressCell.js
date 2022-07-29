import { Stack, Typography } from '@mui/material';
import React from 'react';
import WhaleIcon from 'src/widgets/img/whales.svg';
import BluechipIcon from 'src/widgets/img/bluechip.svg';

const AddressCell = ({ row }) => {
  const address = row.address.slice(0, 6);
  return (
    <Stack direction={'row'} gap={0.25} alignItems="center">
      {row.whale && <img src={WhaleIcon.src} width={16} height={16} />}
      {row.bluechipHolder && <img src={BluechipIcon.src} width={16} height={16} />}
      <Typography variant="body2">{address}</Typography>
    </Stack>
  );
};

export default AddressCell;
