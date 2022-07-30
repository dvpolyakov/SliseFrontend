import { Stack, Typography } from '@mui/material';
import React from 'react';
import Label from 'src/components/Label';

const labelVariantMap = {
  mixed: 'warning',
  flipper: 'error',
  holder: 'success',
};

const HoldingTimeCell = ({ value }: any) => {
  return (
    <Stack direction={'row'} justifyContent="center">
      <Label variant="filled" color={labelVariantMap[value as keyof typeof labelVariantMap]}>
        {value}
      </Label>
    </Stack>
  );
};

export default HoldingTimeCell;
