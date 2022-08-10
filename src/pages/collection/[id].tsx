import { Box, Button, Card, CardContent, Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import React from 'react';
import Page from 'src/components/Page';
import TwitterIcon from 'src/widgets/img/twitter.svg';
import DiscordIcon from 'src/widgets/img/discord.svg';
import WaveLayer from './layer.svg';
import Image from 'next/image';
import SvgIconStyle from 'src/components/SvgIconStyle';

const Header = styled('div')(({ theme }) => ({
  background: '#131F0F',
  width: '100%',
  height: 166,
}));

const getIcon = (name: string) => <SvgIconStyle src={`/assets/icons/${name}.svg/`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
};

function PublicPage() {
  const theme = useTheme();
  return (
    <Page suppressHydrationWarning title="Trash Collection" sx={{ backgroundColor: '#fff' }}>
      <Header />
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
              <img width={146} height={146} src="https://picsum.photos/200" />
            </Box>
          </Box>
          <Typography mt={5} mb={2.5} variant="h3">
            Trash Collection
          </Typography>
          <Grid container mb={2.75}>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Mint Date
              </Typography>
              <Typography variant="subtitle1">Oct 17</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Mint Price
              </Typography>
              <Typography variant="subtitle1">Ξ0.001</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Total Supply
              </Typography>
              <Typography variant="subtitle1">10,000</Typography>
            </Grid>
          </Grid>
          <Grid container mb={2.75}>
            <Grid item md={4}>
              <Typography color="GrayText" variant="caption" mb={0.5}>
                Blockchain
              </Typography>
              <Typography variant="subtitle1">Ethereum</Typography>
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
                twitter.com/trash_
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
                discord.com/...
              </Typography>
            </Grid>
          </Grid>
          <Typography color="GrayText" variant="caption" mb={0.5}>
            Description
          </Typography>
          <Typography variant="body2" component="div">
            <p dangerouslySetInnerHTML={{ __html: '<p>123</p>' }} />
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Card sx={{ transform: 'translateY(-37px)' }}>
            <CardContent>
              <Typography mb={1} variant="h5">
                Registration
              </Typography>
              <Typography mb={2} variant="body2">
                You must meet the requirements below to be able to register to the Mint List
              </Typography>
              <Box
                sx={{
                  mb: 2,
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateColumns: '20px 1fr 120px',
                  gap: 1,
                  border: '1px solid #E5E8EB',
                  padding: theme.spacing(2.5, 2),
                  borderRadius: 2,
                }}
              >
                <Image {...TwitterIcon} />
                <Typography variant="body2">
                  Follow{' '}
                  <Typography
                    component="a"
                    suppressHydrationWarning
                    href="twitter.com/trash_"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'CaptionText',
                    }}
                  >
                    @trash_
                  </Typography>{' '}
                  on Twitter
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    padding: theme.spacing(0.5, 1),
                    color: '#fff',
                    backgroundColor: '#131F0F',
                    boxShadow: 'none',
                    ':hover': { opacity: '.6', backgroundColor: '#131F0F', boxShadow: 'none' },
                  }}
                >
                  Connect Twitter
                </Button>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateColumns: '20px 1fr 120px',
                  gap: 1,
                  border: '1px solid #E5E8EB',
                  padding: theme.spacing(2.5, 2),
                  borderRadius: 2,
                }}
              >
                <Image {...DiscordIcon} />
                <Typography variant="body2">
                  Join{' '}
                  <Typography
                    component="a"
                    suppressHydrationWarning
                    href="discord.com/trash_"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{
                      textDecoration: 'none',
                      color: 'CaptionText',
                    }}
                  >
                    trash
                  </Typography>{' '}
                  Discord
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    padding: theme.spacing(0.5, 1),
                    color: '#fff',
                    backgroundColor: '#131F0F',
                    boxShadow: 'none',
                    ':hover': { opacity: '.6', backgroundColor: '#131F0F', boxShadow: 'none' },
                  }}
                >
                  Connect Discord
                </Button>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateColumns: '20px 1fr 120px',
                  gap: 1,
                  border: '1px solid #E5E8EB',
                  padding: theme.spacing(2.5, 2),
                  borderRadius: 2,
                }}
              >
                {ICONS.user}
                <Typography variant="body2">Connect your mint wallet</Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    padding: theme.spacing(0.5, 1),
                    color: '#fff',
                    backgroundColor: '#131F0F',
                    boxShadow: 'none',
                    ':hover': { opacity: '.6', backgroundColor: '#131F0F', boxShadow: 'none' },
                  }}
                >
                  Connect Wallet
                </Button>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateColumns: '20px 1fr',
                  gap: 1,
                  border: '1px solid #E5E8EB',
                  padding: theme.spacing(2.5, 2),
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">💵</Typography>
                <Typography variant="body2">The minimum balance of 5 ETH is required</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </Page>
  );
}

export default PublicPage;
