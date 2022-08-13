import { Box, Button, Card, CardContent, Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Page from 'src/components/Page';
import TwitterIcon from 'src/widgets/img/twitter.svg';
import DiscordIcon from 'src/widgets/img/discord.svg';
import WaveLayer from './layer.svg';
import Image from 'next/image';
import SvgIconStyle from 'src/components/SvgIconStyle';
import { RegistrationDiscord } from 'src/widgets/collection/registration-discord';
import { RegistrationTwitter } from 'src/widgets/collection/registration-twitter';
import { RegistrationWallet } from 'src/widgets/collection/registration-wallet';
import Logo from 'src/components/Logo';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import axiosInstance from '../../utils/axios';
import { BACKEND_URL } from '../../utils/endpoints';
import { format } from 'date-fns';

const Header = styled('div')(({ theme }) => ({
  background: '#131F0F',
  width: '100%',
  height: 166,
}));

type Status = 'fail' | 'success' | 'initial';

interface WhitelistInfo {
  whitelistName: string;
  description?: string;
  discord?: string;
  logo?: string;
  mintDate?: Date;
  mintPrice?: number;
  twitter?: string;
  blockchain: string;
  registrationActive: boolean;
  totalSupply: number;
  minBalance?: number;
}

interface WhitelistInfoResponse {
  data?: WhitelistInfo;
}

function PublicPage({ data }: WhitelistInfoResponse) {
  const theme = useTheme();
  const [registrationTwitterStatus, setRegistrationTwitterStatus] = useState<Status>('initial');
  const [registrationDiscordStatus, setRegistrationDiscordStatus] = useState<Status>('initial');
  const [registrationWalletStatus, setRegistrationWalletStatus] = useState<Status>('initial');
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  //const [whitelistInfo, setWhitelistInfo] = useState<WhitelistInfo | null>(null);

  const isMountedRef = useIsMountedRef();

  const handleRegistrationTwitterStatus = (status: Status) => {
    setRegistrationTwitterStatus(status);
  };
  const handleRegistrationDiscordStatus = (status: Status) => {
    setRegistrationDiscordStatus(status);
  };
  const handleRegistrationWalletStatus = (status: Status) => {
    setRegistrationWalletStatus(status);
  };

  const allDone = [registrationTwitterStatus, registrationDiscordStatus, registrationWalletStatus].every(
    (item) => item === 'success'
  );

  useEffect(() => {
    setTooltipVisibility(true);
  }, [isMountedRef]);

  const [finished, setFinished] = useState(false);
  const handleSubmit = () => {
    setFinished(true);
  };
  if (!data)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        title="Mint List"
      >
        <Typography align="center" variant="h3" mb={'14px'}>
          Oops! Whitelist doesn't exist yet :(
        </Typography>
      </Grid>
    );

  return (
    <Page suppressHydrationWarning title={data?.whitelistName || ''} sx={{ backgroundColor: '#fff' }}>
      <Header>
        <Box sx={{ padding: theme.spacing(3, 2.5) }}>
          <Logo />
        </Box>
      </Header>
      <Grid maxWidth={1280} margin="0 auto" container>
        <Grid item md={1}></Grid>
        <Grid item md={6} sx={{ transform: 'translateY(-88px)' }}>
          <Box position="relative">
            <img
              src={WaveLayer.src}
              width={314}
              height="auto"
              style={{ position: 'absolute', left: '-84px', top: '10px', zIndex: 1 }}
            />
            <Box
              sx={{
                borderRadius: 146,
                overflow: 'hidden',
                width: 146,
                height: 146,
                zIndex: 2,
                position: 'relative',
                transform: 'translateY(18px)',
              }}
            >
              <img width={146} height={146} src={data?.logo || ''} />
            </Box>
          </Box>
          <Typography mt={5} mb={2.5} variant="h3">
            {data.whitelistName}
          </Typography>
          <Grid container mb={2.75}>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Mint Date
              </Typography>
              <Typography variant="subtitle1">
                {format(Date.parse(data?.mintDate) || Date.now(), 'MMMM do, yyyy')}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Mint Price
              </Typography>
              {data.blockchain === 'Ethereum' ? (
                <Typography variant="subtitle1">Ξ{data?.mintPrice}</Typography>
              ) : (
                <Typography variant="subtitle1">◎{data.mintPrice}</Typography>
              )}
            </Grid>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Total Supply
              </Typography>
              <Typography variant="subtitle1">{data.totalSupply}</Typography>
            </Grid>
          </Grid>
          <Grid container mb={2.75}>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Blockchain
              </Typography>
              <Typography variant="subtitle1">{data.blockchain}</Typography>
            </Grid>
            <Grid item md={4}>
              <Stack spacing={0.5} direction={'row'} alignItems="center" mb={0.5}>
                <Image {...TwitterIcon} />
                <Typography color="GrayText" variant="caption">
                  Twitter
                </Typography>
              </Stack>
              <Typography
                component="a"
                suppressHydrationWarning
                href="twitter.com/trash_"
                target="_blank"
                rel="noopener noreferrer"
                variant="subtitle1"
                sx={{
                  textDecoration: 'none',
                  color: 'CaptionText',
                }}
              >
                {data.twitter || 'No twitter'}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Stack spacing={0.5} direction={'row'} alignItems="center" mb={0.5}>
                <Image {...DiscordIcon} />
                <Typography color="GrayText" variant="caption">
                  Discord
                </Typography>
              </Stack>
              <Typography
                suppressHydrationWarning
                component="a"
                href="discord.com/trash_"
                target="_blank"
                rel="noopener noreferrer"
                variant="subtitle1"
                sx={{
                  textDecoration: 'none',
                  color: 'CaptionText',
                }}
              >
                {data.discord || 'No discord'}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="GrayText" variant="caption" mb={0.5}>
            Description
          </Typography>
          {isTooltipVisible && (
            <Typography variant="body2" component="div">
              <Typography dangerouslySetInnerHTML={{ __html: `<Typography>${data.description}</Typography>` }} />
            </Typography>
          )}
        </Grid>
        <Grid item md={4}>
          {finished ? (
            <Card sx={{ transform: 'translateY(-37px)' }}>
              <Box sx={{ padding: theme.spacing(10, 3) }}>
                <Typography variant="h4" mb={3} textAlign={'center'}>
                  🎉
                </Typography>
                <Typography variant="h5" mb={3} textAlign={'center'}>
                  Congratulations
                </Typography>
                <Box
                  padding={2.5}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #E5E8EB',
                  }}
                >
                  <Typography textAlign={'center'} variant="body2">
                    Your entry has been recorded
                  </Typography>
                </Box>
              </Box>
            </Card>
          ) : (
            <Card sx={{ transform: 'translateY(-37px)' }}>
              <CardContent>
                <Typography mb={1} variant="h5">
                  Registration
                </Typography>
                <Typography mb={2} variant="body2">
                  You must meet the requirements below to be able to register to the Mint List
                </Typography>
                <RegistrationTwitter status={registrationTwitterStatus} onChange={handleRegistrationTwitterStatus} />
                <RegistrationDiscord status={registrationDiscordStatus} onChange={handleRegistrationDiscordStatus} />
                <RegistrationWallet
                  blockchain={data?.blockchain || ''}
                  minValue={data?.minBalance || 0}
                  status={registrationWalletStatus}
                  onChange={handleRegistrationWalletStatus}
                />
                {allDone && (
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                      mt: 4.25,
                      color: 'black',
                      backgroundColor: '#DDFF55',
                      boxShadow: 'none',
                      ':hover': { opacity: '.6', backgroundColor: '#DDFF55' },
                    }}
                  >
                    Register
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </Page>
  );
}

export default PublicPage;

PublicPage.getInitialProps = async (appContext: any) => {
  let response = null;
  let result: WhitelistInfoResponse;
  try {
    response = await axiosInstance.get(`${process.env.BACKEND_URL}analytics/collection/${appContext.query.link}`);
    result = {
      data: response.data.data,
    };
  } catch {
    response = null;
  }

  return { data: response?.data?.data || null };
};
