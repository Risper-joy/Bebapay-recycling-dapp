'use client'

import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'

export default function ConnectButton() {
  const { isConnected } = useAccount()
  
  return (
    <div className="wallet-connect">
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => {
          return (
            <button
              onClick={show}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              {isConnected ? (ensName || truncatedAddress) : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  )
}