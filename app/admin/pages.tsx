"use client"

import { useState } from "react"
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
import { Search, Filter, Edit, Trash, Save, Plus, ArrowUpDown } from "lucide-react"

// Define the type for barcode data
type BarcodeItem = {
  id: string
  code: string
  format: string
  timestamp: string
  weight: number | null
  reward: number
  status: "pending" | "processed" | "rejected"
}

export default function AdminPage() {
  // Sample data - in a real app, this would come from a database
  const [barcodes, setBarcodes] = useState<BarcodeItem[]>([
    {
      id: "1",
      code: "5901234123457",
      format: "EAN_13",
      timestamp: "2025-05-07T10:30:00Z",
      weight: null,
      reward: 0,
      status: "pending",
    },
    {
      id: "2",
      code: "9781234567897",
      format: "EAN_13",
      timestamp: "2025-05-07T11:15:00Z",
      weight: 0.5,
      reward: 10,
      status: "processed",
    },
    {
      id: "3",
      code: "0123456789012",
      format: "UPC_A",
      timestamp: "2025-05-07T12:45:00Z",
      weight: null,
      reward: 0,
      status: "pending",
    },
    {
      id: "4",
      code: "QR12345678",
      format: "QR_CODE",
      timestamp: "2025-05-06T09:30:00Z",
      weight: 1.2,
      reward: 24,
      status: "processed",
    },
    {
      id: "5",
      code: "CODE39-TEST",
      format: "CODE_39",
      timestamp: "2025-05-06T14:20:00Z",
      weight: null,
      reward: 0,
      status: "rejected",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [editingBarcode, setEditingBarcode] = useState<BarcodeItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof BarcodeItem; direction: "asc" | "desc" } | null>(null)

  // Filter barcodes based on search term and status filter
  const filteredBarcodes = barcodes.filter((barcode) => {
    const matchesSearch =
      barcode.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barcode.format.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? barcode.status === statusFilter : true

    return matchesSearch && matchesStatus
  })

  // Sort barcodes based on sort config
  const sortedBarcodes = [...filteredBarcodes].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig

    // Handle null or undefined values
    const valueA = a[key]
    const valueB = b[key]

    // If both values are null/undefined, consider them equal
    if (valueA == null && valueB == null) return 0

    // Null/undefined values should be sorted last regardless of direction
    if (valueA == null) return 1
    if (valueB == null) return -1

    // Normal comparison for non-null values
    if (valueA < valueB) return direction === "asc" ? -1 : 1
    if (valueA > valueB) return direction === "asc" ? 1 : -1
    return 0
  })

  // Handle sorting
  const handleSort = (key: keyof BarcodeItem) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc"
    }

    setSortConfig({ key, direction })
  }

  // Handle weight input and calculate reward
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

  // Save weight and reward
  const saveWeight = () => {
    if (editingBarcode) {
      setBarcodes(barcodes.map((barcode) => (barcode.id === editingBarcode.id ? editingBarcode : barcode)))
      setEditingBarcode(null)
      setIsDialogOpen(false)
    }
  }

  // Delete barcode
  const deleteBarcode = (id: string) => {
    setBarcodes(barcodes.filter((barcode) => barcode.id !== id))
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Get status badge color
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>Manage barcodes and assign weights</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
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
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("processed")}>Processed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-1 bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4" />
                      Add Barcode
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Barcode</DialogTitle>
                      <DialogDescription>Enter the barcode details and assign a weight</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="barcode">Barcode</Label>
                        <Input id="barcode" placeholder="Enter barcode" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="format">Format</Label>
                        <Input id="format" placeholder="e.g. EAN_13, QR_CODE" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input id="weight" type="number" step="0.1" min="0" placeholder="0.0" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700">Add Barcode</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("code")}>
                      <div className="flex items-center gap-1">
                        Barcode
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("format")}>
                      <div className="flex items-center gap-1">
                        Format
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("timestamp")}>
                      <div className="flex items-center gap-1">
                        Date
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("weight")}>
                      <div className="flex items-center gap-1">
                        Weight (kg)
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("reward")}>
                      <div className="flex items-center gap-1">
                        Reward
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBarcodes.length > 0 ? (
                    sortedBarcodes.map((barcode) => (
                      <TableRow key={barcode.id}>
                        <TableCell className="font-medium">{barcode.code}</TableCell>
                        <TableCell>{barcode.format}</TableCell>
                        <TableCell>{formatDate(barcode.timestamp)}</TableCell>
                        <TableCell>{barcode.weight !== null ? barcode.weight : "-"}</TableCell>
                        <TableCell>{barcode.reward}</TableCell>
                        <TableCell>{getStatusBadge(barcode.status)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setEditingBarcode(barcode)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Barcode</DialogTitle>
                                <DialogDescription>
                                  Update weight and reward for barcode {barcode.code}
                                </DialogDescription>
                              </DialogHeader>
                              {editingBarcode && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-code">Barcode</Label>
                                      <Input id="edit-code" value={editingBarcode.code} disabled />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-format">Format</Label>
                                      <Input id="edit-format" value={editingBarcode.format} disabled />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-weight">Weight (kg)</Label>
                                    <Input
                                      id="edit-weight"
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      value={editingBarcode.weight || ""}
                                      onChange={(e) => handleWeightChange(e.target.value)}
                                      placeholder="Enter weight"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-reward">Reward (calculated)</Label>
                                    <Input id="edit-reward" value={editingBarcode.reward} disabled />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-status">Status</Label>
                                    <div className="mt-1">{getStatusBadge(editingBarcode.status)}</div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingBarcode(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={saveWeight} className="bg-green-600 hover:bg-green-700">
                                  <Save className="h-4 w-4 mr-2" />
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => deleteBarcode(barcode.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No barcodes found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {sortedBarcodes.length} of {barcodes.length} barcodes
            </div>
            {statusFilter && (
              <Button variant="outline" onClick={() => setStatusFilter(null)}>
                Clear Filter
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
