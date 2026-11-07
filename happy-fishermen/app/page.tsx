import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import TestButton from '../components/TestButton'
import VotingSection from '../components/VotingSection'

export default async function Home() {
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
      <div className="bg-brand-primary text-white py-20 px-4 text-center shadow-inner">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">Welcome to the Happy Fishermen</h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
          Vote for your favorite fishermen! The ranking updates live. Join the community and discover the best catches.
        </p>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-12 p-6 bg-white rounded-xl shadow-md border-l-4 border-red-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">System Admin Tools</h3>
            <p className="text-gray-600 text-sm">Generate an intentional error to capture Sentry.io dashboard screenshots.</p>
          </div>
          <TestButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-brand-dark">Top 10 Live Ranking</h2>
              <span className="bg-green-500 animate-pulse text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">🔴 Live Voting</span>
            </div>
            
            {/* Dynamic Client Component handles the voting and sorting */}
            <VotingSection />

          </section>

          <section>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-secondary mb-4 text-2xl">🌊</div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Join the Community</h2>
                <p className="text-gray-600 text-sm">Subscribe to get the latest top catches in your inbox.</p>
              </div>
              
              <form action={subscribe} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none transition" placeholder="john@example.com" />
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
