import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import SchoolsList from "@/components/SchoolsList";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tGeneral = await getTranslations({ locale, namespace: "General" });

  const schools = await prisma.schoolData.findMany({
    select: {
      id: true,
      name: true,
      phoneNumber1: true,
      schoolsWebSite: true,
      address: {
        select: {
          city: true,
          district: true,
        },
      },
      primary: {
        select: {
          price: true,
        },
      },
      basic: {
        select: {
          price: true,
        },
      },
      secondary: {
        select: {
          price: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-8 mb-10 mt-8 shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {tGeneral("aboutOurPlatform")}
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {tGeneral("welcomeText")}
        </p>
      </div>

      {/* Schools List with Filters */}
      <SchoolsList schools={schools} />
    </div>
  );
}
