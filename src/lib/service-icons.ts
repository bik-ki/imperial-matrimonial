import {
  Compass,
  FileBadge,
  FileCheck2,
  Globe2,
  Scale,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

const serviceIcons: Record<string, LucideIcon> = {
  "court-marriage-registration": Scale,
  "marriage-documentation": ScrollText,
  "foreign-national-marriage": Globe2,
  "single-status-certificate": FileBadge,
  "legal-consultation": FileCheck2,
  "registration-guidance": Compass,
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Scale;
}
