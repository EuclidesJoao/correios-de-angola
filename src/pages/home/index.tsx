import { CarouselComponent } from "../../components/carousel";
import GetPageContent from "../../components/getPage";


export const Home = () => {
  return (
    <>
      <CarouselComponent />
      <GetPageContent content="Home Page Content" />
    </>
  );
};
