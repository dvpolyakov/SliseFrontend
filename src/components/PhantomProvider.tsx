import React, { FC, useEffect, useMemo, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Button, Link, Typography } from '@mui/material';
import { authUser } from '../utils/authUtils';
import { router } from 'next/client';
import { useRouter } from 'next/router';
import { MetaMaskContext } from '../hooks/useMetamask';
import { deleteCookie } from 'cookies-next';

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: (args: any) => void) => void;
  isPhantom: boolean;
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider;
}
export const PhantomContext = React.createContext(null)

export const PhantomProvider = ({ children }: any) => {
  const router = useRouter();
  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState<PublicKey | null>(null);

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window as WindowWithSolana;
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        // Attemp an eager connection
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }
  }, []);

  useEffect(() => {
    provider?.on("connect", (publicKey: PublicKey) => {
      console.log(`connect event: ${publicKey}`);
      setConnected(true);
      setPubKey(publicKey);
    });
    provider?.on("disconnect", () => {
      console.log("disconnect event");
      setConnected(false);
      setPubKey(null);
    });

  }, [provider]);

  const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(`connect handler`);
    provider?.connect()
      .then((data) => {
        console.log(`public key ${data.publicKey}`);
        authUser(data.publicKey, 'Solana', true);
        router.push('/dashboard');
      })
      .catch((err) => {
        console.error("connect ERROR:", err);
      });
  }

  const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log("disconnect handler");
    provider?.disconnect()
      .catch((err) => {
        console.error("disconnect ERROR:", err);
      });
    deleteCookie('jwt-token');
    deleteCookie('jwt-token-exp');
    deleteCookie('current-chain');
    setPubKey(null);

  }
  const values = useMemo(
    () => ({
      walletAvail,
      provider,
      connected,
      pubKey,
      connectHandler,
      disconnectHandler,
    }),
    [walletAvail, provider, connected, pubKey]
  )

  return <PhantomContext.Provider value={values}>{children}</PhantomContext.Provider>
}
// <div>
//   {walletAvail ?
//     <>
//       <Button fullWidth variant="contained"  sx={{backgroundColor: '#513DBE', variant: 'contained', maxWidth: 480, height: 48, ':hover': { opacity: '.9', backgroundColor: '#513DBE' }}}  disabled={connected} onClick={connectHandler}>
//         <img src="/assets/phantom_l.svg" alt="MetaMask" width="24" height="24" style={{marginRight:8}}/> Phantom
//       </Button>
//       {/* <button disabled={!connected} onClick={disconnectHandler}>Disconnect from Phantom</button>*/}
//       {/*{ connected ? <p>Your public key is : {pubKey?.toBase58()}</p> : null }*/}
//     </>
//     :
//     <>
//       <Typography sx={{fontSize: 14, textAlign:'center'}}>Opps!!! Phantom is not available. Go get it <Link target="_blank" rel="noopener" href="https://phantom.app/">https://phantom.app/</Link>.</Typography>
//     </>
//   }
// </div>

export default function usePhantom() {
  const context = React.useContext(PhantomContext)

  if (context === undefined) {
    throw new Error('usePhantom hook must be used with a MetaMaskProvider component')
  }

  return context
}