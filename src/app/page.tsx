// app/page.tsx
import { redirect } from "next/navigation";

export default function RootRedirect() {
  redirect("/ka"); // or "/en" as your default
}
