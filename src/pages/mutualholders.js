import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import Page from 'src/components/Page';
import Layout from 'src/layouts';

import Datagrid from 'src/components/Datagrid';
import CollectionNameCell from 'src/components/DatagridCells/CollectionNameCell';
import MutualHoldersCell from 'src/components/DatagridCells/MutualHoldersCell';
import { formatNumber } from 'src/widgets/utils';
import nft1 from 'src/assets/nft1.svg';
import nft2 from 'src/assets/nft2.svg';
import nft3 from 'src/assets/nft3.svg';
import MutualHoldersCard from 'src/widgets/MutualHoldersCard';
import useIsMountedRef from '../hooks/useIsMountedRef';
import axiosInstance from '../utils/axios';

const Cards = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
  marginBottom: 24,
}));

const TableCard = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  overflow: 'hidden',
}));

const _mutualHolders = [...Array(36)].map((_, index) => ({
  id: Math.floor(Math.random() * 1000).toString(16),
  bluechip: [true, false][Math.floor(Math.random() * 2)],
  image: [nft1, nft2, nft3][Math.floor(Math.random() * 3)],
  name: [
    'Bored Ape Yacht Club',
    'CryptoPunks',
    'MeeBits',
    'Doodles',
    'Moonbirds',
    'Azuki',
    'Cool Cats NFT',
    'Nouns',
    'World of Women',
  ][Math.floor(Math.random() * 9)],
  mutualHolders: Math.floor(Math.random() * 1_000),
  maxMutualHolders: 1_000,
  totalHolders: Math.floor(Math.random() * 10_000),
  supply: Math.floor(Math.random() * 10_000),
  floorPrice: (Math.random() * 100).toFixed(2),
  mintPrice: (Math.random() * 100).toFixed(2),
  twitterFollowers: Math.floor(Math.random() * 1_000_000),
}));

const columns = [
  {
    field: 'name',
    headerName: 'Collection',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: CollectionNameCell,
  },
  {
    field: 'totalholdings',
    headerName: 'Mutual Holders',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: MutualHoldersCell,
  },
  {
    field: 'totalHolders',
    headerName: 'Total Holders',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
  {
    field: 'totalSupply',
    headerName: 'Supply',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
  {
    field: 'floorPrice',
    headerName: 'Floor Price',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `Ξ ${value}`,
  },
  {
    field: 'mintPrice',
    headerName: 'Mint Price',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `Ξ ${value}`,
  },
  {
    field: 'twitterFollowers',
    headerName: 'Twitter Followers',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
];

function CircularProgress() {
  return null;
}

function Grid(props) {
  return null;
}

const MutualHolders = () => {
  const isMountedRef = useIsMountedRef();
  const [mutualHolders, setMutualHolders] = useState([]);

  const getMutualHolders = useCallback(async () => {
    const whitelistId = window.localStorage.getItem('whitelistId');
    if (whitelistId) {
      const response = await axiosInstance.get(
        `https://daoanalytics.herokuapp.com/api/analytics/getMutualHoldings?id=${whitelistId}`
      );
      response.data.data.map((holding) => {
        holding.id = Math.floor(Math.random() * 1000).toString(16);
        holding.totalSupply = holding.holdings?.totalSupply ?? (Math.random() * 100).toFixed(2);
        holding.floorPrice = holding.holdings?.stats?.floor.toFixed(4) ?? (Math.random() * 100).toFixed(2);
        holding.mintPrice = holding.holdings?.stats?.mintPrice.toFixed(4) ?? (Math.random() * 100).toFixed(2);
        holding.twitterFollowers = (Math.random() * 100000).toFixed(2);
        holding.totalHolders = holding.totalSupply !== undefined ? holding.totalSupply / 2 * 1.5 : (Math.random() * 100).toFixed(2);
      });
      setMutualHolders(response.data.data);
    } else {
      const response = await axiosInstance.get(
        `https://daoanalytics.herokuapp.com/api/analytics/getMutualHoldings?id=afd7626f-388e-4f98-9f36-123d54688936`
      );
      response.data.data.map((holding) => {
        holding.id = Math.floor(Math.random() * 1000).toString(16);
        holding.totalSupply = holding.holdings.totalSupply ?? (Math.random() * 100).toFixed(2);
        holding.floorPrice = holding.holdings.stats?.floor.toFixed(2) ?? (Math.random() * 100).toFixed(2);
        holding.mintPrice = holding.holdings.stats?.mintPrice.toFixed(4) ?? (Math.random() * 100).toFixed(2);
        holding.twitterFollowers = (Math.random() * 100000).toFixed(2);
        holding.totalHolders = holding.totalSupply !== undefined ? holding.totalSupply / 2 * 1.5 : (Math.random() * 100).toFixed(2);
      });
      setMutualHolders(response.data.data);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMutualHolders();
  }, [getMutualHolders]);

  if (mutualHolders) {
    return (
      <Page
        sx={{
          display: 'grid',
          gridTemplateRows: 'min-content min-content 1fr',
        }}
        title="Mutual Holders"
      >
        <Typography align="left" variant="h3" mb={'14px'}>
          Mutual Holders
        </Typography>
        <Cards>
          <MutualHoldersCard
            image={mutualHolders[0]?.holdings?.logo ?? nft1.image}
            title={mutualHolders[0]?.name ?? null}
            value={mutualHolders[0]?.totalholdings ?? null}
          />
          <MutualHoldersCard
            image={mutualHolders[1]?.holdings?.logo ?? nft2.image}
            title={mutualHolders[1]?.name ?? null}
            value={mutualHolders[1]?.totalholdings ?? null}
          />
          <MutualHoldersCard
            image={mutualHolders[2]?.holdings?.logo ?? nft3.image}
            title={mutualHolders[2]?.name ?? null}
            value={mutualHolders[2]?.totalholdings ?? null}
          />
        </Cards>
        {mutualHolders !== undefined ? (
          <TableCard>
            <Datagrid columns={columns} rows={mutualHolders} />
          </TableCard>
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              <CircularProgress />
            </Grid>
          </Grid>
        )}
      </Page>
    );
  }
  return (
    <Page
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content min-content 1fr',
      }}
      title="Mutual Holders"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Mutual Holders
      </Typography>
      <Cards>
        <MutualHoldersCard image={nft3} title="Bored Ape Yacht Club" value={412} />
        <MutualHoldersCard image={nft1} title="CryptoPunks" value={234} />
        <MutualHoldersCard image={nft2} title="MeeBits" value={221} />
      </Cards>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    </Page>
  );
};

MutualHolders.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MutualHolders;
