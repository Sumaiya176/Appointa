'use client'

import { Staff } from '@/app/constants/types'
import { useMemo, useState } from 'react'

type Status = 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show'



interface Service {
  id: string
  name: string
  duration: number
  requiredStaffType: string
}

interface AppointmentFormProps {
  staffList: Staff[]
  services: Service[]
  onSubmit?: (data: any) => void
}

export default function AppointmentForm({
  staffList,
  services,
  onSubmit,
}: AppointmentFormProps) {
  const [customerName, setCustomerName] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null)

  const selectedService = services.find((s) => s.id === serviceId)

  const eligibleStaff = useMemo(() => {
    if (!selectedService) return []
    return staffList.filter(
      (s) => s.availability === 'Available'
    )
  }, [staffList, selectedService])

  const selectedStaff = staffList.find(
    (s) => s.id === selectedStaffId
  )

  const isAtCapacity =
    selectedStaff &&
    selectedStaff.bookedToday >= selectedStaff.capacity

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const appointmentData = {
      customerName,
      serviceId,
      datetime: `${date}T${time}`,
      staffId: selectedStaffId,
      status: selectedStaffId ? 'Scheduled' : 'Scheduled (Queue)',
    }

    console.log('Appointment Created:', appointmentData)
    onSubmit?.(appointmentData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold">
        Create Appointment
      </h2>

      {/* Customer Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Customer Name
        </label>
        <input
          type="text"
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {/* Service */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Service
        </label>
        <select
          required
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value)
            setSelectedStaffId(null)
          }}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} ({service.duration} min)
            </option>
          ))}
        </select>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Time
          </label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>

      {/* Staff Selection */}
      {selectedService && (
        <div>
          <label className="mb-2 block text-sm font-medium">
            Assign Staff
          </label>

          {eligibleStaff.length === 0 && (
            <p className="text-sm text-red-600">
              No available staff. Appointment will go to queue.
            </p>
          )}

          <div className="space-y-2">
            {eligibleStaff.map((staff) => {
              const full =
                staff.bookedToday >= staff.capacity

              return (
                <label
                  key={staff.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md border p-3 ${
                    full
                      ? 'border-red-200 bg-red-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="staff"
                      value={staff.id}
                      disabled={full}
                      checked={selectedStaffId === staff.id}
                      onChange={() =>
                        setSelectedStaffId(staff.id)
                      }
                    />
                    <span className="text-sm font-medium">
                      {staff.name}
                    </span>
                  </div>

                  <span
                    className={`text-xs ${
                      full
                        ? 'text-red-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {staff.bookedToday} / {staff.capacity}
                  </span>
                </label>
              )
            })}
          </div>

          {isAtCapacity && (
            <p className="mt-2 text-sm text-red-600">
              This staff member has reached daily capacity.
            </p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Create Appointment
      </button>
    </form>
  )
}