import { useSession } from "next-auth/react"

export default function Profile() {
  const { data: session } = useSession()

  if (!session) {
    return <p>Please log in to view your profile.</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      {session.user?.image && <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full" />}
    </div>
  )
}
