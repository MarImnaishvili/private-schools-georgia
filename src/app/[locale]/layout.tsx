// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await Promise.resolve(params);

  // Ensure you await if params is asynchronous
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
