import { Box, Button, Chip, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SvgIconStyle from 'src/components/SvgIconStyle';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { ethers } from 'ethers';
import { authUser, authWhitelistMember } from '../../utils/authUtils';
import usePhantom from '../../hooks/usePhantom';
import axiosInstance from '../../utils/axios';

type Status = 'fail' | 'success' | 'initial';
type Props = {
  onChange: (v: Status) => void;
  handleAddress: (address: string) => void;
  status: Status;
  minValue: number;
  blockchain: string;
  link: string
};

export function RegistrationWallet({ onChange, status, minValue, blockchain, handleAddress }: Props) {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const [currency, setCurrency] = useState<string | null>(null);
  const [data, setdata] = useState<null>(null);
  const [adrress, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState(null);

  // Button handler button for handling a
  // request event for metamask
  const btnhandler = useCallback( async () => {

    // Asking if metamask is already present or not
    if (window.ethereum) {

      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (res) => {
          const sig = await signMessage({
            setError,
            message: res[0]
          });
          const ethBalance = await accountChangeHandler(res[0]);
          if(ethBalance < minValue){
            onChange('fail');
            return;
          }
          onChange('success');
          handleAddress(res[0]);
        });
    } else {
    }
  },[balance]);
  const getbalance = async (address): Promise<string> => {

    // Requesting balance method
    const balance = await window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"]
      })
    const parsed = parseInt(balance, 16).toString();
    const weiValue = 100000;
    const ethValue = ethers.utils.formatEther(parsed);
    return ethValue;

  };

  const signMessage = async ({ setError, message }) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
      /*const authResult = await authWhitelistMember(message, blockchain, link);
      console.log(authResult)*/
      return {
        message,
        signature,
        address
      };
    } catch (err) {
      setError(err.message);
    }
  };

  // Function for getting handling all events
  const accountChangeHandler = async (account: string): Promise<number> => {
    // Setting an address data

    // Setting a balance
    const balance = await getbalance(account);
    console.log(balance);
    setAddress(account);
    setBalance(+balance);
    return +balance;
  };
  const {
    walletAvail,
    provider,
    connected,
    pubKey,
    connectHandler,
    disconnectHandler,
    solBalance,
    connectWhitelistMemberHandler
  } = usePhantom();
  const setChainCurrency = useCallback(() => {
    switch (blockchain) {
      case 'Ethereum':
        setCurrency('ETH');
        break;
      case 'Polygon':
        setCurrency('MATIC');
        break;
      case 'Solana':
        setCurrency('SOL');
        break;
      default:
        setCurrency('None');
        break;
    }
  }, [isMountedRef]);

  const connectPhantom = () => {
    connectWhitelistMemberHandler();
    if(solBalance < minValue){
      onChange('fail');
      return;
    }
  }

  const connectWhitelistMemberHandler2 = async () => {
    console.log(`connect handler`);
    if (window.solana) {
      window.solana.connect()
        .then(async (data) => {
          window.solana
            .signMessage(
              new TextEncoder().encode(data.publicKey),
              'utf8'
            ).then(async (sign) => {
            if (sign.signature) {
              console.log(`asdsasdads ${data.publicKey}`);
              setAddress(data.publicKey.toString());
              const response = await axiosInstance.get(`${process.env.BACKEND_URL}analytics/solBalance?address=${data.publicKey}`);
              const solBal = response.data.data;
              if(solBal < minValue){
                onChange('fail');
                return;
              }
              onChange('success');
              handleAddress(data.publicKey.toString());
            }
          })

        })
        .catch((err) => {
          console.error("connect ERROR:", err);
        });
    }
  }

  const handleClick = useCallback(async () => {
    if(blockchain === 'Solana')
      await connectWhitelistMemberHandler2();
    else await btnhandler();

  }, [onChange]);

  const handleDelete = useCallback(() => {
    onChange('initial');
  }, [onChange]);

  useEffect(() => {
    setChainCurrency();
  }, [setChainCurrency]);

  const mapping = useMemo(
    () => ({
      fail: {
        borderColor: '#FF48427A',
        backgroundColor: '#FF484214',
        color: '#B72136',
        icon1: <SvgIconStyle src={`/assets/icons/ic_remove.svg/`} sx={{ width: 1, height: 1, bgcolor: '#B72136' }}/>,
        icon2: <SvgIconStyle src={`/assets/icons/ic_remove.svg/`} sx={{ width: 1, height: 1, bgcolor: '#B72136' }}/>,
        button1: <Chip sx={{ background: '#fff' }} label={adrress?.substring(0,10) || ''} onDelete={handleDelete}/>,
        size: 'min-content',
      },
      success: {
        borderColor: '#54D62C7A',
        backgroundColor: '#54D62C14',
        color: '#229A16',
        icon1: <SvgIconStyle src={`/assets/icons/ic_check.svg/`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }}/>,
        icon2: <SvgIconStyle src={`/assets/icons/ic_check.svg/`} sx={{ width: 1, height: 1, bgcolor: '#229A16' }}/>,
        button1: <Chip sx={{ background: '#fff' }} label={adrress?.substring(0,10) || ''} onDelete={handleDelete}/>,
        size: 'min-content',
      },
      initial: {
        borderColor: '#E5E8EB',
        backgroundColor: '#fff',
        color: '#131F0F',
        icon1: <SvgIconStyle src={`/assets/icons/ic_user.svg/`} sx={{ width: 1, height: 1 }}/>,
        icon2: <Typography variant="h6">💵</Typography>,
        button1: blockchain !== 'Solana' ? (
          <Button
            onClick={handleClick}
            variant="contained"
            size="small"
            sx={{
              padding: theme.spacing(0.5, 1),
              color: '#fff',
              backgroundColor: '#131F0F',
              boxShadow: 'none',
              ':hover': { opacity: '.6', backgroundColor: '#131F0F', boxShadow: 'none' },
            }}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            variant="contained"
            size="small"
            sx={{
              padding: theme.spacing(0.5, 1),
              color: '#fff',
              backgroundColor: '#131F0F',
              boxShadow: 'none',
              ':hover': { opacity: '.6', backgroundColor: '#131F0F', boxShadow: 'none' },
            }}
          >
            Connect Wallet
          </Button>
        ),
        size: '120px',
      },
    }),
    [handleClick, handleDelete, theme]
  );

  return (
    <>
      <Box
        sx={{
          mb: 2,
          border: '1px solid',
          borderColor: mapping[status].borderColor,
          backgroundColor: mapping[status].backgroundColor,
          padding: theme.spacing(2.5, 2),
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: `20px 1fr ${mapping[status].size}`,
            gap: 1,
          }}
        >
          {mapping[status].icon1}
          <Typography variant="body2" color={mapping[status].color}>
            Connect your mint wallet
          </Typography>
          {mapping[status].button1}
        </Box>
        {status === 'fail' && (
          <Typography ml={3.25} variant="caption" color={mapping[status].color}>
            The requirement is not met
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          border: '1px solid',
          borderColor: mapping[status].borderColor,
          backgroundColor: mapping[status].backgroundColor,
          padding: theme.spacing(2.5, 2),
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '20px 1fr', gap: 1 }}>
          {mapping[status].icon2}
          <Typography variant="body2" color={mapping[status].color}>
            The minimum balance of {minValue} {currency} is required
          </Typography>
        </Box>
        {status === 'fail' && (
          <Typography ml={3.25} variant="caption" color={mapping[status].color}>
            The requirement is not met
          </Typography>
        )}
      </Box>
    </>
  );
}
