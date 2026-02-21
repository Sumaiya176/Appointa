'use client'

import { useState } from 'react'

type Availability = 'Available' | 'On Leave'

interface StaffFormProps {
  defaultValues?: {
    name?: string
    serviceType?: string
    dailyCapacity?: number
    availability?: Availability
  }
  onSubmit?: (data: {
    name: string
    serviceType: string
    dailyCapacity: number
    availability: Availability
  }) => void
}

export default function StaffForm({
  defaultValues,
  onSubmit,
}: StaffFormProps) {
  const [name, setName] = useState(defaultValues?.name || '')
  const [serviceType, setServiceType] = useState(
    defaultValues?.serviceType || ''
  )
  const [dailyCapacity, setDailyCapacity] = useState(
    defaultValues?.dailyCapacity || 5
  )
  const [availability, setAvailability] = useState<Availability>(
    defaultValues?.availability || 'Available'
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      name,
      serviceType,
      dailyCapacity,
      availability,
    }

    console.log('Staff Submitted:', data)
    onSubmit?.(data)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-white p-6"
    >
      <h2 className="text-lg font-semibold">Create Staff Member</h2>

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Staff Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Service Type */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Service Type
        </label>
        <input
          type="text"
          required
          placeholder="Doctor / Consultant / Support Agent"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Daily Capacity */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Daily Capacity
        </label>
        <input
          type="number"
          min={1}
          value={dailyCapacity}
          onChange={(e) => setDailyCapacity(Number(e.target.value))}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Availability */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Availability Status
        </label>
        <select
          value={availability}
          onChange={(e) =>
            setAvailability(e.target.value as Availability)
          }
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="Available">Available</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Save Staff
      </button>
    </form>
  )
}
