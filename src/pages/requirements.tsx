import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  SvgIcon,
  Button,
  NoSsr,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { noop } from 'lodash';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import CopyClipboard from 'src/components/CopyClipboard';
import Editor from 'src/components/editor';
import Page from 'src/components/Page';
import SvgIconStyle from 'src/components/SvgIconStyle';
import { UploadAvatar } from 'src/components/upload';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Layout from 'src/layouts';
import axiosInstance from 'src/utils/axios';
import BluechipHolders from 'src/widgets/BluechipHolders';
import BotsIdentified from 'src/widgets/BotsIdentified';
import DiscordMembers from 'src/widgets/DiscordMembers';
import MlPrediction from 'src/widgets/MlPrediction';
import MutualHolders from 'src/widgets/MutualHolders';
import SwitchCard from 'src/widgets/SwitchCard';
import TargetWallets from 'src/widgets/TargetWallets';
import TopHolders from 'src/widgets/TopHolders';
import TwitterFollowers from 'src/widgets/TwitterFollowers';
import Whales from 'src/widgets/Whales';
import WhitelistSize from 'src/widgets/WhitelistSize';
import { number } from 'yup/lib/locale';
import TwitterIcon from 'src/widgets/img/twitter.svg';
import DiscordIcon from 'src/widgets/img/discord.svg';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

import { useSnackbar } from 'notistack';


const BorderCard = styled('div')((theme) => ({
  border: '1px solid #DCE0E4',
  padding: theme.theme.spacing(3),
  marginBottom: theme.theme.spacing(3),
  borderRadius: theme.theme.spacing(2),
}));

const getIcon = (name: string) => <SvgIconStyle src={`/assets/icons/${name}.svg/`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
};

const useStyles = makeStyles(() => ({
  thumb: {
    boxShadow: 'none !important',
  },
  track: {
    background: '#131F0F',
    borderRadius: 1,
    height: 2,
  },
  rail: {
    background: '#1C2718',
    borderRadius: 1,
    height: 2,
    opacity: 0.38,
  },
  root: {
    color: '#131F0F !important',
    padding: '0 !important',
    height: '12 !important',
  },
  markTwitter: {
    display: 'none',
    '&:nth-child(10n+3)': {
      display: 'block',
      background: '#F2F3ED',
    },
  },
  markTwitterActive: {
    background: '#131F0F',
    width: 0,
  },
  markBalance: {
    display: 'none',
    '&:nth-child(1000n+3)': {
      display: 'block',
      background: '#F2F3ED',
    },
  },
  markBalanceActive: {
    background: '#131F0F',
    width: 0,
  },
}));

const Requirements = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const styles = useStyles();
  const isMountedRef = useIsMountedRef();
  const [twitterValue, setTwitterValue] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);
  const [twitterVerification, setTwitterVerification] = useState<boolean | null>(null);
  const [twitterMinFollowers, setTwitterMinFollowers] = useState<boolean | null>(null);
  const [discordVerification, setDiscordVerification] = useState<boolean | null>(null);
  const [balanceVerification, setBalanceVerification] = useState<boolean | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const getWhitelistSettings = useCallback(async () => {
    const jwt = getCookie('jwt-token');
    if (jwt) {
      const currentWl = localStorage.getItem('whitelistId');
      const response = await axiosInstance.get(`${process.env.BACKEND_URL}analytics/whitelistSettings?whitelistId=${currentWl}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.data.data) {
       setTwitterValue(response.data.data.minTwitterFollowers);
       setBalanceValue(response.data.data.minWalletBalance);
       setDiscordVerification(response.data.data.discordVerification);
       setTwitterVerification(response.data.data.twitterVerification);
       setBalanceVerification(response.data.data.balanceVerification);
       setTwitterMinFollowers(response.data.data.requireMinTwitterFollowers);
      }
    }
  }, [isMountedRef]);

  const updateWhitelistInfo = async () => {
    let formData = new FormData();
    const jwt = getCookie('jwt-token');
    const whitelistId = localStorage.getItem('whitelistId');
    const response = await axiosInstance.put(`${process.env.BACKEND_URL}analytics/whitelistSettings/${whitelistId}`, {
      'discordVerification': discordVerification,
      'minWalletBalance': balanceValue,
      'minTwitterFollowers': twitterValue,
      'twitterVerification': twitterVerification,
      'balanceVerification': balanceVerification,
      'requireMinTwitterFollowers': twitterMinFollowers
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
    });
    if(response.status === 200){
      enqueueSnackbar('Saved!');
    }
  }

  const onChangeTwitterVerification = (props: any) => {
    setTwitterVerification(twitterVerification !== true);
  }

  const onChangeDiscordVerification = (props: any) => {
    setDiscordVerification(discordVerification !== true);
  }

  const onChangeWalletBalanceVerification = (props: any) => {
    setBalanceVerification(balanceVerification !== true);
  }

  const onChangeTwitterMinFollowers = (props: any) => {
    setTwitterMinFollowers(twitterMinFollowers !== true);
  }

  useEffect(() => {
    getWhitelistSettings()
  }, [getWhitelistSettings]);

  return (
    <Page
      sx={{
        // minHeight: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr',
      }}
      title="Requirements"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Requirements
      </Typography>
      <Card>
        <CardContent>
          <BorderCard>
            <Stack alignItems="center" direction="row" spacing={1.5} mb={1}>
              <Image {...TwitterIcon} />
              <Typography variant="subtitle1">Twitter Following Verification</Typography>
            </Stack>
            <FormGroup sx={{ ml: 2, mb: 1 }}>
              <FormControlLabel control={<Checkbox checked={twitterVerification} onChange={onChangeTwitterVerification}/>} label="Require users to follow your Twitter" />
              <FormControlLabel control={<Checkbox checked={twitterMinFollowers} onChange={onChangeTwitterMinFollowers} />} label="Require users to have a minimum number of followers" />
            </FormGroup>
            <Stack alignItems="center" direction="row" spacing={2} pl={8}>
              <Slider
                sx={{ maxWidth: 400 }}
                value={twitterValue}
                min={1}
                step={1}
                max={100}
                onChange={(_, v) => setTwitterValue(v as number)}
                valueLabelDisplay="off"
                marks
                classes={{
                  rail: styles.rail,
                  track: styles.track,
                  root: styles.root,
                  mark: styles.markTwitter,
                  markActive: styles.markTwitterActive,
                  thumb: styles.thumb,
                }}
              />
              <Typography variant="h6">{twitterValue}</Typography>
            </Stack>
          </BorderCard>
          <BorderCard>
            <Stack alignItems="center" direction="row" spacing={1.5} mb={1}>
              <Image {...DiscordIcon} />
              <Typography variant="subtitle1">Discord Membership</Typography>
            </Stack>
            <FormGroup sx={{ ml: 2, mb: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={discordVerification} onChange={onChangeDiscordVerification}  />}
                label="Require users to join your Discord channel"
              />
            </FormGroup>
          </BorderCard>
          <BorderCard>
            <Stack alignItems="center" direction="row" spacing={1.5} mb={1}>
              <Typography variant="h6">????</Typography>
              <Typography variant="subtitle1">Wallet Balance</Typography>
            </Stack>
            <FormGroup sx={{ ml: 2, mb: 1 }}>
              <FormControlLabel
                control={<Checkbox checked={balanceVerification} onChange={onChangeWalletBalanceVerification} />}
                label="Require users to have a minimum wallet balance (in chain tokens)"
              />
            </FormGroup>
            <Stack alignItems="center" direction="row" spacing={2} pl={8}>
              <Slider
                sx={{ maxWidth: 400 }}
                value={balanceValue}
                min={0.00000}
                step={0.00001}
                max={1}
                onChange={(_, v) => setBalanceValue(v as number)}
                valueLabelDisplay="off"
                marks={false} // Very slow
                classes={{
                  rail: styles.rail,
                  track: styles.track,
                  root: styles.root,
                  mark: styles.markBalance,
                  markActive: styles.markBalanceActive,
                  thumb: styles.thumb,
                }}
              />
              <Typography variant="h6">{balanceValue}</Typography>
            </Stack>
          </BorderCard>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                color: 'black',
                backgroundColor: '#DDFF55',
                ':hover': { opacity: '.6', backgroundColor: '#DDFF55' },
              }}
              onClick={updateWhitelistInfo}
            >
              Save Requirements
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Page>
  );
};

Requirements.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Requirements;
