import type { Metadata } from "next";
// ▼ CSS読み込み（ここが命綱です）
import "./globals.css";

export const metadata: Metadata = {
  title: "Ari-no-Ana Neo Editor",
  description: "Realtime Markdown Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* ▼ フォント設定を明示的に指定 */}
      <body style={{ fontFamily: 'sans-serif' }} className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}