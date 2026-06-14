import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studylancer.app"),
  title: "Studylancer — Escrow-Backed Peer Tutoring for College Students",
  description:
    "Post a learning bounty, connect with a peer tutor, and keep your money safe in escrow until the session is complete. The smartest way to learn on campus.",
  keywords: [
    "peer tutoring",
    "escrow learning",
    "college tutoring",
    "study help",
    "Studylancer",
    "knowledge marketplace",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Studylancer — Learn on Your Terms. Pay What It's Worth.",
    description:
      "Post a learning bounty, connect with a peer tutor, and keep your money safe in escrow until the session is done.",
    url: "https://studylancer.app",
    type: "website",
    locale: "en_US",
    siteName: "Studylancer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studylancer Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studylancer — Learn on Your Terms. Pay What It's Worth.",
    description:
      "Post a learning bounty, connect with a peer tutor, and keep your money safe in escrow until the session is done.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Studylancer",
    url: "https://studylancer.app",
    description: "Post a learning bounty, connect with a peer tutor, and keep your money safe in escrow until the session is complete.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
