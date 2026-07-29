import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — BAGRAIN®",
  robots: { index: false },
};

export default function Confidentialite() {
  return <LegalPage kind="privacy" />;
}
