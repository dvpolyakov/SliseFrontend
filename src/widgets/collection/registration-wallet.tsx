import { Box, Button, Chip, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SvgIconStyle from 'src/components/SvgIconStyle';
import useIsMountedRef from '../../hooks/useIsMountedRef';

type Status = 'fail' | 'success' | 'initial';
type Props = {
  onChange: (v: Status) => void;
  status: Status;
  minValue: number;
  blockchain: string;
};

export function RegistrationWallet({ onChange, status, minValue, blockchain }: Props) {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const [currency, setCurrency] = useState<string | null>(null);
  const setChainCurrency = useCallback(() => {
    switch (blockchain) {
      case 'Ethereum':
        setCurrency('ETH');
        break;
      case 'Polygon':
        setCurrency('MATIC');
        break;
      case 'Solana':
        setCurrency('SOL');
        break;
      default:
        setCurrency('None');
        break;
    }
  }, [isMountedRef]);

  const handleClick = useCallback(() => {
    setTimeout(() => {
      onChange('success');
    }, 1000);
  }, [onChange]);

  const handleDelete = useCallback(() => {
    onChange('initial');
  }, [onChange]);

  useEffect(() => {
    setChainCurrency();
  }, [setChainCurrency]);

  const mapping = useMemo(
    () => ({
      fail: {
        borderColor: '#FF48427A',
        backgroundColor: '#FF484214',
        color: '#B72136',
        icon1: <SvgIconStyle src={`/assets/icons/ic_remove.svg/`} sx={{ width: 1, height: 1, bgcolor: '#B72136' }} />,
        icon2: <SvgIconStyle src={`/assets/icons/ic_remove.svg/`} sx={{ width: 1, height: 1, bgcolor: '#B72136' }} />,
        button1: <Chip sx={{ background: '#fff' }} label={'0x123..6b1'} onDelete={handleDelete} />,
        size: 'min-content',
      },
      success: {
        borderColor: '#54D62C7A',
        backgroundColor: '#54D62C14',
        color: '#229A16',
        icon1: <SvgIconStyle src={`/assets/icons/ic_check.svg/`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }} />,
        icon2: <SvgIconStyle src={`/assets/icons/ic_check.svg/`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }} />,
        button1: <Chip sx={{ background: '#fff' }} label={'0x123..6b1'} onDelete={handleDelete} />,
        size: 'min-content',
      },
      initial: {
        borderColor: '#E5E8EB',
        backgroundColor: '#fff',
        color: '#131F0F',
        icon1: <SvgIconStyle src={`/assets/icons/ic_user.svg/`} sx={{ width: 1, height: 1 }} />,
        icon2: <Typography variant="h6">💵</Typography>,
        button1: (
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
        ),
        size: '120px',
      },
    }),
    [handleClick, handleDelete, theme]
  );

  return (
    <>
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
          sx={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: `20px 1fr ${mapping[status].size}`,
            gap: 1,
          }}
        >
          {mapping[status].icon1}
          <Typography variant="body2" color={mapping[status].color}>
            Connect your mint wallet
          </Typography>
          {mapping[status].button1}
        </Box>
        {status === 'fail' && (
          <Typography ml={3.25} variant="caption" color={mapping[status].color}>
            The requirement is not met
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          border: '1px solid',
          borderColor: mapping[status].borderColor,
          backgroundColor: mapping[status].backgroundColor,
          padding: theme.spacing(2.5, 2),
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '20px 1fr', gap: 1 }}>
          {mapping[status].icon2}
          <Typography variant="body2" color={mapping[status].color}>
            The minimum balance of {minValue} {currency} is required
          </Typography>
        </Box>
        {status === 'fail' && (
          <Typography ml={3.25} variant="caption" color={mapping[status].color}>
            The requirement is not met
          </Typography>
        )}
      </Box>
    </>
  );
}
