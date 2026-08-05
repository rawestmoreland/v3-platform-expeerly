import type { ReactNode } from "react";
import { DesignSystemComponentsNav } from "@/app/(platform)/bdn/designsystem/ui/DesignSystemComponentsNav";

export default function DesignSystemComponentsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
      <aside className="lg:sticky lg:top-8">
        <DesignSystemComponentsNav />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
