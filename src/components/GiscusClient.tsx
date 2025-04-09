// src/components/GiscusClient.tsx
"use client";

import GiscusReact from "@giscus/react";
import type { GiscusProps } from "@giscus/react"; // Import props type for type safety

// Re-export the component, potentially adding default props or customization
export function Giscus(props: GiscusProps) {
  // You could add default props or modify props here if needed
  return <GiscusReact {...props} />;
}

// Or simply re-export if no customization needed:
// export { default as Giscus } from "@giscus/react";