import { Whitelist } from '../models/models';
import { BAYC } from './BAYC';
import { IKIGAI } from './IKIGAI';
import { SOLPARK } from './SOLPARK';
import { DEGENAPEZ } from './DEGENAPEZ';

export const demoWhitelists: Whitelist[] = [
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
  },
  {
    id: '3',
    name: 'Degen Apez',
    networkType: 'Polygon',
    logo: 'https://img.rarible.com/prod/v1/image/t_gif_big/aHR0cHM6Ly9pcGZzLmlvL2lwZnMvYmFmeWJlaWdzajdweXQ2anJheGx1NXlidmltYTZqY3Vnb2RmenYyMjJqYm80aW91dHl3eWI2aHZ2Z3UvMTMxLmdpZg=='
  }
]

export const getDemoWhitelistById = (id: string) => {
  let wl;
  switch (id) {
    case '1':
      wl = IKIGAI;
      break;
    case '2':
      wl = SOLPARK;
      break;
    case '3':
      wl = DEGENAPEZ;
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

export const getBlockchainSymbol = (blockchain: string) => {
  let bc;
  switch (blockchain){
    case 'Solana':
      bc = '◎';
      break;
    case 'Polygon':
      bc = 'MATIC';
      break;
    case 'Ethereum':
      bc = 'Ξ';
      break;
    default:
      bc = 'Ξ';
      break;
  }
  return bc;
}

export const findWhitelistId = (whitelists: Whitelist[], name: string) => {
  let id;
  whitelists.map((list: any) => {
    if (list.name === name) id = list.id;
  });
  return id;
};

export const findWhitelistById = (data: Whitelist[], id: any): Whitelist => {
  let wl = demoWhitelists[0];
  data.map((list: any) => {
    if (list.id === id) wl = list;
  });
  return wl;
};