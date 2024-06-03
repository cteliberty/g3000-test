/** @type {import('next').NextConfig} */
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

config({
  path: `.env.${process.env.NODE_ENV}`,
});
config({ path: '.env.dev', override: true });

const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    formats: ['image/webp'],
    unoptimized: false,
  },
  env: {
    NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN:
      process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
  },
};

export default nextConfig;
