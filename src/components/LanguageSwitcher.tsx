// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the current locale with the new one
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="w-15 flex justify-between">
      <button onClick={() => switchLocale("en")} disabled={locale === "en"}>
        EN
      </button>
      <button onClick={() => switchLocale("ka")} disabled={locale === "ka"}>
        KA
      </button>
    </div>
  );
}
