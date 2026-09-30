import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { CourseCatalog } from "@/components/course-catalog";
import { Features } from "@/components/features";
import { UnionBenefits } from "@/components/union-benefits";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <CourseCatalog />
      <Features />
      <UnionBenefits />
      <SiteFooter />
    </main>
  );
}
