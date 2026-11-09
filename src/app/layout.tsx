import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/Ram-codespace"),
  title: "Raman — Java Full Stack Developer",
  description:
    "Java Full Stack Software Developer with hands-on experience building end-to-end web applications across Java, Spring Boot, React.js, and MySQL.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://github.com/Ram-codespace",
    title: "Raman — Java Full Stack Developer",
    description:
      "Java Full Stack Software Developer with hands-on experience building end-to-end web applications across Java, Spring Boot, React.js, and MySQL.",
    images: ["/portfolio/assets/hero_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  );
}
