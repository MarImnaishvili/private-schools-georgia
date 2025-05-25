"use client";

import React from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Sidebar() {
  const tG = useTranslations("General");
  return (
    <>
      <nav className="bg-gray-200 p-4 shadow-md flex gap-6 justify-between">
        <div className="w-[80%] flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            {tG("Home")}
          </Link>
          <Link
            href="/ka/schools/new"
            className="text-gray-700 hover:text-blue-600"
          >
            {tG("Create school")}
          </Link>
        </div>
        <LanguageSwitcher />
      </nav>
    </>
  );
}
