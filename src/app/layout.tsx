// app/layout.tsx
import "./styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Next.js App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* 네이버 지도 및 Place API 스크립트 추가 */}
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=56ad9pmsli`}
          async
        ></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
