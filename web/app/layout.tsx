import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque";
import "./globals.css";

export const metadata: Metadata = {
  title: "VedaAI Assessment Creator",
  description: "AI-powered assessment generation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          bg-[#F5F5F5]
          text-[#303030]
          font-['Bricolage_Grotesque']
          antialiased
        "
      >
        {children}
      </body>
    </html>
  );
}