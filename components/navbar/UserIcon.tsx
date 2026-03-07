/* eslint-disable @next/next/no-img-element */
import { LuUser } from "react-icons/lu"
import { currentUser, auth } from "@clerk/nextjs/server"

async function UserIcon() {
  // const { userId } = await auth()   get user (ID)

  const user = await currentUser()

  const profileImage = user?.imageUrl

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt='user image'
        className='w-7 h-7 rounded-full object-cover'
      />
    )
  }

  return <LuUser className='w-8 h-6 bg-primary rounded-full text-white' />
}
export default UserIcon
