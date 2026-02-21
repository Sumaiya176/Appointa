import AppointmentForm from "@/components/AppointmentForm"
import { Staff } from "../constants/types"


export default function Page() {
  const staffList : Staff[] = [
    { id: '1', name: 'Riya', capacity: 5, bookedToday: 3, availability: 'Available' },
    { id: '2', name: 'Farhan', capacity: 5, bookedToday: 5, availability: 'Available' },
    { id: '3', name: 'Alex', capacity: 5, bookedToday: 2, availability: 'On Leave' },
  ]

  const services = [
    { id: '1', name: 'Consultation', duration: 30, requiredStaffType: 'Doctor' },
    { id: '2', name: 'Check-up', duration: 15, requiredStaffType: 'Doctor' },
  ]

  return (
    <div className="mx-auto max-w-2xl">
      <AppointmentForm
        staffList={staffList}
        services={services}
      />
    </div>
  )
}