"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton } from "@clerk/nextjs"
import { FaRegHeart, FaHeart, FaPenSquare } from "react-icons/fa"
import { LuTrash2 } from "react-icons/lu"
import { IoReload } from "react-icons/io5"

type btnSize = "default" | "lg" | "sm"

type SubmitButtonProps = {
  className?: string
  text?: string
  size?: btnSize
}

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className={cn("capitalize", className)}
      size={size}
    >
      {pending ? (
        <>
          <IoReload className='animate-spin mr-2 h-4 w-4' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

type actionType = "edit" | "delete"

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    if (actionType === "edit") {
      return <FaPenSquare />
    }
    return <LuTrash2 />
  }

  return (
    <Button
      variant='link'
      size='icon'
      type='submit'
      className='p-2 cursor-pointer'
    >
      {pending ? <IoReload className='animate-spin' /> : renderIcon()}
    </Button>
  )
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <IoReload className='animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}
