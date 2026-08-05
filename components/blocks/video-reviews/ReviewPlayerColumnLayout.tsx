import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ReviewPlayerColumnLayoutProps = {
  video: ReactNode;
  details: ReactNode;
  className?: string;
};

export function ReviewPlayerColumnLayout({ video, details, className }: ReviewPlayerColumnLayoutProps) {
  return (
    <div
      className={cn(
        "mt-7 flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12",
        className,
      )}
    >
      <div className="flex w-full shrink-0 justify-center max-md:-mx-6 md:w-auto md:justify-start">
        {video}
      </div>
      <div className="min-w-0 flex-1">{details}</div>
    </div>
  );
}
