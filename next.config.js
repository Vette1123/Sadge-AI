/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'googleusercontent.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'cdn.openai.com',
      'images.unsplash.com',
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
