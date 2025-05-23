// /src/types/formData.ts

//import { useTranslations } from "next-intl";
//import { FieldErrors, UseFormRegister } from "react-hook-form";

import { z } from "zod";
import { schoolSchema } from "@/schemas/schema";

export type SchoolFormData = z.infer<typeof schoolSchema>;

export interface MediaItem {
  mediaUrl: string;
  type: "photo" | "video";
  description?: string;
  attachedTo: "school" | "primary" | "basic" | "secondary";
}
export interface mediaSectionProps {
  media: MediaItem[];
  onChange: (media: MediaItem[]) => void;
}

export type SchoolLevelFields = {
  price: number;
  discountAndPaymentTerms: string;
  numberOfStudents: number;
  meals: string;
  mealsDescription: string;
  transportation: string;
  schoolUniform: boolean;
  mandatorySportsClubs: string;
  teachingStyleBooks: string;
  textbooksPrice: string;
  clubsAndCircles: string;
  duration: string;
};

export type SchoolLevelKey = "primary" | "basic" | "secondary";

export type NestedSection =
  | "address"
  | "infrastructure"
  | "primary"
  | "basic"
  | "secondary";

// export type InfrastructureFields = {
//   buildings: boolean;
//   numberOfFloors: number;
//   squareness: number;
//   stadiums: boolean;
//   pools: boolean;
//   courtyard: boolean;
//   laboratories: boolean;
//   library: boolean;
//   computerLab: boolean; //დაემატა
//   cafe: boolean;
// };

// export type AddressFields = {
//   city: string;
//   street: string;
//   zipCode: string;
//   district: string;
// };
// export type LevelFields = {
//   price: number;
//   discountAndPaymentTerms: string;
//   numberOfStudents: number;
//   meals: string;
//   mealsDescription: string;
//   transportation: string;
//   schoolUniform: boolean;
//   mandatorySportsClubs: string;
//   teachingStyleBooks: string;
//   textbooksPrice: string;
//   clubsAndCircles: string;
//   duration: string;
// };

// export type FormData = {
//   name: string;
//   phoneNumber1: string;
//   phoneNumber2: string;
//   phoneNumber3: string;
//   schoolsWebSite: string;
//   facebookProfileURL: string;
//   instagramProfileURL: string;
//   establishedYear: number; //დაემატა
//   accreditationStatus: string; //დაემატა
//   accreditationComment: string; //დაემატა
//   founder: string;
//   director: string;
//   publicRelationsManager: string;
//   parentRelationshipManager: string;
//   graduationRate: string; //დაემატა
//   averageNationalExamScore: string; //დაემატა
//   description: string;
//   otherPrograms: string;
//   hasTutor: boolean;
//   tutorDescription: string;
//   hasScholarshipsGrants: boolean;
//   scholarshipsGrants: string;
//   hasExchangePrograms: boolean;
//   exchangePrograms: string;
//   hasOutdoorGarden: boolean;
//   outdoorGarden: string;
//   address: AddressFields;
//   infrastructure: InfrastructureFields;
//   primary: LevelFields;
//   basic: LevelFields;
//   secondary: LevelFields;
// };

// export type SchoolLevelSectionProps = {
//   level: "primary" | "basic" | "secondary";
//   register: UseFormRegister<SchoolFormData>;
//   errors: FieldErrors<SchoolFormData>;
// };

// export type AddressProps = {
//   address: AddressFields;
//   onChange: <K extends keyof AddressFields>(
//     field: K,
//     value: AddressFields[K]
//   ) => void;
//   t: ReturnType<typeof useTranslations>; // ✅ Add this
// };

// export interface InfrastructureSectionProps {
//   infrastructure: InfrastructureFields;
//   onChange: <K extends keyof InfrastructureFields>(
//     field: K,
//     value: InfrastructureFields[K]
//   ) => void;
//   t: ReturnType<typeof useTranslations>;
// }

// export interface TopLevelFieldsProps {
//   SchoolFormData: any;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;
// }
