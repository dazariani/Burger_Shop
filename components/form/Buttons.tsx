"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton } from "@clerk/nextjs"
import { FaRegHeart, FaHeart, FaPenSquare } from "react-icons/fa"
import { LuTrash2 } from "react-icons/lu"
import { IoReload } from "react-icons/io5"
import CartButton from "../navbar/CartButton"

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
