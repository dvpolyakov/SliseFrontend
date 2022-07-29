import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { formatNumber } from 'src/widgets/utils';

const Root = styled('div')(() => ({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr min-content',
  gap: 16,
  width: '100%',
  paddingRight: 10,
}));

const Wrapper = styled('div')(() => ({
  height: 6,
  background: '#DDFF55',
  borderRadius: 10,
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

const MutualHoldersCell = ({ value, row }) => {
  return (
    <Root>
      <Wrapper>
        <Bar sx={{ width: `${row.percent}%` }} />
      </Wrapper>
      <Typography variant="body2">{value}</Typography>
    </Root>
  );
};

export default MutualHoldersCell;
