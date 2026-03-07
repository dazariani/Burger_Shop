import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { LuAlignLeft } from "react-icons/lu"
import Link from "next/link"
import { Button } from "../ui/button"
import { links } from "@/utils/links"

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='flex gap-4 max-w-25'>
          <LuAlignLeft className='w-6 h-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-38 text-muted-foreground ease-in-out duration-300'
        align='start'
        sideOffset={10}
      >
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} className='capitalize w-full'>
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
