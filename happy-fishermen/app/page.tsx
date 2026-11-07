import TestButton from '../components/TestButton'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'


const prisma = new PrismaClient()

export default async function Home() {
  const topFishermen = await prisma.fisherman.findMany({
    orderBy: { rank: 'asc' },
    take: 10
  })

  async function subscribe(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    if(name && email) {
        const prismaServer = new PrismaClient()
        await prismaServer.subscriber.create({ data: { name, email } })
        await prismaServer.activityLog.create({
            data: { action: 'SUBSCRIBE', details: `New subscriber: ${email}` }
        })
    }
  }

  return (
    <div className="bg-brand-light min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-brand-primary text-white py-20 px-4 text-center shadow-inner">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Welcome to the Happy Fishermen</h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
          Discover the top 10 fishermen, explore their best catches, and join a community dedicated to the art of fishing.
        </p>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Sentry Test Panel */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-md border-l-4 border-red-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">System Admin Tools</h3>
            <p className="text-gray-600 text-sm">Generate an intentional error to capture Sentry.io dashboard screenshots for your assignment.</p>
          </div>
          <TestButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Top 10 List */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-brand-dark">Top 10 Fishermen</h2>
              <span className="bg-brand-secondary text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Official Ranking</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topFishermen.length === 0 ? (
                <div className="col-span-full bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                  <p className="text-gray-500">No fishermen added yet. Use the Admin Control to add data.</p>
                </div>
              ) : null}
              {topFishermen.map(fisherman => (
                <Link href={`/fisherman/${fisherman.id}`} key={fisherman.id} 
                      className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-brand-secondary transition duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition">
                      {fisherman.name}
                    </h3>
                    <span className="text-2xl font-black text-gray-200">#{fisherman.rank}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600"><strong className="text-gray-800">Best Catch:</strong> {fisherman.bestCatches}</p>
                    <p className="text-sm text-gray-600 truncate"><strong className="text-gray-800">Common:</strong> {fisherman.commonCatches}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 text-brand-secondary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View full profile <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Sidebar / Subscription Form */}
          <section>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-secondary mb-4 text-2xl">
                  🌊
                </div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Join the Community</h2>
                <p className="text-gray-600 text-sm">Subscribe to the Happy Fishermen community and get the latest top catches in your inbox.</p>
              </div>
              
              <form action={subscribe} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" required 
                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition" 
                         placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" required 
                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition" 
                         placeholder="john@example.com" />
                </div>
                <button type="submit" className="w-full bg-brand-dark hover:bg-brand-primary text-white p-3 rounded-lg font-bold shadow-md transition duration-200 mt-2">
                  Subscribe Now
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
