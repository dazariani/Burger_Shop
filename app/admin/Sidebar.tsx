"use client";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathName = usePathname();

  return (
    <aside>
      {adminLinks.map((link) => {
        const isActivePage = pathName === link.href;
        const variant = isActivePage ? "default" : "ghost";
        return (
          <Button
            className="mb-2 capitalize font-normal "
            key={link.label}
            asChild
            variant={variant}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}
export default Sidebar;
