const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.bhaskarassets.com' },
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
