import TapasMenu from "./components/TapasMenu";
import TapasHero from "./components/TapasHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <TapasHero />
      <TapasMenu />
    </main>
  );
}