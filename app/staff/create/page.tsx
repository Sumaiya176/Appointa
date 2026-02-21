import StaffForm from "@/components/CreateStaff"


export default function Page() {
  return (
    <div className="mx-auto max-w-xl">
      <StaffForm
        // onSubmit={(data) => {
        //   console.log('Create Staff API call here', data)
        // }}
      />
    </div>
  )
}
