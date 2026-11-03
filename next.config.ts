import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

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
    formats: ['image/avif', 'image/webp'],
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
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
