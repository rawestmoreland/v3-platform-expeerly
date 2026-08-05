import type { ReactNode } from "react";

export interface PageCanvasProps {
  children: ReactNode;
}

/**
 * App page layout enforcement point (future). No structure or chrome.
 * Design system routes must not use this — they own layout under app/(platform)/bdn/designsystem/.
 */
export function PageCanvas({ children }: PageCanvasProps) {
  return children;
}
