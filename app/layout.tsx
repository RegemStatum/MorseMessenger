import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Flex } from "next/font/google";
import { FC } from "react";
import Layout from "./_components/layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Morse",
  description: "Morse messaging app",
};

type Props = { children: React.ReactNode };

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto_flex.variable} font-inter`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
