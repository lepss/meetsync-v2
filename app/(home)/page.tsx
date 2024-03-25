import { HeroSection } from "@/components/home/HeroSection";
import { LatestEvent } from "@/components/home/LatestEvent";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <div className="mt-6 block gap-4 lg:flex">
        <HeroSection />
        <LatestEvent />
      </div>
    </main>
  );
}
