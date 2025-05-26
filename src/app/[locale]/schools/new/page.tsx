//app/[locale]/schools/new/page
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import TopLevelFields from "@/components/forms/TopLevelFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddressSection from "@/components/forms/AddressSection";
import InfrastructureSection from "@/components/forms/InfrastructureSection";
import SchoolLevelSection from "@/components/forms/SchoolLevelSection";
import { schoolSchema, SchoolFormData } from "@/schemas/schema";

const defaultschoolLevel = {
  price: 0,
  discountAndPaymentTerms: "",
  duration: "",
  numberOfStudents: 0,
  meals: "",
  mealsDescription: "",
  transportation: "",
  schoolUniform: false,
  mandatorySportsClubs: "",
  teachingStyleBooks: "",
  textbooksPrice: "",
  clubsAndCircles: "",
};

export const defaultschoolValues = {
  name: "",
  phoneNumber1: "",
  phoneNumber2: "",
  phoneNumber3: "",
  schoolsWebSite: "",
  facebookProfileURL: "",
  instagramProfileURL: "",
  establishedYear: 1900,
  accreditationStatus: "",
  accreditationComment: "",
  founder: "",
  director: "",
  publicRelationsManager: "",
  parentRelationshipManager: "",
  graduationRate: "",
  averageNationalExamScore: "",
  description: "",
  otherPrograms: "",
  hasTutor: false,
  tutorDescription: "",
  hasScholarshipsGrants: false,
  scholarshipsGrants: "",
  hasExchangePrograms: false,
  exchangePrograms: "",
  hasOutdoorGarden: false,
  outdoorGarden: "",
  address: { city: "", street: "", zipCode: "", district: "" },
  infrastructure: {
    buildings: false,
    numberOfFloors: 0,
    squareness: 0,
    stadiums: false,
    pools: false,
    courtyard: false,
    laboratories: false,
    library: false,
    cafe: false,
  },

  primary: defaultschoolLevel,
  basic: defaultschoolLevel,
  secondary: defaultschoolLevel,
};

export default function NewSchoolPage() {
  const tForm = useTranslations("form");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: defaultschoolValues,
  });

  const onSubmit = async (data: SchoolFormData) => {
    const response = await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert(tForm("schoolCreated"));
      reset(); // <-- reset the form to default values
    } else {
      alert(tForm("errorCreatingSchool"));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{tForm("addNewSchool")}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TopLevelFields register={register} errors={errors} />
        <AddressSection register={register} errors={errors} />
        <InfrastructureSection register={register} errors={errors} />

        <h2 className="text-xl mt-6 font-semibold">{tForm("schoolLevels")}</h2>
        <Tabs defaultValue="primary" className="w-full">
          <TabsList>
            <TabsTrigger value="primary">{tForm("primary")}</TabsTrigger>
            <TabsTrigger value="basic">{tForm("basic")}</TabsTrigger>
            <TabsTrigger value="secondary">{tForm("secondary")}</TabsTrigger>
          </TabsList>

          <TabsContent value="primary">
            <SchoolLevelSection
              level="primary"
              register={register}
              errors={errors}
              control={control}
            />
          </TabsContent>
          <TabsContent value="basic">
            <SchoolLevelSection
              level="basic"
              register={register}
              errors={errors}
              control={control}
            />
          </TabsContent>
          <TabsContent value="secondary">
            <SchoolLevelSection
              level="secondary"
              register={register}
              errors={errors}
              control={control}
            />
          </TabsContent>
        </Tabs>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {tForm("submit")}
        </button>
      </form>
    </div>
  );
}
