"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const tG = useTranslations("General");
  return (
    <header className="w-full h-16 bg-gray-500 text-white flex items-center px-4 shadow-md">
      <h1 className="text-xl font-semibold">
        {tG("Georgian Private Schools")}
      </h1>
    </header>
  );
}
