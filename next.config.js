/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org','res.cloudinary.com'],    
  }
}

module.exports = nextConfig
