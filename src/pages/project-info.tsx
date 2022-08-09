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
} from '@mui/material';
import { styled } from '@mui/material/styles';
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

const ProjectInfo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const isMountedRef = useIsMountedRef();

  return (
    <Page
      sx={{
        minHeight: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr min-content',
      }}
      title="Project Info"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Project Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <SwitchCard title="Registration is closed" />
          <Card sx={{ mt: 4.25 }}>
            <CardContent sx={{ padding: 4.5 }}>
              <UploadAvatar
                file={file}
                onDropAccepted={([e]) => setFile(e)}
                helperText={
                  <Typography component="p" sx={{ mt: 3, textAlign: 'center' }} color="GrayText" variant="caption">
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    Max size of 3.1 MB
                  </Typography>
                }
              />
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent sx={{ padding: '16px 24px 24px' }}>
              <Typography mb={1} variant="subtitle2">
                Blockchain
              </Typography>
              <TextField select fullWidth label="Select the chain" placeholder="Select the chain">
                <MenuItem key={1} value="1">
                  Ethereum
                </MenuItem>
                <MenuItem key={2} value="2">
                  Solana
                </MenuItem>
              </TextField>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <CopyClipboard value="https://app.slise.xyz/creeptures../12" label="Public link" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid mb={3} item md={6}>
                  <TextField fullWidth label="Collection Name" />
                </Grid>
                <Grid mb={3} item md={6}>
                  <DatePicker
                    label="Mint Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField fullWidth label="Official Twitter" />
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField fullWidth label="Official Discord Channel" />
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField fullWidth label="Mint Price" />
                </Grid>
                <Grid mb={3} item md={6}>
                  <TextField fullWidth label="Total Supply" />
                </Grid>
              </Grid>
              <Typography variant="subtitle2" mb={0.75}>
                Description
              </Typography>
              <NoSsr defer>
                <Suspense fallback="loading">
                  <Editor simple sx={{ mb: 3 }} />
                </Suspense>
              </NoSsr>
              <Stack direction="row" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    color: 'black',
                    backgroundColor: '#DDFF55',
                    ':hover': { opacity: '.6', backgroundColor: '#DDFF55' },
                  }}
                >
                  Save Info
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack alignItems="center">
            <Typography variant="subtitle2" mb={0.5}>
              Import your existing collection for analysis
            </Typography>
            <Typography variant="body2" mb={2.5}>
              You can import the list of wallets you collected as *.csv or a text file
            </Typography>
            <Button
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#131F0F',
                ':hover': { opacity: '.6', backgroundColor: '#131F0F' },
              }}
              startIcon={<SvgIconStyle src={`/assets/icons/ic_upload.svg/`} sx={{ width: 20, height: 20 }} />}
            >
              Import from file
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Page>
  );
};

ProjectInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectInfo;
