// @mui
import {styled} from '@mui/material/styles';
import {Box, Card, CardContent, Container, Grid, Stack, Typography} from '@mui/material';
import Datagrid from 'src/components/Datagrid';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import Icon from './icons/upward.svg'
import Chart from './icons/chart.svg'
import Chart2 from './icons/chart2.svg'
import AddressCell from 'src/components/DatagridCells/AddressCell';
import {formatNumber} from 'src/widgets/utils';
import nft1 from 'src/assets/nft1.svg';
import nft2 from 'src/assets/nft2.svg';
import nft3 from 'src/assets/nft3.svg';
import NftCell from 'src/components/DatagridCells/NftCell';
// ----------------------------------------------------------------------
SocialData.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


const Main1 = styled(Page)(() => ({
  backgroundColor: '#F3F4EF',
  width: '100%',
  height: '100%'
}));

const TableCard = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  overflow: 'hidden',
}));
const _mintList = [...Array(36)].map((_, index) => ({
  id: Math.floor(Math.random() * 1000).toString(16),
  address: `0x${Math.floor(Math.random() * 1_000_000_000_000)
    .toString(16)
    .slice(0, 32)}`,
  whale: [true, false][Math.floor(Math.random() * 2)],
  bluechipHolder: [true, false][Math.floor(Math.random() * 2)],

  pfp: [nft1, nft2, nft3, nft1, nft2, nft3, nft1, nft2, nft3],
  discordMessages: 12 + Math.floor(Math.random() * 29),
  followers: 432 + Math.floor(Math.random() * 29),
  twitter: ['@ruleconcept1', '@flipper', '@holder34', '@tomas', '@ape232', '@mironn', '@Kbalika2', '@cryptocraze', '@buscador', '@wayne3'][Math.floor(Math.random() * 10)],
  twitterInteractions: 400 + Math.floor(Math.random() * 10),
  discordUsername: ['rule.eth#5454', 'ape423#121', 'punk#1253', 'miron#4523', 'davidCrypt#5325', 'rave#5323', 'Kbalika#2432', 'crazape#5234', 'buscador#4329', 'wayne3#8887'][Math.floor(Math.random() * 10)],
}));
const columns = [
  {
    field: 'pfp',
    headerName: 'PFP',
    width: 80,
    flex: 0,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: NftCell,
  },
  {
    field: 'address',
    headerName: 'Wallet',
    width: 100,
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: AddressCell,
  },
  {
    field: 'twitter',
    headerName: 'Twitter',
    flex: 0,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    size: "small",
    disableColumnMenu: true,
    disableReorder: true,
  },
  {
    field: 'followers',
    headerName: 'Followers',
    // width: 35,
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({value}) => formatNumber(value),
  },
  {
    field: 'twitterInteractions',
    headerName: 'Twitter Interactions',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    disableColumnMenu: true,
    disableReorder: true,
  },
  {
    field: 'discordUsername',
    headerName: 'Discord Username',
    // width: 54,
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
  },
  {
    field: 'discordMessages',
    headerName: `Discord Messages`,
    // width: 58,
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({value}) => `${formatNumber(value)}`,
  },
];

export default function SocialData({title}) {
  return (

    <Main1 title="Social Data">
      <Container>

        <Typography variant='h3'>Social Data

        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>

            <Card sx={{display: 'flex', backgroundColor: 'white', width: '500px', marginTop: '30px'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                  <Typography variant="subtitle2" sx={{paddingBottom: '20px'}}>
                    Twitter Followers
                  </Typography>
                  <Typography variant="h3" sx={{paddingBottom: '10px'}}>
                    18,7K
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{marginTop: '7px'}}> <img {...Icon} /></Box>


                    <Typography variant="subtitle2">
                      2.6%
                    </Typography>
                    <Typography variant="subtitle2" sx={{opacity: '.8'}}>
                      than last week
                    </Typography>

                  </Stack>

                </CardContent>
              </Box>
              <Box sx={{marginLeft: '150px', marginTop: '40px'}}>
                <img {...Chart} />
              </Box>
            </Card>

          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={{display: 'flex', backgroundColor: 'white', width: '500px', marginTop: '30px'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                  <Typography variant="subtitle2" sx={{paddingBottom: '20px'}}>
                    Discord Members
                  </Typography>
                  <Typography variant="h3" sx={{paddingBottom: '10px'}}>
                    1,290
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{marginTop: '7px'}}> <img  {...Icon} /></Box>

                    <Typography variant="subtitle2">
                      10.1%
                    </Typography>
                    <Typography variant="subtitle2" sx={{opacity: '.8'}}>
                      than last week
                    </Typography>

                  </Stack>

                </CardContent>
              </Box>
              <Box sx={{marginLeft: '150px', marginTop: '40px'}}>
                <img {...Chart2} />
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid container sx={12}>
          <Grid item style={{width: '100%', backgroundColor: 'white', marginTop: '30px', borderRadius: '16px'}}>
            <TableCard>
              <Datagrid columns={columns} rows={_mintList}/>
            </TableCard>
          </Grid>
        </Grid>
      </Container>
    </Main1>

  );
}