import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreshCart | Everyday shopping",
  description: "Fresh products, fashion, electronics and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
