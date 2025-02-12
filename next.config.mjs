/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disabilita la cache durante lo sviluppo
  onDemandEntries: {
    // periodo di tempo in ms in cui la pagina rimarrà in memoria
    maxInactiveAge: 10 * 1000,
    // numero di pagine da mantenere in memoria
    pagesBufferLength: 1,
  }
}

export default nextConfig
