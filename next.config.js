/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

(module.exports = nextConfig),
  {
    env: {
      DATABASE_URL:
        "mongodb+srv://asakimalladmin:VNbEXSR44SDrPMO2@asakimall1.ss5v6hb.mongodb.net/Asakimall?retryWrites=true&w=majority",
      MONGODB_URI:
        "mongodb+srv://asakimalladmin:VNbEXSR44SDrPMO2@asakimall1.ss5v6hb.mongodb.net/Asakimall?retryWrites=true&w=majority",
    },
    images: {
      domains: ["greendiamonds.co.il"],
    },
  };
