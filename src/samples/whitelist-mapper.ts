import { Whitelist } from '../models/models';
import { BAYC } from './BAYC';

export const whitelistMapper = (id: string): any => {
  let wl;
  switch (id) {
    case '1':
      wl = BAYC;
      break;
    default:
      break;
  }
  return wl;
}

export const sampleWlIds: Whitelist[] = [
  {
    id: '1',
    name: 'BAYC',
    networkType: 'Ethereum'
  }
]

export const mockIds: string[] = [
  '1'
]