"use client";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutProvider, useLayout } from "@/context/LayoutContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="default-layout bg-yellow-50 min-h-screen flex flex-col">
    <header className="bg-yellow-300 p-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-900">
          Playful Dashboard
        </h1>
      </div>
    </header>
    <main className="flex-grow container mx-auto p-6">{children}</main>
  </div>
);

const CustomLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="custom-layout bg-yellow-50 min-h-screen flex flex-col">
    <header className="bg-yellow-300 p-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-900">
          Playful Dashboard
        </h1>
      </div>
    </header>
    <main className="flex-grow container mx-auto p-6">{children}</main>
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout } = useLayout();

  return (
    <LayoutProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <body>
          {layout === "custom" ? (
            <CustomLayout>{children}</CustomLayout>
          ) : (
            <DefaultLayout>{children}</DefaultLayout>
          )}
        </body>
      </html>
    </LayoutProvider>
  );
}
