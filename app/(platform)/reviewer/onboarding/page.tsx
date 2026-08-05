import { redirect } from "next/navigation";

/** Legacy path — welcome home is now `/reviewer`. */
export default function ReviewerOnboardingRedirectPage() {
  redirect("/reviewer");
}
