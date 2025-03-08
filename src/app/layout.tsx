import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import '@ant-design/v5-patch-for-react-19';
import Layout from "@/components/Layout";

const poppinsSans = Poppins({
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Git Explorer",
  description: "Ad fugiat ipsum tempor laboris sint minim veniam Lorem ea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsSans} antialiased`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
