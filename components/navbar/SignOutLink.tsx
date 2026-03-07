"use client"
import { SignOutButton } from "@clerk/nextjs"
import { toast } from "sonner"

function SignOutLink() {
  const handleLogout = () => {
    toast("Logout Successful")
  }
  return (
    <SignOutButton redirectUrl='/'>
      <button onClick={handleLogout}>გამოსვლა</button>
    </SignOutButton>
  )
}
export default SignOutLink
