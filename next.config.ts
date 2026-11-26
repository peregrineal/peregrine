import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { DEFAULT_LOCALE, LOCALES } from './src/lib/i18n'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Dev only: lets phones on the local network (http://192.168.x.x:3000) and client previews over
  // ngrok load the dev scripts, otherwise the page renders but menus and buttons do nothing.
  allowedDevOrigins: ['192.168.*.*', '*.ngrok-free.app', '*.ngrok.app', '*.ngrok.io'],
  // The dev-tools "N" badge sits in the bottom-left corner and clients previewing over ngrok
  // took it for part of the site.
  devIndicators: false,
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**' }, { pathname: '/images/**' }],
    // Photos served straight from the public R2 bucket (R2_PUBLIC_URL, see payload.config.ts).
    remotePatterns: process.env.R2_PUBLIC_URL ? [new URL(`${process.env.R2_PUBLIC_URL.replace(/\/+$/, '')}/**`)] : [],
    // WebP only: AVIF is a little smaller but several times slower to encode, and every photo is
    // encoded on its first request, which held photos back about 3 seconds behind the page.
    formats: ['image/webp'],
    // Keep resized photos for a week instead of the default 4 hours, so visitors rarely hit an
    // unencoded one.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  // English is served without a prefix: /about-us is rendered by /en/about-us behind the scenes, and a
  // typed /en/... address redirects to the clean one. Other languages (/sq/...) pass straight through
  // to the [lang] route. These used to live in src/proxy.ts, which ran a function on every page view
  // and every link prefetch; as config rules Vercel applies them in its routing layer instead.
  async redirects() {
    return [
      // Its own rule: '/:path*' with an empty path gives an empty Location header.
      { source: `/${DEFAULT_LOCALE}`, destination: '/', permanent: true },
      { source: `/${DEFAULT_LOCALE}/:path+`, destination: '/:path+', permanent: true },
    ]
  },
  async rewrites() {
    // Paths without a file extension (public assets, sitemap.xml) that are not a language,
    // the admin, the APIs, the preview routes or Next.js internals.
    const skip = [...LOCALES, 'admin', 'api', 'next', '_next'].join('|')
    return {
      beforeFiles: [
        { source: '/', destination: `/${DEFAULT_LOCALE}` },
        { source: `/:path((?!(?:${skip})(?:/|$))[^.]+)`, destination: `/${DEFAULT_LOCALE}/:path` },
      ],
    }
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
