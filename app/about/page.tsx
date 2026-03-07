import Image from "next/image"
import { aboutText } from "../../utils/links"

function AboutPage() {
  return (
    <div className='flex justify-between flex-col md:flex-row items-center gap-14  mb-auto'>
      <div>
        <Image
          src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772648760/american-dream_iwq5ly.webp'
          alt='About Us'
          width={555}
          height={333}
        />
      </div>
      <div className='text-center'>
        <p className='text-muted-foreground max-w-xl leading-8 text-[14px]'>
          {aboutText}
        </p>
      </div>
    </div>
  )
}
export default AboutPage
