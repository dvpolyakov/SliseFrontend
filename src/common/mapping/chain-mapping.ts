import { Networks } from '../enums/networks';
import { MlPredictionModel } from '../models/mlprediction-model';
import { MlPredictionSuccess } from '../enums/mlprediction-success';

export const getBlockchainSymbol = (network: Networks) => {
  switch (network) {
    case Networks.SOLANA:
      return '◎';
    case Networks.POLYGON:
      return 'MATIC';
    case Networks.ETHEREUM:
      return 'Ξ';
  }
}

export const mapMlPredictionResult = (result: number, network: Networks): MlPredictionModel => {
  let chance = result * 10;

  switch (network) {
    case Networks.ETHEREUM:
      break;
    case Networks.POLYGON:
      break;
    case Networks.SOLANA:
      chance = chance * 10;
      console.log(chance);
      break;
  }

  return {
    predictionResult: chance,
    successChance: calculateChance(chance)
  }
}

const calculateChance = (chance: number): MlPredictionSuccess => {
  switch (true) {
    case (chance > 0.0 && chance <= 0.4):
      return MlPredictionSuccess.Low;
    case  (chance > 0.4 && chance <= 0.8):
      return MlPredictionSuccess.Medium;
    case (chance > 0.8):
      return MlPredictionSuccess.High;
    default:
      return MlPredictionSuccess.Unknown;
  }
}

export const calculateMultiplicator = (val: number, network: Networks): number => {
  switch (network) {
    case Networks.ETHEREUM:
      return val;
    case Networks.POLYGON:
      return val * 0.00025;
    case Networks.SOLANA:
      return val * 0.0025;
  }
}