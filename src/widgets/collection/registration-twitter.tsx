import { Box, Button, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import SvgIconStyle from 'src/components/SvgIconStyle';
import TwitterIcon from 'src/widgets/img/twitter.svg';

export function RegistrationTwitter() {
  const theme = useTheme();
  const [done, setDone] = useState(false);
  const handleClick = () => {
    setTimeout(() => {
      setDone(true);
    }, 1000);
  };

  return (
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
        <SvgIconStyle src={`/assets/icons/ic_check.svg/`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }} />
      ) : (
        <Image {...TwitterIcon} />
      )}

      <Typography variant="body2" color={done ? '#229A16' : '#131F0F'}>
        Follow{' '}
        <Typography
          component="a"
          suppressHydrationWarning
          href="twitter.com/trash_"
          target="_blank"
          rel="noopener noreferrer"
          variant="subtitle2"
          sx={{
            textDecoration: 'none',
            color: done ? '#229A16' : 'CaptionText',
          }}
        >
          @trash_
        </Typography>{' '}
        on Twitter
      </Typography>
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
        Connect Twitter
      </Button>
    </Box>
  );
}
