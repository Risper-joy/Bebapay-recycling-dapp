// wallet-context.tsx
"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"

type WalletContextType = {
  account: string | null
  balance: string | null
  chainId: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)

  const connect = async () => {
    const { ethereum } = window as any
    if (!ethereum || !ethereum.isMetaMask) return
    const provider = new ethers.BrowserProvider(ethereum)
    const accounts = await provider.send("eth_requestAccounts", [])
    if (accounts.length > 0) {
      const address = accounts[0]
      setAccount(address)
      const bal = await provider.getBalance(address)
      setBalance(ethers.formatEther(bal))
      const net = await provider.getNetwork()
      setChainId(net.chainId.toString())
    }
  }

  const disconnect = () => {
    setAccount(null)
    setBalance(null)
    setChainId(null)
  }

  useEffect(() => {
    const init = async () => {
      const { ethereum } = window as any
      if (ethereum && ethereum.isMetaMask) {
        const provider = new ethers.BrowserProvider(ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setAccount(accounts[0].address)
          const bal = await provider.getBalance(accounts[0].address)
          setBalance(ethers.formatEther(bal))
          const net = await provider.getNetwork()
          setChainId(net.chainId.toString())
        }
      }
    }
    init()
  }, [])

  return (
    <WalletContext.Provider value={{ account, balance, chainId, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) throw new Error("useWallet must be used inside WalletProvider")
  return context
}
