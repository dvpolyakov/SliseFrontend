import PropTypes from 'prop-types';
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Card, Slider, Stack, Typography} from '@mui/material';
// utils
// components
import Iconify from '../components/Iconify';
import Label from '../components/Label'
import {useEffect, useState} from "react";
import axios from '../utils/axios';
import {fShortenNumber} from '../utils/formatNumber';

const IconStyle = styled(Iconify)(({theme}) => ({
  width: 18,
  height: 18,

}));
// ----------------------------------------------------------------------

MLPrediction.propTypes = {
  title: PropTypes.string.isRequired,
//   mintPrice: PropTypes.number.isRequired,
//   collectionSize: PropTypes.number.isRequired,
//   probabilityOfSoldOut: PropTypes.number.isRequired,
//   total: PropTypes.number.isRequired,
//   icon: PropTypes.string.isRequired,
};

export default function MLPrediction({title}) {
  const [price, setMintPrice] = useState(0.01)
  const [collectionSize, setCollectionSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const whitelistSize = window.localStorage.getItem('whitelistSize');
  const [mintShare, setMintShare] = useState(0);
  const [sharePredict, setSharePredict] = useState('???');

  useEffect(() => {
    const getData = setTimeout(() => {
      axios.get(`https://slise-ml.herokuapp.com/items?price=${price}&supply=${collectionSize}&whitelist=${+whitelistSize}`, {
        headers:{
          'Access-Control-Allow-Origin' : '*'
        }
      })
        .then((response) => {
          console.log(`https://slise-ml.herokuapp.com/items?price=${price}&supply=${collectionSize}&whitelist=${+whitelistSize}`);
          console.log(response);
          const mintShare = response.data.mint_share[0].toFixed(2);
          setMintShare(mintShare);
          console.log(mintShare);
          if (mintShare > 0.00 && mintShare < 0.05) {
            setSharePredict('Low');
          } else if (mintShare > 0.05) {
            setSharePredict('Hight');
          } else {
            setSharePredict('??');
          }

        });
    }, 2000)
    return () => clearTimeout(getData);
  }, [price, collectionSize]);

  async function handlePriceChange(event, newNumber) {
    setMintPrice(newNumber);
  }

  async function handleCollectionChange(event, newNumber) {
    setCollectionSize(newNumber);
  }

  const theme = useTheme();

//   const chartOptions = {
//     colors: [chartColor],
//     chart: { sparkline: { enabled: true } },
//     plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
//     tooltip: {
//       x: { show: false },
//       y: {
//         formatter: (seriesName) => fNumber(seriesName),
//         title: {
//           formatter: () => '',
//         },
//       },
//       marker: { show: false },
//     },
//   };


  return (
    <Card sx={{justifyContent: 'center', p: 3, backgroundColor: '#DDFF55', fontFamily: 'Public Sans', height: '100%'}}>
      <Typography textAlign="left" variant="h6" sx={{marginTop:'-10px'}}>{title}</Typography>
      <Typography textAlign="left" variant="subtitle2"sx={{marginTop:'10px'}}  >MINT PRICE</Typography>
      <Typography textAlign='left' variant="h6">
        <IconStyle icon="codicon:three-bars"/>{price}
      </Typography>
      <Slider
        sx={{color: 'black'}}
        value={price}
        min={0.01}
        step={0.01}
        max={30}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <Typography textAlign="left" variant="subtitle2" >COLLECTION SIZE</Typography>
      <Typography textAlign='left' variant="h6">{collectionSize}</Typography>
      <Slider
        sx={{color: 'black'}}
        value={collectionSize}
        min={100}
        step={100}
        max={10000}
        onChange={handleCollectionChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"

      />
      <Typography textAlign="center" variant="subtitle2" >PROBABILITY OF SOLD OUT</Typography>
      <Stack direction='row' spacing={2} justifyContent="center" alignItems="center">
        <Typography textAlign="center" variant="h4">{mintShare > 0 ? fShortenNumber(mintShare) : '???'}%</Typography>

        <Label variant="outlined">{sharePredict}</Label>
      </Stack>
      {/* <Typography textAlign="center" variant="h3">{fNumber(total)}</Typography> */}


      {/*<ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />*/}
    </Card>
  );
}