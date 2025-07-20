"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [collectionPoint, setCollectionPoint] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (name && collectionPoint && password) {
      // Optionally validate password here
      localStorage.setItem("admin", JSON.stringify({
        name,
        collection_point: collectionPoint,
        password
      }))
      router.push("/admin")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            className="text-black"
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="text-black"
            placeholder="Collection Point"
            value={collectionPoint}
            onChange={(e) => setCollectionPoint(e.target.value)}
          />
          <Input
            className="text-black"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
