import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { cn } from "@/lib/utils";

export type StatMetricProps = {
  value: string;
  label: string;
  labelClassName?: string;
};

export function StatMetric({ value, label, labelClassName }: StatMetricProps) {
  return (
    <div>
      <Heading as="h4" variant="heading-2" className="tabular-nums text-secondary">
        {value}
      </Heading>
      {labelClassName ? (
        <p className={cn("mt-0.5", labelClassName)}>{label}</p>
      ) : (
        <Text as="p" variant="body-small-muted" className="mt-0.5">
          {label}
        </Text>
      )}
    </div>
  );
}
