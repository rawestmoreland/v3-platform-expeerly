import * as React from "react";
import { StatMetric } from "@/components/ui/molecules/StatMetric";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

export type DataCardProps = {
  value: string;
  label: string;
  labelClassName?: string;
  children?: React.ReactNode;
  className?: string;
};

export function DataCard({ value, label, labelClassName, children, className }: DataCardProps) {
  return (
    <Card padding="small" className={cn("text-center sm:text-left", className)}>
      <StatMetric value={value} label={label} labelClassName={labelClassName} />
      {children ? (
        <div className="mt-3 flex justify-center sm:justify-start">{children}</div>
      ) : null}
    </Card>
  );
}
