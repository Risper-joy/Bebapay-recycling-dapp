import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Debug environment variables
console.log('=== ENVIRONMENT VARIABLES DEBUG ===')
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'NOT SET')
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'NOT SET')
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'NOT SET')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('===================================')

// First, let's test without Supabase to isolate the issue
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log('User signing in:', user)
      return true
    },
    async session({ session, token }) {
      console.log('Session callback:', session)
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }