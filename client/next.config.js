/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  env: {
    BASE_URL: process.env.BASE_URL,
    SERVER_URL: process.env.SERVER_URL
  }
}
