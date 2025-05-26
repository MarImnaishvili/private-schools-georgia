"use client";

import React from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const tG = useTranslations("General");
  return (
    <header className="w-full h-16 bg-gray-500 text-white flex items-center px-4 shadow-md ">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-semibold">
          {tG("Georgian Private Schools")}
        </h1>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
