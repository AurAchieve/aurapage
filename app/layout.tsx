import type { Metadata } from "next";
import { EB_Garamond, Gabarito, Inter, Montserrat, Lobster, Playfair_Display, VT323, Quicksand, Space_Grotesk, Cinzel, Orbitron } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ['600'],
  style: ['italic'],
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aurapage.me'),
  title: "Aura Pages by AurAchieve",
  description: "Flex your Aura and achievements in front of the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${gabarito.variable} ${inter.variable} ${montserrat.variable} ${lobster.variable} ${playfair.variable} ${vt323.variable} ${quicksand.variable} ${spaceGrotesk.variable} ${cinzel.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
