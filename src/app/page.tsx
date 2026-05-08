import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { TopBar } from "@/components/top-bar";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <Footer />
      </main>
    </>
  );
}
