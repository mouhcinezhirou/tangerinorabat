import PoissonsMenu from "./components/PoissonsMenu";
import PoissonsHero from "./components/PoissonsHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <PoissonsHero />
      <PoissonsMenu />
    </main>
  );
}