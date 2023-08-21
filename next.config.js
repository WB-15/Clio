const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  modularizeImports: {
    '@/app/components/?(((\\w*)?/?)*)': {
      transform: '@/app/components/{{ matches.[1] }}/{{ member }}',
      skipDefaultConversion: true,
    },
    '@/utils/?(((\\w*)?/?)*)': {
      transform: '@/utils/{{ matches.[1] }}/{{ member }}',
      skipDefaultConversion: true,
    },
    '@/hooks/?(((\\w*)?/?)*)': {
      transform: '@/hooks/{{ matches.[1] }}/{{ member }}',
      skipDefaultConversion: true,
    },
    '@/actions/?(((\\w*)?/?)*)': {
      transform: '@/actions/{{ matches.[1] }}/{{ member }}',
      skipDefaultConversion: true,
    },
  },
})

module.exports = nextConfig
