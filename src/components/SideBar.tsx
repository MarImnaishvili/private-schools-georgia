"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Sidebar() {
  const tG = useTranslations("General");
  return (
    <aside className="bg-gray-100 shadow-md h-screen">
      <nav className="h-full p-4 shadow-md flex flex-col gap-6 ">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          {tG("Home")}
        </Link>
        <Link
          href="/ka/schools/new"
          className="text-gray-700 hover:text-blue-600"
        >
          {tG("Create school")}
        </Link>
      </nav>
    </aside>
  );
}
