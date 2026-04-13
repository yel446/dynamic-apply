import type { Metadata } from "next";
import { plusJakartaSans, inter } from "@/lib/fonts";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DynamicApply Platform",
    template: "%s | DynamicApply Platform",
  },
  description:
    "Générez dynamiquement votre CV et lettre de motivation adaptés à chaque offre d'emploi, avec scoring ATS et export PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex bg-[#F4F7FB]">
        <Sidebar />
        <div className="flex-1 flex flex-col relative" style={{ marginLeft: 'var(--sidebar-width)' }}>
          <Header />
          <main className="flex-1 p-8 lg:p-10 pt-[var(--header-height)]">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
