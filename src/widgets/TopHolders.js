import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { sentenceCase } from 'change-case';
import React from 'react';
import Label from 'src/components/Label';
import WhaleIcon from './img/whales.svg';
import BluechipIcon from './img/bluechip.svg';
import { formatNumber } from './utils';

const Root = styled('div')((props) => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
  color: '#182415',

  display: 'grid',
  gridTemplateRows: 'min-content 1fr',
  gap: 13,
}));

const STableCell = styled(TableCell)(() => ({
  padding: 0,
  '&:first-of-type': {
    padding: 0,
  },
  '&:last-of-type': {
    padding: 0,
  },
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

const labelVariantMap = {
  mixed: 'warning',
  flipper: 'error',
  holder: 'success',
};

const TopHolders = ({ data = [] }) => {
  return (
    <Root>
      <Typography variant="h6" align="left">
        Top Holders
      </Typography>
      <TableContainer size="small">
        <Table size="small" stickyHeader sx={{ height: 'max-content' }}>
          <TableRow>
            <STableCell>
              <Typography align="left" variant="subtitle2">
                Wallet
              </Typography>
            </STableCell>
            <STableCell>
              <Typography align="right" variant="subtitle2">
                NFTs
              </Typography>
            </STableCell>
            <STableCell>
              <Typography align="right" variant="subtitle2">
                Portfolio
              </Typography>
            </STableCell>
            <STableCell>
              <Typography align="center" variant="subtitle2">
                Label
              </Typography>
            </STableCell>
          </TableRow>

          <TableBody>
            {Array.from(data).map((row) => (
              <TableRow key={row.address}>
                <SBodyTableCell>
                  <Stack direction={'row'} alignItems="center" gap={0.25}>
                    {row.whale && <img src={WhaleIcon.src} width={16} height={16} />}
                    {row.nfts > 10 && <img src={BluechipIcon.src} width={16} height={16} />}
                    <a
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      target={'_blank'}
                      href={`https://etherscan.io/address/${row.address}`}
                    >
                      <Typography variant="subtitle2">{row.address.substring(0, 6)}</Typography>
                    </a>
                  </Stack>
                </SBodyTableCell>
                <SBodyTableCell>
                  <Typography align={'right'} variant="body2">
                    {row.nfts}
                  </Typography>
                </SBodyTableCell>
                <SBodyTableCell>
                  <Typography align={'right'} variant="body2">
                    ${formatNumber(row.portfolio)}
                  </Typography>
                </SBodyTableCell>
                <SBodyTableCell>
                  <Stack direction={'row'} justifyContent="center">
                    <Label variant="filled" color={labelVariantMap[row.holdingTimeLabel]}>
                      {row.holdingTimeLabel}
                    </Label>
                  </Stack>
                </SBodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
};

export default TopHolders;
