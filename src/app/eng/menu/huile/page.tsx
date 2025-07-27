import HuileMenu from "./components/HuileMenu";
import HuileHero from "./components/HuileHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <HuileHero />
      <HuileMenu />
    </main>
  );
}