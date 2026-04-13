import { Plus_Jakarta_Sans, Inter } from 'next/font/google'

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800'],
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
