import { CircularProgress, Grid, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Layout from 'src/layouts';
import axiosInstance from 'src/utils/axios';
import BluechipHolders from 'src/widgets/BluechipHolders';
import BotsIdentified from 'src/widgets/BotsIdentified';
import DiscordMembers from 'src/widgets/DiscordMembers';
import MlPrediction from 'src/widgets/MlPrediction';
import MutualHolders from 'src/widgets/MutualHolders';
import TargetWallets from 'src/widgets/TargetWallets';
import TopHolders from 'src/widgets/TopHolders';
import TwitterFollowers from 'src/widgets/TwitterFollowers';
import Whales from 'src/widgets/Whales';
import WhitelistSize from 'src/widgets/WhitelistSize';

const CardsGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateAreas: `
  "WhitelistSize TwitterFollowers DiscordMembers MlPrediction"
  "BluechipHolders Whales BotsIdentified MlPrediction"
`,
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: 24,
  marginBottom: 24,
  minHeight: 0,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
}));

const BigCardsGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 24,
  minHeight: 0,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
}));

const DashboardIndex = () => {
  const isMountedRef = useIsMountedRef();
  const [statistics, setStatistics] = useState(null);

  const getWhitelistStatistics = useCallback(async () => {
    const whitelistId = window.localStorage.getItem('whitelistId');
    if (whitelistId) {
      const response = await axiosInstance.get(
        `https://daoanalytics.herokuapp.com/api/analytics/getWhitelistStatistics?id=${whitelistId}`
      );
      window.localStorage.setItem('whitelistSize', response.data.data.whitelistSize);
      setStatistics(response.data.data);
    } else {
      const response = await axiosInstance.get(
        `https://daoanalytics.herokuapp.com/api/analytics/getWhitelistStatistics?id=afd7626f-388e-4f98-9f36-123d54688936`
      );
      window.localStorage.setItem('whitelistSize', response.data.data.whitelistSize);
      setStatistics(response.data.data);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getWhitelistStatistics();
  }, [getWhitelistStatistics]);

  if (!statistics) {
    return (
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
    );
  }

  return (
    <Page
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content min-content 1fr',
      }}
      title="Dashboard"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Dashboard
      </Typography>
      <CardsGrid>
        <BluechipHolders value={statistics?.bluechipHolders ?? 0} />
        <BotsIdentified value={statistics?.bots ?? 0} />
        <DiscordMembers value={statistics?.discordInfo?.approximateMemberCount ?? 0} />
        <Whales value={statistics?.whales ?? 0} />
        <WhitelistSize value={statistics?.whitelistSize ?? 0} />
        <TwitterFollowers value={statistics?.twitterFollowersCount ?? 0} />
        <MlPrediction />
      </CardsGrid>
      <BigCardsGrid>
        <TopHolders data={statistics?.topHolders ?? []} />
        <MutualHolders data={statistics?.mutualHoldings ?? []} />
        <TargetWallets />
      </BigCardsGrid>
    </Page>
  );
};

DashboardIndex.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DashboardIndex;
