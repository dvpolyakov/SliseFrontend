import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { formatNumber } from 'src/widgets/utils';
import { NAVBAR } from '../../config';

const Root = styled('div')(() => ({
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '120px min-content',
  gap: '16px',
  width: '100%',
  paddingLeft: 10,
  paddingRight: 10,
}));

type Props = {
  maxPercent: number;
};

const Wrapper = styled('div')((props) => ({
  height: 6,
  background: '#DDFF55',
  borderRadius: 10,
  /* width: `calc(100% - ${props.maxPercent * 2}px)`,*/
  position: 'relative',
  overflow: 'hidden',
}));

const Bar = styled('div')((props) => ({
  height: 6,
  background: '#131F0F',
  borderRadius: 2,
  left: 0,
  top: 0,
}));

const AvgNtfPrice = ({ value, row }: any) => {
  return (
    <Root>
      <Wrapper>
        <Bar sx={{ width: `${row.percent}%` }} />
      </Wrapper>
      <Typography textAlign={'right'} variant="body2">
        ${formatNumber(value, 0)}
      </Typography>
    </Root>
  );
};

export default AvgNtfPrice;
