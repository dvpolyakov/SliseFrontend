import { NoSsr, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Root = styled('div')((props) => ({
  padding: 24,
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  backgroundImage: `url(${props.bgImage})`,
  backgroundPosition: 'right center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
}));
const ChartWrapper = styled('div')(() => ({
  width: 64,
  height: 64,
  position: 'relative',
}));
const TypographyWrapper = styled('div')(() => ({
  width: 64,
  height: 64,
  position: 'absolute',
  top: 0,
  left: 0,

  display: 'grid',
  placeItems: 'center',
}));

const radius = 30;
const CirclePercentageCard = ({ count, title, bg = '', percent }) => {
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - circumference * percent;

  return (
    <Root bgImage={bg}>
      <Stack direction={'row'} gap={3}>
        <ChartWrapper>
          <svg width="64" height="64" viewPort="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle r="30" cx="32" cy="32" fill="transparent" stroke="#DDFF55" strokeWidth={4}></circle>
            <circle
              r="30"
              cx="32"
              cy="32"
              fill="transparent"
              stroke="#131F0F"
              strokeWidth={4}
              strokeDashoffset={strokeDashoffset}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeLinecap="round"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            ></circle>
          </svg>
          <TypographyWrapper>
            <Typography variant="subtitle2">{percent * 100}%</Typography>
          </TypographyWrapper>
        </ChartWrapper>
        <div>
          <Typography variant="h4">{count}</Typography>
          <Typography variant="subtitle2">{title}</Typography>
        </div>
      </Stack>
    </Root>
  );
};

export default CirclePercentageCard;
