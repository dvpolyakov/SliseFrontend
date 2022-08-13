import { Box, Button, Chip, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import SvgIconStyle from 'src/components/SvgIconStyle';
import TwitterIcon from 'src/widgets/img/twitter.svg';

type Status = 'fail' | 'success' | 'initial';
type Props = {
  onChange: (v: Status) => void;
  status: Status;
};

export function RegistrationTwitter({ onChange, status }: Props) {
  const theme = useTheme();

  const handleClick = useCallback(() => {
    setTimeout(() => {
      onChange('success');
    }, 1000);
  }, [onChange]);

  const handleDelete = useCallback(() => {
    onChange('initial');
  }, [onChange]);

  const mapping = useMemo(
    () => ({
      fail: {
        borderColor: '#FF48427A',
        backgroundColor: '#FF484214',
        color: '#B72136',
        icon: <SvgIconStyle src={`/assets/icons/ic_remove.svg/`} sx={{ width: 1, height: 1, bgcolor: '#B72136' }} />,
        button: <Chip sx={{ background: '#fff' }} label={'@dariaodaria'} onDelete={handleDelete} />,
        size: 'min-content',
      },
      success: {
        borderColor: '#54D62C7A',
        backgroundColor: '#54D62C14',
        color: '#229A16',
        icon: <SvgIconStyle src={`/assets/icons/ic_check.svg/`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }} />,
        button: <Chip sx={{ background: '#fff' }} label={'@dariaodaria'} onDelete={handleDelete} />,
        size: 'min-content',
      },
      initial: {
        borderColor: '#E5E8EB',
        backgroundColor: '#fff',
        color: '#131F0F',
        icon: <Image {...TwitterIcon} />,
        button: (
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
        ),
        size: '120px',
      },
    }),
    [handleClick, handleDelete, theme]
  );

  return (
    <Box
      sx={{
        mb: 2,
        border: '1px solid',
        borderColor: mapping[status].borderColor,
        backgroundColor: mapping[status].backgroundColor,
        padding: theme.spacing(2.5, 2),
        borderRadius: 2,
      }}
    >
      <Box
        sx={{ display: 'grid', alignItems: 'center', gridTemplateColumns: `20px 1fr ${mapping[status].size}`, gap: 1 }}
      >
        {mapping[status].icon}

        <Typography variant="body2" color={mapping[status].color}>
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
              color: mapping[status].color,
            }}
          >
            @trash_
          </Typography>{' '}
          on Twitter
        </Typography>
        {mapping[status].button}
      </Box>
      {status === 'fail' && (
        <Typography ml={3.25} variant="caption" color={mapping[status].color}>
          The requirement is not met
        </Typography>
      )}
    </Box>
  );
}
