"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-30 h-full bg-gray-100 shadow-md p-4">
      <nav className="space-y-4">
        <Link href="/" className="block text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link
          href="/ka/schools/new"
          className="block text-gray-700 hover:text-blue-600"
        >
          Create new school
        </Link>
        <Link
          href="/settings"
          className="block text-gray-700 hover:text-blue-600"
        >
          Schools
        </Link>
      </nav>
    </aside>
  );
}
