"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import AddressSection from "././forms/AddressSection";
import InfrastructureSection from "././forms/InfrastructureSection";
import SchoolLevelSection from "././forms/SchoolLevelSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
// import other sub-form sections as needed

import { SchoolFormData, schoolSchema } from "../schemas/schema";
import TopLevelFields from "./forms/TopLevelFields";
import { defaultschoolValues } from "@/app/[locale]/schools/new/page";
import { toast } from "sonner";

type Props = {
  school: SchoolFormData;
  mode: "view" | "edit";
  onClose: () => void;
};

export default function SchoolModal({ school, mode, onClose }: Props) {
  const tForm = useTranslations("form");
  const isEdit = mode === "edit";

  const methods = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: defaultschoolValues,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset(school);
  }, [school, reset]);

  const onSubmit = async (data: SchoolFormData) => {
    try {
      const response = await fetch(`/api/schools/${school.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update school");
      }

      const result = await response.json();
      console.log("Updated school data:", result);
      toast.success("School updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update school");
      console.error("Update error:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 w-[90%] max-h-[90%] overflow-y-auto rounded-lg">
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
        </FormProvider>

        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}
