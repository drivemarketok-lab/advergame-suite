/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    // Esto permite que Replit funcione sin bloqueos de seguridad
    allowedDevOrigins: [
      "localhost:3000",
      "localhost:3020",
      "replit.dev",
      "replit.app",
      "repl.co",
      "janeway.replit.dev",
      // Tu dominio específico que salía en el error:
      "a37d0f38-7e49-4bc6-9d47-8980cbafa14a-00-1ttdsxt2sldz7.janeway.repl.co"
    ],
  },
};

module.exports = nextConfig;