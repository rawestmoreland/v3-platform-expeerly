import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { ghostLinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { cn } from "@/lib/utils";

export type SectionHeaderProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  actionAriaLabel?: string;
  headingId?: string;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  actionLabel,
  actionHref,
  actionAriaLabel,
  headingId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex w-full items-center gap-4">
        <Heading as="h3" variant="title-1" className="min-w-0" id={headingId}>
          {title}
        </Heading>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className={cn(
              ghostLinkClassName("medium"),
              "ml-auto shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            aria-label={actionAriaLabel ?? actionLabel}
          >
            {actionLabel}
            <Icon name="chevron-right" size="sm" aria-hidden />
          </Link>
        ) : null}
      </div>
      {description ? (
        <Text variant="body-small-muted" className="mt-1">
          {description}
        </Text>
      ) : null}
    </div>
  );
}
