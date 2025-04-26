// next.config.js
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',  // Allow Cloudinary images
      'avatars.githubusercontent.com',  // For GitHub avatars if you're using them
      'lh3.googleusercontent.com',  // For Google avatars if you're using them
    ],
  },
};

module.exports = nextConfig;
