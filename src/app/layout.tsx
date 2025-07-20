import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lux._ez - @Luxuryregedit',
  description: '✅ Somos @Luxuryregedit, una empresa con más de 5 años de experiencia en el mercado, entregando el mejor producto al menor precio posible.',
  keywords: 'Luxury, regedit, gaming, Free Fire, hacks, modmenu',
  authors: [{ name: 'Luxury' }],
  openGraph: {
    title: 'Lux._ez - @Luxuryregedit',
    description: '✅ Somos @Luxuryregedit, una empresa con más de 5 años de experiencia en el mercado, entregando el mejor producto al menor precio posible.',
    type: 'website',
    url: 'https://ch4d.me/',
    images: [
      {
        url: 'https://r2.guns.lol/a686098f-fa5e-4041-995b-4299d6e5b99d.jpg',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'Lux._ez - @Luxuryregedit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lux._ez - @Luxuryregedit',
    description: '✅ Somos @Luxuryregedit, una empresa con más de 5 años de experiencia en el mercado, entregando el mejor producto al menor precio posible.',
    images: ['https://r2.guns.lol/a686098f-fa5e-4041-995b-4299d6e5b99d.jpg'],
    site: '@Lux._ez',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="https://images.guns.lol/S6vjV.webp" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}