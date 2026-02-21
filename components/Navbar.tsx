'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Appointments', href: '/appointments' },
  { name: 'Queue', href: '/queue' },
  { name: 'Staff', href: '/staff' },
  { name: 'Services', href: '/services' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo / App Name */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
        >
          SmartQueue
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  active
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  )
}
