import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavigationBar from "@/components/NavigationBar"

export const metadata = {
  title: "Bangladesh Cricket Team",
  description: "Official website of the Bangladesh national cricket team",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#1c1c1c]">

        <ThemeProvider defaultTheme="dark">
          <NavigationBar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
