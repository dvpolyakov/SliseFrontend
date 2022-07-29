import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Root = styled('button')(() => ({
  background: '#DFE3E8',
  borderRadius: 8,
  padding: '4px 10px',
  display: 'flex',
  gap: 8,
  alignItems: 'center',

  marginTop: 8,

  color: '#212B36',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',

  '&:disabled': {
    opacity: 0.9,
    cursor: 'not-allowed',
  },
}));

const ConnectButton = ({ disabled, onClick }) => {
  return (
    <Root onClick={onClick} disabled={disabled}>
      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.25 5.23267C7.2075 5.23267 8.8725 6.48517 9.4875 8.23267H17.25V11.2327H15.75V14.2327H12.75V11.2327H9.4875C8.8725 12.9802 7.2075 14.2327 5.25 14.2327C2.7675 14.2327 0.75 12.2152 0.75 9.73267C0.75 7.25017 2.7675 5.23267 5.25 5.23267ZM3.75 9.73267C3.75 10.5577 4.425 11.2327 5.25 11.2327C6.075 11.2327 6.75 10.5577 6.75 9.73267C6.75 8.90767 6.075 8.23267 5.25 8.23267C4.425 8.23267 3.75 8.90767 3.75 9.73267Z"
            fill="#212B36"
          />
        </g>
      </svg>
      <Typography variant="button" sx={{ fontSize: '13px', lineHeight: '22px' }}>
        Connect
      </Typography>
    </Root>
  );
};

export default ConnectButton;
