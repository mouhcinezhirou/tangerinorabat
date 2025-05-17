import Champagne from "./components/Champagne";
import ChampagneHero from "./components/ChampagneHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <ChampagneHero />
      <Champagne />
    </main>
  );
}