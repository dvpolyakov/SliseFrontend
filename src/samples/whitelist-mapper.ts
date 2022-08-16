import { Whitelist } from '../models/models';
import { BAYC } from './BAYC';
import { IKIGAI } from './IKIGAI';
import { SOLPARK } from './SOLPARK';

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
  },
  {
    id: '2',
    name: 'SolPark',
    networkType: 'Solana',
    logo: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/spn_pfp_1658604791034.gif'
  }
]

export const getSampleWhitelistById = (id: string) => {
  let wl;
  switch (id) {
    case '1':
      wl = IKIGAI;
      break;
    case '2':
      wl = SOLPARK;
      break;
    default:
      wl = IKIGAI;
      break
  }
  return wl;
}

export const mockIds: string[] = [
  '1',
  '2'
]

export const findWhitelistId = (whitelists: Whitelist[], name: string) => {
  let id;
  whitelists.map((list: any) => {
    if (list.name === name) id = list.id;
  });
  return id;
};

export const findWhitelistById = (data: Whitelist[], id: any): Whitelist => {
  let wl = sampleWlIds[0];
  data.map((list: any) => {
    if (list.id === id) wl = list;
  });
  return wl;
};