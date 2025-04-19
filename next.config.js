/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Removed deprecated swcMinify option

  // Optimize code splitting for better performance
  compiler: {
    // Enable compiler optimizations
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configure webpack to optimize PDF library
  webpack: (config, { isServer }) => {
    // Optimize PDF rendering libraries to be loaded only when needed
    if (!isServer) {
      // Ensure the optimization object structure exists
      if (!config.optimization) {
        config.optimization = {};
      }

      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {};
      }

      if (!config.optimization.splitChunks.cacheGroups) {
        config.optimization.splitChunks.cacheGroups = {};
      }

      // Now safely add the PDF renderer configuration
      config.optimization.splitChunks.cacheGroups.pdfRenderer = {
        test: /[\\/]node_modules[\\/](@react-pdf|pdfjs-dist)[\\/]/,
        name: "pdf-renderer",
        chunks: "async",
        priority: 10,
        reuseExistingChunk: true,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
