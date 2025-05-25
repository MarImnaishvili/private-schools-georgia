// app/layout.tsx
import Sidebar from "@/components/SideBar";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4">{children}</main> {/* Renders the page.tsx */}
          </div>
        </div>
      </body>
    </html>
  );
}
