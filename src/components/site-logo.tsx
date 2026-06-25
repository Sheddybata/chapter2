import Image from "next/image";

import { site } from "@/lib/site";

type SiteLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  size = 40,
  className = "object-contain",
  priority = false,
}: SiteLogoProps) {
  return (
    <Image
      src={site.logo}
      alt={site.name}
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
