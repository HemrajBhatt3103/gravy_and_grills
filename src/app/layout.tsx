import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
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
