import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";



export const metadata: Metadata = {
  title: "Gravy & Grills - Digital Restaurant Menu",
  description: "QR-based digital menu for Gravy & Grills restaurant. Browse our extensive menu featuring Paneer, Veg, Kaju, Roti, Biryani, Sizzlers, and more.",
  keywords: ["Gravy & Grills", "Restaurant", "Digital Menu", "QR Menu", "Indian Food", "Paneer", "Biryani", "Sizzlers"],
  authors: [{ name: "Gravy & Grills" }],
  openGraph: {
    title: "Gravy & Grills - Digital Restaurant Menu",
    description: "QR-based digital menu for Gravy & Grills restaurant",
    siteName: "Gravy & Grills",
    type: "website",
  },
  icons: {
    icon: "/gravy-grills-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/gravy-grills-logo.jpg" />
      </head>
      <body
        className={`antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}