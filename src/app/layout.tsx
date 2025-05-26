// app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <body>{children}</body>
      <Toaster richColors position="top-right" />
    </html>
  );
}
