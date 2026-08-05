import { AppContentContainer } from "@/components/layout/AppContentContainer";
import { PageCanvas } from "@/components/layout/PageCanvas";
import type { ReactNode } from "react";

export default function ReviewerLayout({ children }: { children: ReactNode }) {
  return (
    <PageCanvas>
      <AppContentContainer className="py-12 md:py-16">{children}</AppContentContainer>
    </PageCanvas>
  );
}
