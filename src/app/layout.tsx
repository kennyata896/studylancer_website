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
  openGraph: {
    title: "Studylancer — Learn on Your Terms. Pay What It's Worth.",
    description:
      "Post a learning bounty, connect with a peer tutor, and keep your money safe in escrow until the session is done.",
    type: "website",
    locale: "en_US",
    siteName: "Studylancer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studylancer — Learn on Your Terms. Pay What It's Worth.",
    description:
      "Post a learning bounty, connect with a peer tutor, and keep your money safe in escrow until the session is done.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
