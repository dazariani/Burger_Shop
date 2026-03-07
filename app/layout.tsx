import type { Metadata } from "next"
import { Noto_Sans_Georgian } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import Container from "@/components/global/Container"
import Providers from "./providers"
import Footer from "@/components/footer/Footer"

const geoFont = Noto_Sans_Georgian({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Eshop",
  description: "E-commerce website built with Next.js and TypeScript",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${geoFont.className} antialiased `}
      suppressHydrationWarning
    >
      <body className='leading-6 bg-background text-foreground '>
        <Providers>
          <Navbar />
          <Container className='pt-15 flex flex-col min-h-screen mb-15 '>
            {children}
          </Container>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
