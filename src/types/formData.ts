/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/types/formData.ts

import { useTranslations } from "next-intl";

export interface MediaItem {
  mediaUrl: string;
  type: "photo" | "video";
  description?: string;
  attachedTo: "school" | "primary" | "basic" | "secondary";
}

export type InfrastructureFields = {
  buildings: boolean;
  numberOfFloors: number;
  squareness: number;
  stadiums: boolean;
  pools: boolean;
  courtyard: boolean;
  laboratories: boolean;
  library: boolean;
  computerLab: boolean; //დაემატა
  cafe: boolean;
};

export type AddressFields = {
  city: string;
  street: string;
  zipCode: string;
  district: string;
};

export type FormData = {
  name: string;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  schoolsWebSite: string;
  facebookProfileURL: string;
  instagramProfileURL: string;
  establishedYear: number; //დაემატა
  accreditationStatus: string[]; //დაემატა
  accreditationComment: string; //დაემატა
  founder: string;
  director: string;
  publicRelationsManager: string;
  parentRelationshipManager: string;
  graduationRate: string; //დაემატა
  averageNationalExamScore: string; //დაემატა
  description: string;
  otherPrograms: string;
  hasTutor: boolean;
  tutorDescription: string;
  hasScholarshipsGrants: boolean;
  scholarshipsGrants: string;
  hasExchangePrograms: boolean;
  exchangePrograms: string;
  hasOutdoorGarden: boolean;
  outdoorGarden: string;
  address: AddressFields;
  infrastructure: InfrastructureFields;
  primary: LevelFields;
  basic: LevelFields;
  secondary: LevelFields;
};

export type LevelKey = "primary" | "basic" | "secondary";

export type LevelFields = {
  price: number;
  discountAndPaymentTerms: string;
  numberOfStudents: number;
  meals: string;
  mealsDescription: string;
  transportation: string;
  schoolUniform: boolean;
  schoolUniformPhotoUrls: string[];
  mandatorySportsClubs: string[];
  teachingStyleBooks: string;
  textbooksPrice: string;
  clubsAndCircles: string;
  duration: string;
};

export type SchoolLevelSectionProps = {
  level: "primary" | "basic" | "secondary";
  data: LevelFields;
  onChange: <K extends keyof LevelFields>(
    level: "primary" | "basic" | "secondary",
    field: K,
    value: LevelFields[K]
  ) => void;
  t: ReturnType<typeof useTranslations>; // 👈 add this line
};

export type NestedSection =
  | "address"
  | "infrastructure"
  | "primary"
  | "basic"
  | "secondary";

export type AddressProps = {
  address: AddressFields;
  onChange: <K extends keyof AddressFields>(
    field: K,
    value: AddressFields[K]
  ) => void;
  t: ReturnType<typeof useTranslations>; // ✅ Add this
};

export interface InfrastructureSectionProps {
  infrastructure: InfrastructureFields;
  onChange: <K extends keyof InfrastructureFields>(
    field: K,
    value: InfrastructureFields[K]
  ) => void;
  t: ReturnType<typeof useTranslations>;
}

export interface TopLevelFieldsProps {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface mediaSectionProps {
  media: MediaItem[];
  onChange: (media: MediaItem[]) => void;
}
