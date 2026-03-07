import Image from "next/image"
import { Separator } from "../ui/separator"

function Banner() {
  return (
    <div className='hidden md:block'>
      <div className='rounded-lg relative mb-13'>
        <Image
          src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772566509/Burger_app/vpqbpixgihpit46wgaom.webp'
          alt='Banner Image'
          width={1920}
          height={1080}
          className='rounded-lg filter brightness-80 max-h-95 '
        />
        <div className='absolute top-0 left-0  w-full'>
          <Image
            alt='logo'
            src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772566985/ChatGPT_Image_Feb_25_2026_07_24_56_PM_hwqb3a.png'
            width={100}
            height={100}
            className='absolute top-0 left-1/8 w-[15vw] animate-wiggle'
          />
          <Image
            alt='logo'
            src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772629985/image_1_sprxbg.png'
            width={100}
            height={100}
            className='absolute top-0 left-2/5 rounded-full w-[10vw] animate-wiggle '
          />
          <Image
            alt='logo'
            src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772567139/ChatGPT_Image_Feb_25_2026_07_32_48_PM_bsxioi.png'
            width={100}
            height={100}
            className='absolute top-25 left-4/7 w-[15vw] animate-wiggle'
          />
          <Image
            alt='logo'
            src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772567150/ChatGPT_Image_Feb_25_2026_07_37_09_PM_nlx8lr.png'
            width={100}
            height={100}
            className='absolute top-0 left-3/4 w-[15vw] animate-wiggle'
          />
        </div>
      </div>
      {/* <Separator className='mb-13' /> */}
    </div>
  )
}
export default Banner
