import { Box, Button, Chip, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import SvgIconStyle from 'src/components/SvgIconStyle';

type Props = {
  onDone: (value: boolean) => void;
};
export function RegistrationWallet({ onDone }: Props) {
  const theme = useTheme();
  const [done, setDone] = useState(false);
  const handleClick = () => {
    setTimeout(() => {
      setDone(true);
      onDone(true);
    }, 1000);
  };

  const handleDelete = () => {
    setDone(false);
    onDone(false);
  };

  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '20px 1fr 120px',
          gap: 1,
          border: '1px solid',
          borderColor: done ? '#54D62C7A' : '#E5E8EB',
          backgroundColor: done ? '#54D62C14' : '#fff',
          padding: theme.spacing(2.5, 2),
          borderRadius: 2,
        }}
      >
        {done ? (
          <SvgIconStyle src={`/assets/icons/ic_check.svg?1=1`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }} />
        ) : (
          <SvgIconStyle src={`/assets/icons/ic_user.svg/`} sx={{ width: 1, height: 1 }} />
        )}
        <Typography variant="body2" color={done ? '#229A16' : '#131F0F'}>
          Connect your mint wallet
        </Typography>
        {done ? (
          <Chip sx={{ background: '#fff' }} label={'0x123..6b1'} onDelete={handleDelete} />
        ) : (
          <Button
            onClick={handleClick}
            variant="contained"
            size="small"
            sx={{
              padding: theme.spacing(0.5, 1),
              color: '#fff',
              backgroundColor: '#131F0F',
              boxShadow: 'none',
              ':hover': { opacity: '.6', backgroundColor: '#131F0F', boxShadow: 'none' },
            }}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '20px 1fr',
          gap: 1,
          border: '1px solid',
          borderColor: done ? '#54D62C7A' : '#E5E8EB',
          backgroundColor: done ? '#54D62C14' : '#fff',
          padding: theme.spacing(2.5, 2),
          borderRadius: 2,
        }}
      >
        {done ? (
          <SvgIconStyle src={`/assets/icons/ic_check.svg?1=1`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }} />
        ) : (
          <Typography variant="h6">💵</Typography>
        )}
        <Typography variant="body2" color={done ? '#229A16' : '#131F0F'}>
          The minimum balance of 5 ETH is required
        </Typography>
      </Box>
    </>
  );
}
