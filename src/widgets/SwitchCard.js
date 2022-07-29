import { Stack, Typography, Switch, switchClasses } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import React from 'react';

const Root = styled('div')((props) => ({
  padding: '12px 24px',
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  overflow: 'hidden',
}));

const SSwitch = styled(Switch)(() => ({
  [`.${switchClasses.track}`]: {
    background: '#A5AFB9',
    mixBlendMode: 'normal',
    opacity: 0.8,
  },
  [`.${switchClasses.thumb}`]: {
    background: '#131F0F',
    boxShadow: '0px 1px 2px rgba(145, 158, 171, 0.16)',
  },
  [`.${switchClasses.checked} + .${switchClasses.track}`]: {
    background: '#DDFF55 !important',
    opacity: '1 !important',
  },
}));

const SwitchCard = ({ title, value, onChange }) => {
  return (
    <Root>
      <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
        <Typography variant="subtitle1">{title}</Typography>
        <SSwitch checked={value} onChange={onChange} disableRipple />
      </Stack>
    </Root>
  );
};

export default SwitchCard;
