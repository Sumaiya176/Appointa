// 'use client'

// import { Staff } from '@/app/constants/types'
// import { useMemo, useState } from 'react'

// type Status = 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show'



// interface Service {
//   id: string
//   name: string
//   duration: number
//   requiredStaffType: string
// }

// interface AppointmentFormProps {
//   staffList: Staff[]
//   services: Service[]
//   onSubmit?: (data: any) => void
// }

// export default function AppointmentForm({
//   staffList,
//   services,
//   onSubmit,
// }: AppointmentFormProps) {
//   const [customerName, setCustomerName] = useState('')
//   const [serviceId, setServiceId] = useState('')
//   const [date, setDate] = useState('')
//   const [time, setTime] = useState('')
//   const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null)

//   const selectedService = services.find((s) => s.id === serviceId)

//   const eligibleStaff = useMemo(() => {
//     if (!selectedService) return []
//     return staffList.filter(
//       (s) => s.availability === 'Available'
//     )
//   }, [staffList, selectedService])

//   const selectedStaff = staffList.find(
//     (s) => s.id === selectedStaffId
//   )

//   const isAtCapacity =
//     selectedStaff &&
//     selectedStaff.bookedToday >= selectedStaff.capacity

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     const appointmentData = {
//       customerName,
//       serviceId,
//       datetime: `${date}T${time}`,
//       staffId: selectedStaffId,
//       status: selectedStaffId ? 'Scheduled' : 'Scheduled (Queue)',
//     }

//     console.log('Appointment Created:', appointmentData)
//     onSubmit?.(appointmentData)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
//     >
//       <h2 className="text-lg font-semibold">
//         Create Appointment
//       </h2>

//       {/* Customer Name */}
//       <div>
//         <label className="mb-1 block text-sm font-medium">
//           Customer Name
//         </label>
//         <input
//           type="text"
//           required
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           className="w-full rounded-md border px-3 py-2"
//         />
//       </div>

//       {/* Service */}
//       <div>
//         <label className="mb-1 block text-sm font-medium">
//           Service
//         </label>
//         <select
//           required
//           value={serviceId}
//           onChange={(e) => {
//             setServiceId(e.target.value)
//             setSelectedStaffId(null)
//           }}
//           className="w-full rounded-md border px-3 py-2"
//         >
//           <option value="">Select Service</option>
//           {services.map((service) => (
//             <option key={service.id} value={service.id}>
//               {service.name} ({service.duration} min)
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Date & Time */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Date
//           </label>
//           <input
//             type="date"
//             required
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full rounded-md border px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="mb-1 block text-sm font-medium">
//             Time
//           </label>
//           <input
//             type="time"
//             required
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full rounded-md border px-3 py-2"
//           />
//         </div>
//       </div>

//       {/* Staff Selection */}
//       {selectedService && (
//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Assign Staff
//           </label>

//           {eligibleStaff.length === 0 && (
//             <p className="text-sm text-red-600">
//               No available staff. Appointment will go to queue.
//             </p>
//           )}

//           <div className="space-y-2">
//             {eligibleStaff.map((staff) => {
//               const full =
//                 staff.bookedToday >= staff.capacity

//               return (
//                 <label
//                   key={staff.id}
//                   className={`flex cursor-pointer items-center justify-between rounded-md border p-3 ${
//                     full
//                       ? 'border-red-200 bg-red-50'
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="radio"
//                       name="staff"
//                       value={staff.id}
//                       disabled={full}
//                       checked={selectedStaffId === staff.id}
//                       onChange={() =>
//                         setSelectedStaffId(staff.id)
//                       }
//                     />
//                     <span className="text-sm font-medium">
//                       {staff.name}
//                     </span>
//                   </div>

//                   <span
//                     className={`text-xs ${
//                       full
//                         ? 'text-red-600'
//                         : 'text-gray-500'
//                     }`}
//                   >
//                     {staff.bookedToday} / {staff.capacity}
//                   </span>
//                 </label>
//               )
//             })}
//           </div>

//           {isAtCapacity && (
//             <p className="mt-2 text-sm text-red-600">
//               This staff member has reached daily capacity.
//             </p>
//           )}
//         </div>
//       )}

//       {/* Submit */}
//       <button
//         type="submit"
//         className="w-full rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
//       >
//         Create Appointment
//       </button>
//     </form>
//   )
// }

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
      className="space-y-8 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-sm transition-all duration-300"
    >
      <div className="space-y-1.5">
        <h2 className="text-2xl font-light tracking-tight text-slate-800">
          Create appointment
        </h2>
        <p className="text-sm text-slate-400">
          Fill in the details below to schedule a new appointment
        </p>
      </div>

      {/* Customer Name */}
      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
          Customer name
        </label>
        <input
          type="text"
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="e.g., Alex Morgan"
          className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 transition-all placeholder:text-slate-300 hover:border-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/60"
        />
      </div>

      {/* Service */}
      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
          Service
        </label>
        <select
          required
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value)
            setSelectedStaffId(null)
          }}
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 transition-all hover:border-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/60"
        >
          <option value="" disabled className="text-slate-400">
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id} className="py-2">
              {service.name} · {service.duration} min
            </option>
          ))}
        </select>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 transition-all hover:border-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/60"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
            Time
          </label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 transition-all hover:border-slate-300 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/60"
          />
        </div>
      </div>

      {/* Staff Selection */}
      {selectedService && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-baseline justify-between">
            <label className="block text-xs font-medium uppercase tracking-wide text-slate-400">
              Assign staff
            </label>
            {eligibleStaff.length === 0 && (
              <span className="text-xs font-medium text-amber-600">
                ⏳ Will be queued
              </span>
            )}
          </div>

          {eligibleStaff.length === 0 ? (
            <div className="rounded-xl border border-amber-100 bg-amber-50/50 px-5 py-4 text-sm text-amber-700">
              No available staff members. The appointment will be added to the queue.
            </div>
          ) : (
            <div className="space-y-2">
              {eligibleStaff.map((staff) => {
                const full = staff.bookedToday >= staff.capacity
                const isSelected = selectedStaffId === staff.id

                return (
                  <label
                    key={staff.id}
                    className={`
                      group relative flex cursor-pointer items-center justify-between 
                      rounded-xl border px-5 py-4 transition-all duration-200
                      ${
                        full
                          ? "border-rose-100 bg-rose-50/40 opacity-80"
                          : isSelected
                          ? "border-slate-300 bg-white shadow-md"
                          : "border-slate-200 bg-white/50 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                          flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all
                          ${
                            full
                              ? "border-rose-200 bg-rose-50"
                              : isSelected
                              ? "border-slate-700 bg-slate-700"
                              : "border-slate-300 bg-white group-hover:border-slate-400"
                          }
                        `}
                      >
                        {isSelected && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        type="radio"
                        name="staff"
                        value={staff.id}
                        disabled={full}
                        checked={isSelected}
                        onChange={() => setSelectedStaffId(staff.id)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {staff.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          text-xs font-medium
                          ${full ? "text-rose-500" : "text-slate-400"}
                        `}
                      >
                        {staff.bookedToday}/{staff.capacity}
                      </span>
                      {full && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-600">
                          full
                        </span>
                      )}
                    </div>
                  </label>
                )
              })}
            </div>
          )}

          {isAtCapacity && selectedStaffId && (
            <p className="mt-2 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-4 py-2 text-xs text-amber-700">
              <svg
                className="h-4 w-4 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              This staff member has reached daily capacity.
            </p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="group relative w-full overflow-hidden rounded-xl bg-slate-800 px-6 py-4 text-sm font-medium text-white transition-all hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Create appointment
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
        <span className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-700 to-slate-800 opacity-0 transition-opacity group-hover:opacity-100"></span>
      </button>

      <p className="text-center text-xs text-slate-400">
        We'll send a confirmation to the customer
      </p>
    </form>
  )
}