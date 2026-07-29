import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — BAGRAIN®",
  robots: { index: false },
};

export default function MentionsLegales() {
  return <LegalPage kind="mentions" />;
}
