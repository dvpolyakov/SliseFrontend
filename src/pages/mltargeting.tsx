// @mui
import { Box, Button, Card, CardContent, Container, Grid, Slider, Stack, Typography } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { ExportJsonCsv } from 'react-export-json-csv';
// hooks
// layouts
// components
import forceNumber from 'force-number';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import Layout from 'src/layouts';
import { styled } from '@mui/system';
import useIsMountedRef from '../hooks/useIsMountedRef';

import useWindowDimensions from '../utils/windowSize';
import { useTheme } from '@mui/material';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const rand = (min, max) => {
  return Math.random() * (max - min) + min;
};

const randn_bm = (sig) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * sig; // Translate to 0 -> 1
  // if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num;
};

const genData = (R, C, sig) => {
  var arr = [];
  for (var i = 0; i < R; i++) {
    arr[i] = [];

    for (var j = 0; j < C; j++) {
      arr[i][j] = randn_bm(sig);
    }
  }
  return arr;
};

const moveData = (serOrig, val) => {
  let ser = JSON.parse(JSON.stringify(serOrig));
  for (var i = ser[2].data.length - 1; i > 0; i--) {
    for (var j = 0; j < ser[0].data.length; j++) {
      const dist = Math.sqrt(
        Math.pow(ser[2].data[i][0] - ser[0].data[j][0], 2) + Math.pow(ser[2].data[i][1] - ser[0].data[j][1], 2)
      );

      if (dist < val) {
        ser[1].data.push(ser[2].data[i]);
        ser[2].data.splice(i, 1);
        break;
      }
    }
  }
  return ser;
};

const serOrig = [
  {
    name: 'Known',
    data: genData(20, 2, 6),
  },
  {
    name: 'Predicted',
    data: genData(0, 2, 5),
  },
  {
    name: 'All',
    data: genData(100, 2, 10),
  },
];
const options = {
  chart: {
    animations: {
      enabled: false,
    },
  },

  markers: {
    size: 10,
  },
  xaxis: {
    tickAmount: 5,
    labels: {
      formatter: function (val) {
        return parseFloat(val).toFixed(1);
      },
    },
    axisBorder: { show: false },
    labels: { show: false },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
  },
  yaxis: {
    tickAmount: 5,
    labels: {
      formatter: function (val) {
        return parseFloat(val).toFixed(1);
      },
    },
    axisBorder: { show: false },
    labels: { show: false },
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
  },
  colors: ['#DDFF55', '#FF7C55', '#131F0F'],
};

// ----------------------------------------------------------------------

GeneralBooking.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
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

// ----------------------------------------------------------------------

type Addresses = {
  address?: string[];
};

export default function GeneralBooking() {
  const isMountedRef = useIsMountedRef();
  const { themeStretch } = useSettings();
  const [value, setValue] = useState(0);
  const [newSer, setnewSer] = useState(moveData(serOrig, 1));
  const [newView, setView] = useState(0);
  const [wallets, setWallets] = useState(0);
  const [data, setData] = useState<string[]>([]);
  const windowSize = useWindowDimensions();
  const theme = useTheme();

  const handleChange = (event: any, newNumber: any) => {
    if (newNumber === 0) {
      setWallets('0');
    }
    const number = newNumber / 10;
    const newVal = forceNumber(number);
    const newSer = moveData(serOrig, newVal);
    const walletsPredicted = newSer[1].data.length;
    setView(newNumber);
    setValue(newVal);
    setnewSer(newSer);
  };
  const headers = [
    {
      key: 'address',
      name: 'Address',
    },
  ];
  useEffect(() => {
    const getData = setTimeout(() => {
      axiosInstance
        .get(`${process.env.BACKEND_URL}analytics/getTargets?vector=${+newView / 100}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((response) => {
          setWallets(response.data.data.total);

          /*const mintShare = response.data;
          setView(mintShare);
          console.log(mintShare);
          if (mintShare > 0.0 && mintShare < 0.05) {
            setSharePredict('Low');
          } else if (mintShare > 0.05) {
            setSharePredict('High');
          } else {
            setSharePredict('??');
          }
          setError('');*/
        })
        .catch((error) => {
          /*setError(error.message);
          setOpen(true);*/
        });
      axiosInstance
        .get(`${process.env.BACKEND_URL}analytics/getExport?vector=${+newView / 100}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((response) => {
          setData(response.data.data.address);
        });
    }, 2000);
    return () => clearTimeout(getData);
  }, [newView]);

  /* const getTargeting = useCallback(async () => {
     const response = await axios.get('');
     if (isMountedRef.current) {
       const stored = JSON.parse(window.localStorage.getItem('storedWhitelists'));
       if(stored){
         console.log(stored);
         response.data.data.push(...stored.whitelists);
       }
       setWhitelists(response.data.data);
       const existWhitelist = window.localStorage.getItem('whitelistId');
       if (!existWhitelist) {
         setWhitelist(response.data.data[0].name);
         window.localStorage.setItem('whitelistId', response.data.data[0].id);
       } else {
         setWhitelist(findWhitelistById(response.data.data, existWhitelist));
       }
     }

   }, [isMountedRef]);*/

  if (windowSize.width!! <= 480)
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
          Oops! We don't support mobile devices yet :(
        </Typography>
      </Grid>
    );

  return (
    <Page
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr',
        gap: '14px',
      }}
      title="ML Targeting"
    >
      <Typography align="left" variant="h3">
        ML Targeting
      </Typography>
      <Box sx={{ backgroundColor: '#F3F4EF', padding: '0 !important' }}>
        <Grid container spacing={3} alignItems="stretch" sx={{ height: '100%' }}>
          <Grid item sm={12} md={8} lg={8} sx={{ height: '100%' }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ height: '100%' }}>
                <Typography variant="h6">Search space visualization</Typography>
                <Chart
                  style={{ height: '100%', display: 'grid', placeItems: 'center' }}
                  options={options}
                  series={newSer}
                  type="scatter"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ height: '100%' }}>
                <Stack alignItems={'stretch'} sx={{ height: '100%' }}>
                  <Typography variant="h6" mt={1} mb={4}>
                    Find similar wallets to your whitelist
                  </Typography>
                  <Typography variant="subtitle2" mb={1}>
                    SIMILARITY THRESHOLD
                  </Typography>
                  <Typography variant="h6" mb={1}>
                    {newView + '%'}
                  </Typography>
                  <Slider
                    sx={{ color: 'black' }}
                    value={newView}
                    min={0}
                    step={1}
                    defaultValue={1}
                    max={100}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                  />

                  <Box mt="auto">
                    <Typography variant="h2" align="center">
                      {wallets}
                    </Typography>
                    <Typography variant="subtitle1" align="center" sx={{ opacity: '.72' }} mb={5.75}>
                      Target wallets identified
                    </Typography>

                    <ExportJsonCsv
                      style={{
                        display: 'block',
                        backgroundColor: '#DDFF55',
                        color: 'black',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        height: '48px',
                        ':hover': { opacity: '.6', backgroundColor: '#DDFF55' },
                        borderColor: 'transparent',
                        font: 'Public Sans',
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}
                      headers={headers}
                      items={data}
                    >
                      Export Wallets
                    </ExportJsonCsv>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
