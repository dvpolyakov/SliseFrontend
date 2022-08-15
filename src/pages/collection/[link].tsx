import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar, SnackbarCloseReason,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
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
import { format } from "date-fns";
import { setCookie } from 'cookies-next';
import { signIn, signOut, useSession, } from 'next-auth/react';
import Label from '../../components/Label';

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
  minTwitterFollowers?: number;
  twitterRequired: boolean;
  discordRequired: boolean;
  twitterMinFollowersRequired: boolean;
}

interface WhitelistInfoResponse {
  data?: WhitelistInfo,
  link: string
}

function PublicPage({ data, link }: WhitelistInfoResponse) {
  const theme = useTheme();
  const session = useSession();
  const [registrationTwitterStatus, setRegistrationTwitterStatus] = useState<Status>('initial');
  const [registrationDiscordStatus, setRegistrationDiscordStatus] = useState<Status>('initial');
  const [registrationWalletStatus, setRegistrationWalletStatus] = useState<Status>('initial');
  const [twitter, setTwitter] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState('');
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

  const handleAddress = (address: string) => {
    setAddress(address);
  };
  const handleTwitter = (twitter: string) => {
    setTwitter(twitter);
  };

  const handleCloseAlert = (event: React.SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };

  const handleClose = (event: Event | React.SyntheticEvent<any>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setTooltipVisibility(true);
  }, [isMountedRef]);

  const [finished, setFinished] = useState(false);
  const handleSubmit = async () => {
    let requiersCount: number = 0;
    if(data?.discordRequired)
      requiersCount = requiersCount++;
    if(data?.twitterRequired)
      requiersCount = requiersCount++;
    if(data?.twitterMinFollowersRequired)
      requiersCount = requiersCount++;
    let requiresDone: number = 0;
    if(registrationTwitterStatus === 'success')
      requiresDone = requiresDone++;
    if(registrationDiscordStatus === 'success')
      requiresDone = requiresDone++;
    let done:string[] = [];
    if(data?.discordRequired)
      done.push(registrationDiscordStatus);
    if(data?.twitterRequired)
      done.push(registrationTwitterStatus);
    if(data?.minBalance! > 0)
      done.push(registrationWalletStatus);
    const allDone = done.every(
      (item) => item === 'success'
    );

    console.log(allDone);
    if(allDone){
      const response = await axiosInstance.post(`${process.env.BACKEND_URL}auth/authWhitelistMember`,{
        'address': address,
        'link': link,
        'networkType': data?.blockchain,
        'twitter': session?.data?.username
      }).then((response) => setFinished(true))
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setOpen(true);
        });
      console.log(response);
    }
   /* setFinished(true);*/
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
          <Logo/>
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
              <img width={146} height={146} src={data?.logo || ''}/>
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
                href={`twitter.com/${data?.twitter}`}
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
              <Typography dangerouslySetInnerHTML={{ __html: `<Typography>${data.description}</Typography>` }}/>
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
                    {data?.registrationActive ? <Label sx={{marginLeft:2}} variant="filled" color={'success'}>Active</Label>: <Label sx={{marginLeft:2}} variant="filled" color={'error'}>Closed</Label>}
                  </Typography>

                <Typography mb={2} variant="body2">
                  You must meet the requirements below to be able to register to the Mint List
                </Typography>
                {data?.twitterRequired &&
                    <RegistrationTwitter handleTwitter={handleTwitter} minTwitterFollowers={data?.minTwitterFollowers} twitter={data?.twitter}
                                         status={registrationTwitterStatus}
                                         onChange={handleRegistrationTwitterStatus}/>}
                {data?.discordRequired && <RegistrationDiscord status={registrationDiscordStatus}
                                                               onChange={handleRegistrationDiscordStatus}/>}
                <RegistrationWallet
                  link={link}
                  handleAddress={handleAddress}
                  blockchain={data?.blockchain || ''}
                  minValue={data?.minBalance || 0}
                  status={registrationWalletStatus}
                  onChange={handleRegistrationWalletStatus}
                />
                {data?.registrationActive && (
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
      {open ?
        <Snackbar anchorOrigin={{vertical:'top', horizontal:'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleCloseAlert} severity="error" sx={{width: '100%'}}>
            {error}
          </Alert>
        </Snackbar>
        : <></>
      }
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
      link: appContext.query.link
    }

  } catch {
    response = null;
  }
  setCookie('whitelistLink', appContext.query.link);

  return { data: response?.data?.data, link: appContext.query.link || null }
}
