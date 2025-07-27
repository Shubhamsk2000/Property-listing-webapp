import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PropertyProvider } from "@/contexts/property-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PropertyHub - Find Your Perfect Property",
  description: "Discover amazing properties in your desired location",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <PropertyProvider>
            {children}
            <Toaster />
          </PropertyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
