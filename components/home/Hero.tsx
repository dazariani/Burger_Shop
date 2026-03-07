import Image from "next/image"

function Hero() {
  return (
    <div className='flex items-start gap-10 mb-15 flex-col md:flex-row'>
      <div>
        <Image
          alt='logo'
          src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772631696/nashville-hot-chicken-tender-sandwich_v68zul.webp'
          width={600}
          height={600}
        />
      </div>
      <div className='flex flex-col gap-15'>
        <div className='flex flex-col '>
          <h1 className='text-2xl font-medium mb-7 leading-9'>
            გასინჯეთ ჩვენი ახალი ბურგერი
          </h1>

          <p className='text-muted-foreground text-sm mt-2 '>
            ჩვენი ახალი ბურგერი საფირმო კეჩუპითა და სოუსით 🍔
          </p>
        </div>
        <div className='hidden lg:block self-end'>
          <Image
            alt='logo'
            src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772631955/image_dv71cc.png'
            width={140}
            height={150}
            className='h-auto'
          />
        </div>
      </div>
    </div>
  )
}
export default Hero
