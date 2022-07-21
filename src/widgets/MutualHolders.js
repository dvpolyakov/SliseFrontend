import {
  Avatar,
  Box,
  LinearProgress,
  linearProgressClasses,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import { styled } from '@mui/system';
import React from 'react';

const Root = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
  color: '#182415',

  display: 'grid',
  gridTemplateRows: 'min-content 1fr',
  gap: 13,
}));

const SBodyTableCell = styled(TableCell)(() => ({
  padding: '6px 0',
  '&:first-of-type': {
    padding: '6px 0',
  },
  '&:last-of-type': {
    padding: '6px 0',
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#308fe8',
  },
}));

const MutualHolders = ({ data = [] }) => {
  return (
    <Root>
      <Typography variant="h6" align="left">
        Mutual Holders
      </Typography>

      <TableContainer size="small">
        <Table size="medium" stickyHeader sx={{ height: 'max-content' }}>
          <TableBody>
            {Array.from(data).map((row) => (
              <TableRow key={row.address}>
                <SBodyTableCell size="small" style={{ width: '50%', paddingRight: 16 }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <a
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      target={'_blank'}
                      href={`https://etherscan.io/address/${row.address}`}
                    >
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        alt={row?.name}
                        src={row?.holdings?.logo ?? 'https://i.ibb.co/WFD2Kj6/IMG.png'}
                      />
                    </a>
                    <a
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      target={'_blank'}
                      href={`https://etherscan.io/address/${row.address}`}
                    >
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </a>
                  </Stack>
                </SBodyTableCell>
                <SBodyTableCell>
                  <Tooltip title={row.totalholdings ?? 0} placement="top">
                    <Box sx={{ width: '100%' }}>
                      <BorderLinearProgress variant="determinate" value={row.percent ?? 0}></BorderLinearProgress>
                    </Box>
                  </Tooltip>
                </SBodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
};

export default MutualHolders;
