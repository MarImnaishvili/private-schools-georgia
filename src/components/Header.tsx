"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";

export default function Header() {
  const tG = useTranslations("General");
  const tAuth = useTranslations("auth");
  const { user, role, loading, signOut } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string || "ka";

  // Debug: Log the auth state
  console.log('Header auth state:', { user: !!user, role, loading });

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${locale}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white shadow-md z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold text-white tracking-wide whitespace-nowrap flex items-center gap-2">
            <span className="text-3xl">🏫</span>
            <span>{tG("GeorgianPrivateSchools")}</span>
          </h1>
          <nav className="flex items-center gap-4 text-sm font-medium">
            {/* Always show Home and View Table links */}
            <Link
              href={`/${locale}`}
              className="hover:text-blue-400 hover:cursor-pointer transition-colors"
            >
              {tG("Home")}
            </Link>
            <Link
              href={`/${locale}/schools`}
              className="hover:text-blue-400 hover:cursor-pointer transition-colors"
            >
              {tAuth("viewTable")}
            </Link>

            {/* Show Login if not authenticated */}
            {!user && (
              <Link
                href={`/${locale}/login`}
                className="hover:text-blue-400 hover:cursor-pointer transition-colors"
              >
                {tAuth("signIn")}
              </Link>
            )}

            {/* Show Dashboard and Logout if authenticated */}
            {user && (
              <>
                <Link
                  href={`/${locale}/dashboard`}
                  className="hover:text-blue-400 hover:cursor-pointer transition-colors"
                >
                  {tAuth("dashboard")}
                </Link>

                {/* Show Admin Employee Management only for admins */}
                {role === "admin" && (
                  <Link
                    href={`/${locale}/admin/employees`}
                    className="hover:text-blue-400 hover:cursor-pointer transition-colors"
                  >
                    {tAuth("employeeManagement")}
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  className="hover:text-blue-400 hover:cursor-pointer transition-colors"
                >
                  {tAuth("signOut")}
                </button>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Show user email and role when logged in */}
          {user && (
            <div className="flex items-center gap-3 text-sm">
              <div className="flex flex-col items-end">
                <span className="text-gray-300">{user.email}</span>
                {role && (
                  <span className="text-xs text-blue-400 capitalize">
                    {role}
                  </span>
                )}
              </div>
            </div>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
