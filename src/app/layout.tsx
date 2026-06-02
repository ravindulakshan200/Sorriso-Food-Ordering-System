import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalCursor from "@/components/common/GlobalCursor";
import CartDrawer from "@/components/layout/CartDrawer";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"],
  variable: "--font-montserrat" 
});

export const metadata: Metadata = {
  title: "Sorriso — Your Belly Knows Best",
  description: "Order online from Sorriso, Battaramulla's favourite spot for Sri Lankan & International fusion rice and bites. Fast delivery via Uber Eats & PickMe Food.",
  keywords: ["sorriso", "battaramulla", "food", "fried rice", "basmathi", "bites", "chilli chicken", "online order", "sri lanka", "delivery"],
  authors: [{ name: "Sorriso" }],
  openGraph: {
    title: "Sorriso — Your Belly Knows Best",
    description: "Sri Lankan & International fusion rice dishes and bites. Order online from Battaramulla.",
    url: "https://sorrisofood.lk",
    siteName: "Sorriso",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sorriso — Your Belly Knows Best",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sorriso — Your Belly Knows Best",
    description: "Order online from Sorriso, Battaramulla. Sri Lankan & International fusion.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-background text-text-primary text-base min-h-screen flex flex-col font-body antialiased">
        <Script src="https://www.payhere.lk/lib/payhere.js" strategy="lazyOnload" />
        <GlobalCursor />
        <CartProvider>
          <ToastProvider>
            <Navbar />
            <CartDrawer />
            <div className="flex-grow flex flex-col">
              {children}
            </div>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
