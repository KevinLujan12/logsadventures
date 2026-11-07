import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const session = await getServerSession();
  
  // Protección de ruta básica (Deberías verificar si el usuario tiene rol ADMIN en producción)
  if (!session) {
    redirect('/api/auth/signin');
  }

  const users = await prisma.user.findMany();
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { user: true }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Cat Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <ul>
            {users.map(u => (
              <li key={u.id} className="border-b py-2">{u.email} - Role: {u.role}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg overflow-auto max-h-96">
          <h2 className="text-xl font-semibold mb-4">System Logs</h2>
          <ul>
            {logs.map(log => (
              <li key={log.id} className="border-b py-2 text-sm">
                <span className="font-bold">{new Date(log.createdAt).toLocaleString()}</span> - 
                <span className="text-blue-600 ml-2">{log.action}</span>: {log.details} 
                (User: {log.user?.email || 'Anonymous'})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}