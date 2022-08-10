import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../components/wallet/connectors'
import { useWeb3React } from '@web3-react/core';
import { authUser } from '../utils/authUtils';
import { useRouter } from 'next/router';
import { ethers } from "ethers";

export const MetaMaskContext = React.createContext(null)

export const MetaMaskProvider = ({ children }: any) => {
  const router = useRouter();
  const { activate, account, library, connector, active, deactivate } = useWeb3React()
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(true) // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

      return {
        message,
        signature,
        address
      };
    } catch (err) {
      setError(err.message);
    }
  };

  // Init Loading
  useEffect(() => {
    connect().then(val => {
      setIsLoading(false)
    });
  }, [])

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(async () => {
    console.log('App is connected with MetaMask ', active)
    //await authUser(account!, 'Ethereum', true);
    setIsActive(active);
  }, [active])

  useEffect(() => {
    handleIsActive()
  }, [handleIsActive])

  const clickConnect = async () => {
    await connect().then(async(res) => {
      await authUser(account!, 'Ethereum');
      window.location = '/dashboard';
    })
  }

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log('Connecting to MetaMask...')
    setShouldDisable(true)
    try {
      await activate(injected).then(async () => {
        setShouldDisable(false);
        if (account) {
         /* const sig = await signMessage({
            setError,
            message: account
          });
          if (sig) {*/

           /* await authUser(account!, 'Ethereum', true);
            await router.push('/dashboard');*/

         /* }*/
        }
      })
    } catch (error) {
      console.log('Error on connecting: ', error)
    }
  }

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    console.log('Disconnecting wallet from App...')
    try {
      await deactivate()
    } catch (error) {
      console.log('Error on disconnnect: ', error)
    }
  }

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
      shouldDisable,
      clickConnect
    }),
    [isActive, isLoading, shouldDisable, account]
  )

  return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext)

  if (context === undefined) {
    throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
  }

  return context
}