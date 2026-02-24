import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Ishant Singh — AI Engineer | TwinAI",
  description:
    "Portfolio of Ishant Singh — AI Engineer building intelligent systems with LLM agents, RAG pipelines, and full-stack AI applications.",
  openGraph: {
    title: "Ishant Singh — AI Engineer",
    description:
      "Building intelligent systems with LLM agents, RAG pipelines, and full-stack AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
