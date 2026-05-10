import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TISORA | HYTEA — Hydration, Reimagined",
  description:
    "TISORA HYTEA — Natural iced tea infused with electrolytes, real ingredients, and refreshing flavour. Available in Lemon and Peach.",
  keywords: [
    "TISORA",
    "HYTEA",
    "hydration tea",
    "iced tea",
    "electrolytes",
    "natural tea",
    "wellness drink",
    "peach tea",
    "lemon tea",
  ],
  openGraph: {
    title: "TISORA | HYTEA — Hydration, Reimagined",
    description:
      "Natural iced tea infused with electrolytes, real ingredients, and refreshing flavour.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TISORA | HYTEA",
    description: "Hydration, Reimagined.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
