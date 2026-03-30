import { cn } from "@/lib/utils"

function EmptyList({
  heading = "ჩანაწერი ვერ მოიძებნა",
  className,
}: {
  heading?: string
  className?: string
}) {
  return <h2 className={cn("text-xl", className)}>{heading}</h2>
}
export default EmptyList
