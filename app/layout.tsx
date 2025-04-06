"use client";

import "./globals.css";
import DarkModeWrapper from "@/components/DarkModeWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeWrapper>
      <html lang="en">
        <body>
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <main>{children}</main>
        </body>
      </html>
    </DarkModeWrapper>
  );
}
