import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
        
        // Buscamos al usuario en la base de datos
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        })
        
        // Verificamos la contraseña
        if (user && await bcrypt.compare(credentials.password, user.passwordHash)) {
          // Retornamos solo ID y nombre para evitar errores de TypeScript
          return { id: user.id, name: user.username }
        }
        
        return null
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }