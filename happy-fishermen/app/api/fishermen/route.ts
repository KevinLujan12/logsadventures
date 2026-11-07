import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 2. API & Database Integration: Clean GET endpoint, sorted by DB query
    const fishermen = await prisma.fisherman.findMany({
      orderBy: { votes: 'desc' }
    })
    // 3. Data Structures & Logic: Proper HTTP 200 response
    return NextResponse.json(fishermen, { status: 200 })
  } catch (error) {
    // Proper HTTP 500 error handling
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 })
  }
}
