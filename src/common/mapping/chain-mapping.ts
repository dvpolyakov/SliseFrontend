import { Networks } from '../enums/networks';

export const getBlockchainSymbol = (network: Networks) => {
  switch (network){
    case Networks.SOLANA:
      return '◎';
    case Networks.POLYGON:
      return 'MATIC';
    case Networks.ETHEREUM:
      return 'Ξ';
  }
}