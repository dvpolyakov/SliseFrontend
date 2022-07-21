// @mui
import { Grid, Container, Typography, Card, Slider, Box, Button } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import forceNumber from "force-number";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const rand = (min, max) => {
  return Math.random() * (max - min) + min;
}

const randn_bm = (sig) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * sig; // Translate to 0 -> 1
  // if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num;
}

const genData = (R, C, sig) => {
  var arr = [];
  for (var i = 0; i < R; i++) {
    arr[i] = [];

    for (var j = 0; j < C; j++) {
      arr[i][j] = randn_bm(sig);
    }
  }
  return arr;
}

const moveData = (serOrig, val) => {
  let ser = JSON.parse(JSON.stringify(serOrig));
  for (var i = ser[2].data.length - 1; i > 0; i--) {
    for (var j = 0; j < ser[0].data.length; j++) {
      const dist = Math.sqrt(
        Math.pow(ser[2].data[i][0] - ser[0].data[j][0], 2) +
          Math.pow(ser[2].data[i][1] - ser[0].data[j][1], 2)
      );

      if (dist < val) {
        ser[1].data.push(ser[2].data[i]);
        ser[2].data.splice(i, 1);
        break;
      }
    }
  }
  return ser;
}

const serOrig = [
  {
    name: "Known",
    data: genData(20, 2, 6)
  },
  {
    name: "Predicted",
    data: genData(0, 2, 5)
  },
  {
    name: "All",
    data: genData(100, 2, 10)
  }
];
const options = {
    chart: {
        animations: {
          enabled: false
        }
      },
     
      markers: {
        size: 10
      },
      xaxis: {
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          }
        },
        axisBorder: { show: false },
        labels: { show: false }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          }
        },
        axisBorder: { show: false },
        labels: { show: false }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      colors: ["#DDFF55", "#FF7C55", "#131F0F"]
}



// ----------------------------------------------------------------------

GeneralBooking.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();
  const [value, setValue] = useState(0)
  const [newSer, setnewSer] = useState(moveData(serOrig, 1))
  const [newView, setView] = useState(0)
  const [wallets, setWallets] = useState(0)
  const handleChange = (event, newNumber) => {
    const number = newNumber/10;
    const newVal = forceNumber(number);
    const newSer = moveData(serOrig, newVal);
    const walletsPredicted = newSer[1].data.length
    setView(newNumber)
    setValue(newVal)
    setnewSer(newSer)
    setWallets(walletsPredicted)
  }
  return (
    <Page title="ML Targeting" sx={{marginRight:'-40px'}} >
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{marginTop:'-115px', backgroundColor:'#F3F4EF', paddingBottom:'100px', marginBottom:'-120px', marginLeft: '-20px'}}>
        <Typography variant="h3" sx={{ paddingTop:'25px', marginBottom:'20px', paddingLeft:'20px'}}>ML Targeting</Typography>
        <Grid container spacing={2} alignItems="stretch" sx={{paddingRight:'20px', paddingLeft:'20px'}}>
            <Grid item sm={12} md={8} lg={8} >
            <Card sx={{backgroundColor:'white', height:'671px', padding:'30px'}}>
            <Typography variant="h6" >Search space visualization</Typography>
            <Chart
            
          options={options}
          series={newSer}
          type="scatter"
        
        />
    
            </Card>

            </Grid>
            <Grid item sm={12} md={4} lg={4}>
                <Card  sx={{backgroundColor:'white', height:'671px'}}>
                <Typography variant="h6" sx={{padding:'25px'}}>Find similar wallets to your whitelist</Typography>
                <Typography variant="subtitle2" sx={{marginLeft:'25px', paddingBottom: '15px'}}>SIMILARITY THRESHOLD</Typography>
                <Typography variant="h6" sx={{marginLeft:'25px'}}>{newView + '%'}</Typography>
                <Box   sx={{marginRight:'25px', marginLeft: '25px', marginBottom: '250px'}}>
                <Slider
                sx={{color: 'black'}}
                value={newView}
                min={1}
                step={1}
                defaultValue={1}
                max={100}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
      />
      </Box>
                <Typography variant="h2" align='center' >{wallets}</Typography>
                <Typography variant="subtitle1" align='center' sx={{opacity:'.72', marginBottom:'50px'}}>Target wallets identified</Typography>
                <Button align='center' size='large'  sx={{backgroundColor:'#DDFF55', color:'black', width:'90%', marginLeft:'5%', marginBottom:'25px', ':hover':{opacity: '.6', backgroundColor:'#DDFF55'}}} variant="contained">Export Wallets</Button>
              
        </Card>
         </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
