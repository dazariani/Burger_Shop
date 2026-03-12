import { Label } from "../ui/label"
import { Input } from "../ui/input"

function ImageInput({ required = true }: { required?: boolean }) {
  const name = "image"

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        სურათი
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required={required}
        accept='image/*'
      />
    </div>
  )
}
export default ImageInput
