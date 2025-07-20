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
  const CPH_CHAIN_ID = '16166'

  const connect = async () => {
    try {
      const { ethereum } = window as any
      if (!ethereum || !ethereum.isMetaMask) {
        console.warn("MetaMask is not installed or not available in this browser")
        return
      }

      const provider = new ethers.BrowserProvider(ethereum)

      const accounts = await provider.send("eth_requestAccounts", [])
      const network = await provider.getNetwork()

      console.log("Initial network:", network)

      // Switch to Cypherium network if not already connected
      if (network.chainId.toString() !== CPH_CHAIN_ID) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x3f26", // 16166 in hex
                chainName: "Cypherium Mainnet",
                nativeCurrency: {
                  name: "Cypherium",
                  symbol: "CPH",
                  decimals: 18
                },
                rpcUrls: ["https://pubnodes.cypherium.io/rpc"],
                blockExplorerUrls: ["https://explorer.cypherium.io"]
              }
            ]
          })
          console.log("Cypherium network added successfully.")
        } catch (addError) {
          console.error("Failed to add Cypherium network:", addError)
          return
        }
      }

      // Check again after adding
      const updatedNetwork = await provider.getNetwork()
      console.log("Updated network:", updatedNetwork)

      if (updatedNetwork.chainId.toString() !== CPH_CHAIN_ID) {
        console.warn("Still not connected to Cypherium network.")
        return
      }

      if (accounts.length > 0) {
        const address = accounts[0]
        const bal = await provider.getBalance(address)

        console.log("Connected account:", address)
        console.log("Account balance (in Wei):", bal.toString())
        console.log("Account balance (in ETH):", ethers.formatEther(bal))

        setAccount(address)
        setBalance(ethers.formatEther(bal))
        setChainId(updatedNetwork.chainId.toString())
      } else {
        console.warn("No accounts returned after requesting access.")
      }
    } catch (err) {
      console.error("Error during wallet connection:", err)
    }
  }

  const disconnect = () => {
    console.log("Disconnecting wallet...")
    setAccount(null)
    setBalance(null)
    setChainId(null)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const { ethereum } = window as any
        if (ethereum && ethereum.isMetaMask) {
          const provider = new ethers.BrowserProvider(ethereum)
          const accounts = await provider.listAccounts()
          if (accounts.length > 0) {
            const address = accounts[0].address
            const bal = await provider.getBalance(address)
            const net = await provider.getNetwork()

            console.log("Restored session for account:", address)

            setAccount(address)
            setBalance(ethers.formatEther(bal))
            setChainId(net.chainId.toString())
          }
        }
      } catch (err) {
        console.error("Error during initial wallet check:", err)
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
