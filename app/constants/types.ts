export interface Staff {
  id: string
  name: string
  capacity: number
  bookedToday: number
  availability: 'Available' | 'On Leave'
}