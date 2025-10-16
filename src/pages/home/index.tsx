import { About } from "../../components/about";

import { CarouselComponent } from "../../components/carousel";
import { News } from "../../components/news";
import { NewVisual } from "../../components/newVisual";
import { Services } from "../../components/services";

export const Home = () => {
  return (
    <>
      <CarouselComponent />
      <Services />
      <News />
      <About />
      <NewVisual />
    </>
  );
};
