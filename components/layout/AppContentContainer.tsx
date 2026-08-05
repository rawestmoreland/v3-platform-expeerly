import type { ReactNode } from "react";
import { appContentContainerClassName } from "@/components/layout/contentContainerClasses";
import { cn } from "@/lib/utils";

export interface AppContentContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Main content width/inset matching AppHeader chrome (logo ↔ right menu).
 */
export function AppContentContainer({ children, className }: AppContentContainerProps) {
  return <div className={cn(appContentContainerClassName, className)}>{children}</div>;
}
