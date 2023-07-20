/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['rb.gy', 'image.tmdb.org'],
    },
}

module.exports = nextConfig
