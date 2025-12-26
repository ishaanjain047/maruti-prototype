import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"

export const metadata: Metadata = {
  title: "Maruti Suzuki Infrastructure Portal",
  description: "AI-powered Infrastructure Automation Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
