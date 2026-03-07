import { Separator } from "@/components/ui/separator"

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className='text-2xl tracking-wider font-medium capitalize mb-6'>
        {text}
      </h2>
      <Separator />
    </div>
  )
}
export default SectionTitle
