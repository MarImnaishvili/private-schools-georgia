"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import AddressSection from "./forms/AddressSection";
import InfrastructureSection from "./forms/InfrastructureSection";
import SchoolLevelSection from "./forms/SchoolLevelSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolFormData, schoolSchema } from "../schemas/schema";
import TopLevelFields from "./forms/TopLevelFields";
import { toast } from "sonner";
import { DevTool } from "@hookform/devtools";

type Props = {
  school: SchoolFormData;
  mode: "view" | "edit";
  onClose: () => void;
  onSave: (updated: SchoolFormData) => void;
};

export default function SchoolModal({ school, mode, onClose, onSave }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const tForm = useTranslations("form");
  const isEdit = mode === "edit";

  const methods = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
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

      primary: {
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
        foreignLanguages: "",
      },
      basic: {
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
        foreignLanguages: "",
      },
      secondary: {
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
        foreignLanguages: "",
      },
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (school) {
      console.log("Resetting with school:", school); // ✅ This helps you debug
      reset(school); // ✅ sets form values
    }
  }, [school, reset]);

  const onSubmit = async (data: SchoolFormData) => {
    try {
      const response = await fetch(`/api/schools/${school.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update school");

      const result = await response.json();
      toast.success("School updated successfully!");
      onSave(result); // Update row in grid
      onClose();
    } catch (error) {
      toast.error("Failed to update school");
      console.error("Update error:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  console.log(school);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center"
      onClick={onClose} // <-- catch background click here
    >
      <div
        className="bg-white p-6 w-[90%] max-h-[90%] overflow-y-auto rounded-lg"
        onClick={(e) => e.stopPropagation()} // <-- prevent click from bubbling
      >
        <h2>{isEdit ? "Edit" : "View"}</h2>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TopLevelFields register={register} errors={errors} />
            <AddressSection
              disabled={!isEdit}
              register={register}
              errors={errors}
            />
            <InfrastructureSection
              disabled={!isEdit}
              register={register}
              errors={errors}
            />

            <Tabs defaultValue="primary" className="w-full">
              <TabsList>
                <TabsTrigger value="primary">{tForm("primary")}</TabsTrigger>
                <TabsTrigger value="basic">{tForm("basic")}</TabsTrigger>
                <TabsTrigger value="secondary">
                  {tForm("secondary")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="primary">
                <SchoolLevelSection
                  level="primary"
                  register={register}
                  errors={errors}
                  control={control}
                  disabled={!isEdit}
                />
              </TabsContent>
              <TabsContent value="basic">
                <SchoolLevelSection
                  level="basic"
                  register={register}
                  errors={errors}
                  control={control}
                  disabled={!isEdit}
                />
              </TabsContent>
              <TabsContent value="secondary">
                <SchoolLevelSection
                  level="secondary"
                  register={register}
                  errors={errors}
                  control={control}
                  disabled={!isEdit}
                />
              </TabsContent>
            </Tabs>

            {isEdit && (
              <button type="submit" className="mt-4">
                Save Changes
              </button>
            )}
          </form>
          <DevTool control={control} />
        </FormProvider>

        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}
