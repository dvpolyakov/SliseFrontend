import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../components/wallet/connectors'
import { useWeb3React } from '@web3-react/core';
import { authUser } from '../utils/authUtils';
import { useRouter } from 'next/router';

export const MetaMaskContext = React.createContext(null)

export const MetaMaskProvider = ({ children }: any) => {
  const router = useRouter();
  const { activate, account, library, connector, active, deactivate } = useWeb3React()
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShouldDisable] = useState(true) // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(false);

  // Init Loading
  useEffect(() => {
    connect().then(val => {
      setIsLoading(false)
    });
  }, [])

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(async () => {
    console.log('App is connected with MetaMask ', active)
    await authUser(account!, 'Ethereum');
    setIsActive(active);
    await router.push('dashboard');
  }, [active])

  useEffect(() => {
    handleIsActive()
  }, [handleIsActive])

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log('Connecting to MetaMask...')
    setShouldDisable(true)
    try {
      await activate(injected).then(async () => {
        setShouldDisable(false);
        if (account) {
          await authUser(account!, 'Ethereum');
          await router.push('dashboard');
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
      shouldDisable
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