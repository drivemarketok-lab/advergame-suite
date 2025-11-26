/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // ✅ ELIMINAMOS experimental.allowedDevOrigins (ya no se usa)
  // Next.js ahora permite todos los orígenes en desarrollo por defecto
};

module.exports = nextConfig;