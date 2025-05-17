import PaellasMenu from "./components/PaellasMenu";
import PaellasHero from "./components/PaellasHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <PaellasHero />
      <PaellasMenu />
    </main>
  );
}