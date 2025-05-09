// Modified Admin Page with Supabase integration and no deletion
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Edit, Save, ArrowUpDown } from "lucide-react"

interface BarcodeData {
  id: string
  code: string
  format: string
  timestamp: string
  weight: number | null
  reward: number
  status: string
  wallet_address: string
}

export default function AdminPage() {
  const [barcodes, setBarcodes] = useState<BarcodeData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [editingBarcode, setEditingBarcode] = useState<BarcodeData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof BarcodeData; direction: "asc" | "desc" } | null>(null)

  useEffect(() => {
    const fetchBarcodes = async () => {
      const { data, error } = await supabase.from("barcodes").select("*").order("timestamp", { ascending: false })
      if (data) setBarcodes(data)
      if (error) console.error("Error fetching barcodes:", error)
    }
    fetchBarcodes()
  }, [])

  const filteredBarcodes = barcodes.filter((barcode) => {
    const matchesSearch =
      barcode.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barcode.format.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? barcode.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  const sortedBarcodes = [...filteredBarcodes].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    const valueA = a[key]
    const valueB = b[key]
    if (valueA == null && valueB == null) return 0
    if (valueA == null) return 1
    if (valueB == null) return -1
    if (valueA < valueB) return direction === "asc" ? -1 : 1
    if (valueA > valueB) return direction === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (key: keyof BarcodeData) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc"
    }
    setSortConfig({ key, direction })
  }

  const handleWeightChange = (weight: string) => {
    if (editingBarcode) {
      const numWeight = Number.parseFloat(weight)
      const calculatedReward = !isNaN(numWeight) ? Math.round(numWeight * 20) : 0
      setEditingBarcode({
        ...editingBarcode,
        weight: !isNaN(numWeight) ? numWeight : null,
        reward: calculatedReward,
        status: !isNaN(numWeight) && numWeight > 0 ? "processed" : "pending",
      })
    }
  }

  const saveWeight = async () => {
    if (editingBarcode?.id) {
      const { error } = await supabase.from("barcodes").update({
        weight: editingBarcode.weight,
        reward: editingBarcode.reward,
        status: editingBarcode.status,
      }).eq("id", editingBarcode.id)

      if (!error) {
        setBarcodes(barcodes.map((b) => (b.id === editingBarcode.id ? editingBarcode : b)))
        setEditingBarcode(null)
        setIsDialogOpen(false)
      }
    }
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "processed":
        return <Badge className="bg-green-500">Processed</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard('Collection Center')</CardTitle>
            <CardDescription className="text-black">Manage barcodes and assign weights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search barcodes..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4 text-black" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-black">Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("processed")}>Processed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort("code")} className="text-black">Barcode <ArrowUpDown className="h-4 w-4 inline" /></TableHead>
                    <TableHead onClick={() => handleSort("format")} className="text-black">Format <ArrowUpDown className="h-4 w-4 inline" /></TableHead>
                    <TableHead onClick={() => handleSort("timestamp")} className="text-black">Date <ArrowUpDown className="h-4 w-4 inline" /></TableHead>
                    <TableHead onClick={() => handleSort("weight")} className="text-black">Weight <ArrowUpDown className="h-4 w-4 inline" /></TableHead>
                    <TableHead onClick={() => handleSort("reward")} className="text-black">Reward <ArrowUpDown className="h-4 w-4 inline" /></TableHead>
                    <TableHead onClick={() => handleSort("status")} className="text-black">Status <ArrowUpDown className="h-4 w-4 inline" /></TableHead>
                    <TableHead className="text-black">Wallet Address</TableHead>
                    <TableHead className="text-right text-black">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBarcodes.map((barcode) => (
                    <TableRow key={barcode.id}>
                      <TableCell className="text-black">{barcode.code}</TableCell>
                      <TableCell className="text-black">{barcode.format}</TableCell>
                      <TableCell className="text-black">{formatDate(barcode.timestamp)}</TableCell>
                      <TableCell className="text-black">{barcode.weight}</TableCell>
                      <TableCell className="text-black">{barcode.reward}</TableCell>
                      <TableCell className="text-black">{getStatusBadge(barcode.status)}</TableCell>
                      <TableCell className="text-black">{barcode.wallet_address}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setEditingBarcode(barcode)}><Edit className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Edit Barcode</DialogTitle></DialogHeader>
                            {editingBarcode && (
                              <div className="grid gap-4 py-4">
                                <Label className="text-black">Weight (kg)</Label>
                                <Input className="text-black" type="number" value={editingBarcode.weight || ""} onChange={(e) => handleWeightChange(e.target.value)} />
                                <Label className="text-black">Reward</Label>
                                <Input  className="text-black"value={editingBarcode.reward} disabled />
                                <Label className="text-black">Status</Label>
                                {getStatusBadge(editingBarcode.status)}
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingBarcode(null)}>Cancel</Button>
                              <Button onClick={saveWeight}><Save className="h-4 w-4 mr-2" /> Save</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {sortedBarcodes.length} of {barcodes.length} barcodes
            </div>
            {statusFilter && (
              <Button variant="outline" onClick={() => setStatusFilter(null)}>Clear Filter</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
