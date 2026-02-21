'use client'

import AuthCard from '@/components/AuthCard'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // 🔗 Replace with real API call
    console.log({ email, password })
  }

  return (
    <AuthCard
      title="Create an account"
      subtitle="Sign up using your email and password"
    >
      <form onSubmit={handleRegister} className="space-y-4">
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
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-black hover:underline">
            Login
          </a>
        </p>
      </form>
    </AuthCard>
  )
}
