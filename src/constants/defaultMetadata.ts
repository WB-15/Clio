import { Metadata } from 'next'

const TITLE = 'Homepage'
const SITE_NAME = 'Clio'
const DESCRIPTION = 'Clio'

const CANONICAL_URL =
  process.env.NEXT_PUBLIC_CANONICAL_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  'http://localhost:3000'

const THEME_COLOR = '#fff'

const canonicalUrlObject = new URL(
  CANONICAL_URL.startsWith('http') ? CANONICAL_URL : `https://${CANONICAL_URL}`
)

export const DEFAULT_METADATA: Metadata = {
  metadataBase: canonicalUrlObject,
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  colorScheme: 'light',
  themeColor: THEME_COLOR,
  generator: 'Next.js',
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
        type: 'image/png',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@clio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
        type: 'image/png',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      // {
      //   url: '/safari-pinned-tab.svg',
      //   type: 'image/png',
      //   rel: 'mask-icon',
      //   // @ts-ignore
      //   color: 'red',
      // },
    ],
    other: [{ rel: 'apple-touch-icon', url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
}
