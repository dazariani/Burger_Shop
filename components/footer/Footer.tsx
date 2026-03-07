import Link from "next/link"
import Container from "../global/Container"
import Logo from "../navbar/Logo"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa"

function Footer() {
  return (
    <Container className='py-5 px-5 md:px-20 bg-gray-300 dark:bg-muted rounded-t-2xl'>
      <footer>
        <section className='flex justify-between'>
          <div className='social  flex-col justify-center items-start gap-4 hidden md:flex'>
            <div className='LogoContainer max-w-10 md:max-w-15'>
              <Logo />
            </div>
            <p className='text-[14px] leading-6 text-muted-foreground'>
              გამოგვყევით სოციალურ მედია <br />
              პლატფორმებზე;
            </p>
            <div className='socialBox flex gap-8'>
              <Link href='https://www.facebook.com'>
                <FaFacebook color='#1877F2' className='text-2xl' />
              </Link>
              <Link href='https://www.instagram.com'>
                <FaInstagram color='#1877F2' className='text-2xl' />
              </Link>
              <Link href='https://www.tiktok.com'>
                <FaTiktok color='#1877F2' className='text-2xl' />
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-1 text-muted-foreground '>
            <h3 className='text-lg font-semibold mb-4'>კონტაქტი</h3>
            <p className='text-sm mb-2'>ელ.ფოსტა: info@mrbeast.ge</p>
            <p className='text-sm mb-2'>ტელეფონი: +995 32 2 123 456</p>
            <p className='text-sm mb-2'>
              მისამართი: თბილისი, ქ. მართონის გამზირი 1
            </p>
          </div>
        </section>
      </footer>
    </Container>
  )
}
export default Footer
