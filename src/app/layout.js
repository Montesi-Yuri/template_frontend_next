import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://tuodominio.com'),
  title: {
    default: 'Clarus',
    template: '%s | Clarus'
  },
  description: 'La piattaforma perfetta per gestire i processi della tua azienda',
  // ... altri metadati globali
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
