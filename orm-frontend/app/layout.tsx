import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/services/authservice";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InteleekAI - Your AI Learning Companion",
  description: "InteleekAI is your ultimate AI learning companion, offering personalized courses, interactive coding exercises, and real-time feedback to help you master AI concepts and skills. Whether you're a beginner or an experienced developer, InteleekAI provides a comprehensive platform to enhance your AI knowledge and accelerate your learning journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <AuthProvider>
            {children}
          </AuthProvider>
          <ToastContainer />
        </body>
      </html>
    
  );
}
