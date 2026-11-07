'use server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient()

export async function logAction(action: string, details: string) {
  try {
    const session = await getServerSession()
    
    await prisma.activityLog.create({
      data: {
        userId: (session?.user as any)?.id || null,
 // Requiere que el ID esté en la sesión
        action: action,
        details: details,
      }
    })
    console.log(`Log saved: ${action} - ${details}`)
  } catch (error) {
    console.error("Failed to log action:", error)
  }
}
