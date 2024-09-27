/** @type {import('next').NextConfig} */


import withNextIntl from 'next-intl/plugin';
import { env } from 'process';
// import withVideos from "next-videos";

const nextIntlConfig = withNextIntl();
const nextConfig = {
    // output: 'export',
    reactStrictMode: false,
    experimental: {
        typedRoutes: true,
    },
    env: {
        MONPAY_API_URL: process.env.MONPAY_API_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'monpaycontent.blob.ub.cloud.mobinet.mn',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
export default nextIntlConfig(nextConfig);
