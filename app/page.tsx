import { useMemo } from 'react'

type Status = 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show'

interface Appointment {
  id: string
  customerName: string
  service: string
  staff: string
  datetime: string
  status: Status
}

const appointments: Appointment[] = [
  {
    id: '1',
    customerName: 'John Doe',
    service: 'Consultation',
    staff: 'Riya',
    datetime: '2026-02-21T09:30:00Z',
    status: 'Scheduled',
  },
  {
    id: '2',
    customerName: 'Sara Khan',
    service: 'Check-up',
    staff: 'Farhan',
    datetime: '2026-02-21T10:00:00Z',
    status: 'Completed',
  },
  {
    id: '3',
    customerName: 'Michael Smith',
    service: 'Consultation',
    staff: 'Riya',
    datetime: '2026-02-21T11:00:00Z',
    status: 'Completed',
  },
  {
    id: '4',
    customerName: 'Emma Wilson',
    service: 'Support Session',
    staff: 'Alex',
    datetime: '2026-02-21T11:30:00Z',
    status: 'Scheduled',
  },
  {
    id: '5',
    customerName: 'Daniel Lee',
    service: 'Consultation',
    staff: 'Farhan',
    datetime: '2026-02-21T12:00:00Z',
    status: 'Cancelled',
  },
  {
    id: '6',
    customerName: 'Olivia Brown',
    service: 'Check-up',
    staff: 'Riya',
    datetime: '2026-02-21T13:00:00Z',
    status: 'Scheduled',
  },
  {
    id: '7',
    customerName: 'James Taylor',
    service: 'Support Session',
    staff: 'Alex',
    datetime: '2026-02-21T14:00:00Z',
    status: 'Completed',
  },
  {
    id: '8',
    customerName: 'Sophia Davis',
    service: 'Consultation',
    staff: 'Farhan',
    datetime: '2026-02-21T15:00:00Z',
    status: 'No-Show',
  },
  {
    id: '9',
    customerName: 'Liam Johnson',
    service: 'Check-up',
    staff: 'Riya',
    datetime: '2026-02-21T16:00:00Z',
    status: 'Scheduled',
  },
  {
    id: '10',
    customerName: 'Isabella Martinez',
    service: 'Consultation',
    staff: 'Alex',
    datetime: '2026-02-21T17:00:00Z',
    status: 'Completed',
  },
]

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

function StatusBadge({ status }: { status: Status }) {
  const base = 'rounded-full px-3 py-1 text-xs font-medium'

  const styles: Record<Status, string> = {
    Scheduled: 'bg-gray-100 text-gray-800',
    Completed: 'bg-black text-white',
    Cancelled: 'bg-red-100 text-red-700',
    'No-Show': 'bg-yellow-100 text-yellow-700',
  }

  return <span className={`${base} ${styles[status]}`}>{status}</span>
}
export default function Home() {
 const totalToday = appointments.length

  const completed = useMemo(
    () => appointments.filter((a) => a.status === 'Completed').length,
    []
  )

  const pending = useMemo(
    () =>
      appointments.filter(
        (a) => a.status === 'Scheduled'
      ).length,
    []
  )

  const queueCount = 3 // Dummy queue number
  return (
    <main className="flex min-h-screen items-center justify-center text-black text-4xl font-bold">
        <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Today’s operational overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Appointments Today
          </p>
          <p className="mt-2 text-3xl font-bold">
            {totalToday}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed vs Pending
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completed</span>
              <span className="font-medium">{completed}</span>
            </div>

            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-black"
                style={{
                  width: `${(completed / totalToday) * 100}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span>Pending</span>
              <span className="font-medium">{pending}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Waiting Queue
          </p>
          <p className="mt-2 text-3xl font-bold">
            {queueCount}
          </p>
        </div>
      </div>

      {/* Appointment Table */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Today’s Appointments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Staff</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {a.customerName}
                  </td>
                  <td className="px-6 py-4">{a.service}</td>
                  <td className="px-6 py-4">{a.staff}</td>
                  <td className="px-6 py-4">
                    {formatDate(a.datetime)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </main>
  )
}
