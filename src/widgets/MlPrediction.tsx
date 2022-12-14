//@ts-check
import { Alert, Slider, Snackbar, SnackbarCloseReason, Stack, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Label from 'src/components/Label';
import axiosInstance from 'src/utils/axios';
import { Networks } from '../common/enums/networks';
import { calculateMultiplicator, mapMlPredictionResult } from '../common/mapping/chain-mapping';

const Root = styled('div')(() => ({
  gridArea: 'MlPrediction',

  background: '#DDFF55',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: '12px 24px',
  color: '#131F0F',
}));

const Group = styled('div')(() => ({
  marginBottom: 20,
  color: '#131F0F',
}));

const useStyles = makeStyles(
  createStyles(() => ({
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
      color: '#000',
      padding: 0,
      height: 12,
    },
    markPrice: {
      display: 'none',
      '&:nth-child(10n+3)': {
        display: 'block',
        background: '#F2F3ED',
      },
    },
    markPriceActive: {
      background: '#131F0F',
      width: 0,
    },
    markSize: {
      display: 'none',
      '&:nth-child(100n+3)': {
        display: 'block',
        background: '#F2F3ED',
      },
    },
    markSizeActive: {
      background: '#131F0F',
      width: 0,
    },
  }))
);

const { format: formatNumber } = new Intl.NumberFormat('en-US', {
  useGrouping: true,
  notation: 'standard',
});
const { format: formatPercent } = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

type Props = {
  blockchain: Networks;
  symbol: string;
};

const MlPrediction = ({ blockchain, symbol }: Props) => {
  const styles = useStyles();
  const [priceSliderValue, setPriceSliderValue] = useState(0.3);
  const [collectionSizeSliderValue, setCollectionSizeSliderValue] = useState(8000);

  function handlePriceChange(event: Event, value: number, activeThumb: number) {
    setPriceSliderValue(value);
  }

  function handleCollectionSizeChange(event: Event, value: any) {
    setCollectionSizeSliderValue(value);
  }

  const getStep = (): number => {
    switch(blockchain){
      case 'Solana':
        return 1;
      case 'Ethereum':
        return 0.01;
      case 'Polygon':
        return 5
      default:
        return 1;
    }
  }

  const getMax = () => {
    switch(blockchain){
      case 'Solana':
        return 100;
      case 'Ethereum':
        return 1;
      case 'Polygon':
        return 1000;
      default:
        return 1;
    }
  }

  const whitelistSize = localStorage.getItem('whitelistSize');
  const [mintShare, setMintShare] = useState(0);
  const [sharePredict, setSharePredict] = useState('???');
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);
  const [sliderStep, setSliderStep] = useState(0);
  const [sliderMax, setSliderMax] = useState(0);

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
    setSliderMax(getMax());
    setSliderStep(getStep());
    const getData = setTimeout(() => {
      const val = calculateMultiplicator(priceSliderValue, blockchain);
      //console.log(`mult ${val}`);
      if (priceSliderValue > 0.1 || collectionSizeSliderValue > 10)
        axiosInstance
          .get(
            `${process.env.ML_URL}items?price=${val}&supply=${collectionSizeSliderValue}&whitelist=${+whitelistSize!}`,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          )
          .then((response) => {
            /*console.log(
              `${process.env.ML_URL}items?price=${val}&supply=${collectionSizeSliderValue}&whitelist=${+whitelistSize!}`
            );*/
            //console.log(response.data[0]);
            const mintShare = response.data[0].toFixed(3);
            const result = mapMlPredictionResult(mintShare,blockchain);
            //console.log(`ms ${mintShare}`);
            setMintShare(result.predictionResult);
            setSharePredict(result.successChance);
            console.log(result);
           /* if (mintShare > 0.0 && mintShare < 0.05) {
              setSharePredict('Low');
            } else if (mintShare > 0.05) {
              setSharePredict('High');
            } else {
              setSharePredict('??');
            }*/
            setError('');
          })
          .catch((error) => {
            setError(error.message);
            setOpen(true);
          });
    }, 2000);
    return () => clearTimeout(getData);
  }, [priceSliderValue, collectionSizeSliderValue]);

  return (
    <Root>
      <Typography align="left" variant="h6" mb={'16px'}>
        ML Prediction
      </Typography>
      <Group>
        <Stack direction={'row'} alignItems="flex-start" justifyContent={'space-between'}>
          <Typography align="left" variant="overline" mb={0}>
            MINT PRICE
          </Typography>
          {symbol === 'MATIC' ? <Typography align="right" variant="h6" lineHeight={1} mb={0}>
              {priceSliderValue} {symbol}
            </Typography>
            :
            blockchain !== 'Solana' ? (
              <Typography align="right" variant="h6" lineHeight={1} mb={0}>
                ?? {priceSliderValue}
              </Typography>
            ) : (
              <Typography align="right" variant="h6" lineHeight={1} mb={0}>
                ??? {priceSliderValue}
              </Typography>
            )}

        </Stack>
        <Slider
          value={priceSliderValue}
          min={0}
          step={getStep()}
          max={getMax()}
          onChange={handlePriceChange}
          valueLabelDisplay="off"
          marks
          classes={{
            rail: styles.rail,
            track: styles.track,
            root: styles.root,
            mark: styles.markPrice,
            markActive: styles.markPriceActive,
            thumb: styles.thumb,
          }}
        />
      </Group>
      <Group>
        <Stack direction={'row'} alignItems="flex-start" justifyContent={'space-between'}>
          <Typography align="left" variant="overline" mb={0}>
            COLLECTION SIZE
          </Typography>
          <Typography align="right" variant="h6" lineHeight={1} mb={0}>
            {formatNumber(collectionSizeSliderValue)}
          </Typography>
        </Stack>

        <Slider
          value={collectionSizeSliderValue}
          min={10}
          step={10}
          max={10000}
          onChange={handleCollectionSizeChange}
          valueLabelDisplay="off"
          marks
          classes={{
            rail: styles.rail,
            track: styles.track,
            root: styles.root,
            mark: styles.markSize,
            markActive: styles.markSizeActive,
            thumb: styles.thumb,
          }}
        />
      </Group>
      <Typography display="block" align="center" variant="overline" mb={1}>
        PROBABILITY OF SOLD OUT
      </Typography>
      <Stack direction="row" gap={1} justifyContent="center" alignItems="center">
        <Typography display="block" align="center" variant="h4">
          {formatPercent(mintShare)}
        </Typography>
        <Label variant="outlined">{sharePredict}</Label>
      </Stack>
      {open ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '50%' }}>
            {error}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </Root>
  );
};

export default MlPrediction;
