"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";

export default function Header() {
  const tG = useTranslations("General");

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white shadow-md z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold tracking-wide whitespace-nowrap">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              {tG("Georgian Private Schools")}
            </Link>
          </h1>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/ka/schools/new"
              className="hover:text-blue-400 transition-colors"
            >
              {tG("Create school")}
            </Link>
          </nav>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
