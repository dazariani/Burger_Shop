import Image from "next/image"
import ImageInput from "./ImageInput"
import { SubmitButton } from "./Buttons"

function ImageInputContainer({
  currentImg,
  name,
}: {
  currentImg: string
  name: string
}) {
  return (
    <div className='mb-8'>
      <Image
        src={currentImg}
        width={200}
        height={200}
        className='rounded object-cover mb-4 w-50] h-[200px}'
        alt={name}
        priority
      />
      <div className='max-w-md mt-4'>
        <ImageInput required={false} />
        <input type='hidden' name='curImg' value={currentImg} />
      </div>
    </div>
  )
}
export default ImageInputContainer
