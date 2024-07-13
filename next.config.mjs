/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'img.freepik.com',
            },
            {
              protocol: 'https',
              hostname: 'avatar.iran.liara.run',
            },
            {
              protocol: 'https',
              hostname: 'api.dicebear.com',
            },
          ],
    }
};

export default nextConfig;
