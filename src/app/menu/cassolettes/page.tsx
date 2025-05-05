import CassolettesMenu from "./components/CassolettesMenu";
import CassolettesHero from "./components/CassolettesHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <CassolettesHero />
      <CassolettesMenu />
    </main>
  );
}