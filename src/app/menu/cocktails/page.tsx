import Cocktailsmenu from "./components/Cocktailsmenu";
import CocktailHero from "./components/CocktailHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <CocktailHero />
      <Cocktailsmenu />
    </main>
  );
}