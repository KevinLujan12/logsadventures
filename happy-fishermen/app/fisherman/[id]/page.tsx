import { PrismaClient } from '@prisma/client'
import { logAction } from '@/actions/logger'
import PdfButton from '@/components/PdfButton'

const prisma = new PrismaClient()

export default async function FishermanProfile({ params }: { params: { id: string } }) {
  const fisherman = await prisma.fisherman.findUnique({
    where: { id: params.id }
  })

  if (!fisherman) return <div>Fisherman not found</div>

  // Requirement: Log whenever someone is watching info about some fisherman
  await logAction("VIEW_FISHERMAN", `Viewed profile: ${fisherman.name}`)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div id="pdf-content" className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{fisherman.name} - Rank #{fisherman.rank}</h1>
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Best Catches</h2>
          <p className="text-gray-700 mt-2">{fisherman.bestCatches}</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Common Catches</h2>
          <p className="text-gray-700 mt-2">{fisherman.commonCatches}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Why are they on Top 10?</h2>
          <p className="text-gray-700 mt-2">{fisherman.justification}</p>
        </div>
      </div>
      
      <PdfButton elementId="pdf-content" fishermanName={fisherman.name} />
    </div>
  )
}