import { Whitelist } from '../models/models';
import { BAYC } from './BAYC';
import { IKIGAI } from './IKIGAI';

export const whitelistMapper = (id: string): any => {
  let wl;
  switch (id) {
    case '1':
      wl = IKIGAI;
      break;
    default:
      break;
  }
  return wl;
}

export const sampleWlIds: Whitelist[] = [
  {
    id: '1',
    name: 'IKIGAI',
    networkType: 'Ethereum',
    logo: 'https://nftcalendar.io/storage/uploads/2022/05/18/red_0518202219120762854507cfef1.jpg'
  }
]

export const mockIds: string[] = [
  '1'
]