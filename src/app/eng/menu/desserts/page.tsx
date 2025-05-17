import PoissonsMenu from "./components/DessertsMenu";
import PoissonsHero from "./components/DessertsHero";
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