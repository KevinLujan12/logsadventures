import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Happy Fishermen Community',
  description: 'The best fishermen community platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Navbar Profesional */}
        <nav className="bg-brand-dark text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-2xl">🎣</span>
                <Link href="/" className="font-bold text-xl tracking-wide hover:text-brand-secondary transition">
                  Happy Fishermen
                </Link>
              </div>
              <div className="flex gap-6 items-center">
                <Link href="/" className="text-gray-300 hover:text-white font-medium transition">
                  Home
                </Link>
                <Link href="/admin" className="text-gray-300 hover:text-white font-medium transition">
                  Admin Control
                </Link>
                <Link href="/api/auth/signin" className="bg-brand-secondary hover:bg-blue-500 text-white px-5 py-2 rounded-md font-semibold shadow-sm transition">
                  Login / Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-brand-dark text-gray-400 py-8 text-center border-t border-gray-800">
          <p>© 2026 Happy Fishermen Community. Sistema de Logs y Control Activo.</p>
        </footer>
      </body>
    </html>
  )
}
