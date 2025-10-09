import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SpinnerProvider } from "@/components/ui/GlobalSpinner"  // ✅ add spinner provider

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Ultimate Success Institute - Fueling Your Success, One Step at a Time",
  description:
    "Premium educational institute offering library services, computer classes, and coaching classes with modern facilities and expert guidance.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ✅ Razorpay checkout script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="font-serif">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* ✅ Wrap entire app with SpinnerProvider */}
          <SpinnerProvider>
            {children}
            <Toaster />
          </SpinnerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
