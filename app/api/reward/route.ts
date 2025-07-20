// app/api/reward/route.ts
import { NextResponse } from 'next/server'
import { ethers } from 'ethers'
import { supabase } from '@/lib/supabase'
import BabaPayABI from '@/lib/abis/BabaPay.json'

const RPC_URL = process.env.RPC_URL!
const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY!
const CONTRACT_ADDRESS = process.env.BABAPAY_CONTRACT!

const provider = new ethers.JsonRpcProvider(RPC_URL)
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
const contract = new ethers.Contract(CONTRACT_ADDRESS, BabaPayABI, wallet)

export async function POST() {
  try {
    const { data, error } = await supabase
      .from('barcodes')
      .select('*')
      .eq('status', 'processed')

    if (error) throw error
    if (!data.length) return NextResponse.json({ message: 'No pending rewards.' })

    const rewarded: string[] = []

    for (const b of data) {
      try {
        const timestamp = Math.floor(Date.now() / 1000)
        const dummySignature = '0x00'

        const tx = await contract.submitRecyclingFromOracle(
          b.wallet_address,
          b.code,
          b.weight,
          timestamp,
          dummySignature
        )
        await tx.wait()

        await supabase
          .from('barcodes')
          .update({ status: 'rewarded' })
          .eq('id', b.id)

        rewarded.push(b.code)
      } catch (err) {
        console.error(`Failed for barcode ${b.code}:`, err)
      }
    }

    return NextResponse.json({ message: 'Rewarded users successfully', rewarded })
  } catch (err) {
    console.error('Reward API error:', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
