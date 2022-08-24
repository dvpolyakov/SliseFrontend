import { MlPredictionSuccess } from '../enums/mlprediction-success';

export interface MlPredictionModel {
  predictionResult: number;
  successChance: MlPredictionSuccess;
}