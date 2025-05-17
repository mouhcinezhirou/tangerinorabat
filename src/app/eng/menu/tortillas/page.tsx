import TortillasMenu from "./components/TortillasMenu";
import TortillasHero from "./components/TortillasHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <TortillasHero />
      <TortillasMenu />
    </main>
  );
}