// app/[locale]/page.tsx
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome</h1>
      <LanguageSwitcher />
    </div>
  );
}
