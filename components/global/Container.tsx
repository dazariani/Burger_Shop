import { cn } from "@/lib/utils"

function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto px-5 max-w-6xl xl:max-w-7xl ", className)}>
      {children}
    </div>
  )
}
export default Container
