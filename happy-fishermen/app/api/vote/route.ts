import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // 3. Data Structures & Logic: JSON payload parsing
    const body = await request.json()
    const { id } = body

    if (!id) {
      // Proper HTTP 400 error validation
      return NextResponse.json({ error: "Fisherman ID is required" }, { status: 400 })
    }

    // 2. API & Database Integration: Persistent cloud DB update
    const updatedFisherman = await prisma.fisherman.update({
      where: { id },
      data: { votes: { increment: 1 } }
    })

    return NextResponse.json(updatedFisherman, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Database update failed" }, { status: 500 })
  }
}
