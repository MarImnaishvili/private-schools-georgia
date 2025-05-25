import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout(props: Props) {
  const { children } = props;
  const { locale } = await Promise.resolve(props.params);
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
