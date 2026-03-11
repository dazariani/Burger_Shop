import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LuAlignLeft } from "react-icons/lu"
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "../ui/button"
import { links } from "@/utils/links"
import UserIcon from "./UserIcon"
import SignOutLink from "./SignOutLink"
import { auth } from "@clerk/nextjs/server"

async function LinksDropdown() {
  const { userId } = await auth()
  const isAdmin = userId === process.env.ADMIN_USER_ID

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='flex gap-3 w-18 '>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-38 text-muted-foreground ease-in-out duration-300'
        align='start'
        sideOffset={10}
      >
        <Show fallback={ShowSignedOut()} when='signed-in'>
          {links.map((link) => {
            if (!isAdmin && link.label === "მართვა") return null
            return (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href} className='capitalize w-full'>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className='w-full'>
              <SignOutLink />
            </div>
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ShowSignedOut() {
  return (
    <>
      {links.map(
        (link) =>
          (link.href === "/" ||
            link.href === "/products" ||
            link.href === "/about") && (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href} className='capitalize w-full'>
                {link.label}
              </Link>
            </DropdownMenuItem>
          ),
      )}
      <DropdownMenuItem>
        <SignInButton mode='modal'>
          <button className='w-full text-left'>შესვლა</button>
        </SignInButton>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <SignUpButton mode='modal'>
          <button className='w-full text-left'>რეგისტრაცია</button>
        </SignUpButton>
      </DropdownMenuItem>
    </>
  )
}

export default LinksDropdown
