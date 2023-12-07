/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/w500/**'
            },
            {
                protocol: "https",
                hostname: 'www.movienewz.com',
                port: '',
                pathname: '/img/films/poster-holder.jpg'
            }
        ],
        unoptimized: true,
    },
}

module.exports = nextConfig
