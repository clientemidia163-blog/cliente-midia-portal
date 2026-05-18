/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" }
    ]
  },
  async rewrites() {
    return [
      // Simulador interativo — servido como HTML estático em /public,
      // mas exposto sob a URL editorial /simulador
      { source: "/simulador", destination: "/simulador.html" }
    ];
  },
  experimental: {
    typedRoutes: false
  }
};

export default nextConfig;
