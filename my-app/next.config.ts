/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '100mb',
			allowedOrigins: ['**'],
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		disableStaticImages: true,
	},
};

export default nextConfig;
