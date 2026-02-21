'use client'

import AuthCard from '@/components/AuthCard'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // 🔗 Replace with real API call
    console.log({ email, password })
  }

  const handleDemoLogin = () => {
    setEmail('demo@nextjs.com')
    setPassword('demopassword')

    // Optionally auto-submit here
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Login to your account"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Email address"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-2 text-sm font-semibold text-white hover:bg-gray-900 transition"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          Demo Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="font-medium text-black hover:underline">
            Register
          </a>
        </p>
      </form>
    </AuthCard>
  )
}
