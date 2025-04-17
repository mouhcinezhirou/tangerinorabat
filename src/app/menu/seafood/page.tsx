import SeafoodMenu from "./components/SeafoodMenu";
import SeafoodHero from "./components/SeafoodHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <SeafoodHero />
      <SeafoodMenu />
    </main>
  );
}