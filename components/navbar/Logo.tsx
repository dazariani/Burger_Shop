import Image from "next/image"
import Link from "next/link"

function Logo() {
  return (
    <div>
      <Link href='/'>
        <Image
          loading='eager'
          src='https://res.cloudinary.com/dwpheghzv/image/upload/v1772631880/logo_sjsn7a.png'
          alt='Eshop Logo'
          width={95}
          height={50}
          className='w-auto h-auto'
        />
      </Link>
    </div>
  )
}
export default Logo
