import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";

// Import your images
import Image1 from "../../assets/img/carosel001.png";
import Image2 from "../../assets/img/carosel002.png";
import Image3 from "../../assets/img/carosel003.png";

interface SlideItems {
  name: string;
  image: string;
  alt: string;
}

// Define the carousel items in an array for easy management
const items: SlideItems[] = [
  {
    name: "Slide 1",
    image: Image1,
    alt: "A descriptive alt text for image 1",
  },
  {
    name: "Slide 2",
    image: Image2,
    alt: "A descriptive alt text for image 2",
  },
  {
    name: "Slide 3",
    image: Image3,
    alt: "A descriptive alt text for image 3",
  },
];

// Component for a single slide
const SlideItem: React.FC<SlideItems> = ({ name, image, alt }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        position: "relative",
        height: { xs: "30vh", md: "100vh" },
        overflow: "hidden",
        borderRadius: "0 0 32rem 32rem ",
        mx: { xs: 1, md: 0 },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
    </Paper>
  );
};

export const CarouselComponent = () => {
  return (
    <Carousel
      autoPlay={true}
      animation="slide"
      indicators={true}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      duration={700}
      interval={5000}
      sx={{ position: "relative !important" }}
      indicatorIconButtonProps={{
        style: {
          padding: "8px",
          color: "#e20e0eff",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#ffffff",
        },
      }}
      navButtonsProps={{
        style: {
          margin: "0 5rem 0 5rem",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "50%",
        },
      }}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "20px", // Distance from bottom of image
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        },
      }}
    >
      {items.map((item) => (
        <SlideItem
          key={item.name}
          name={item.name}
          image={item.image}
          alt={item.alt}
        />
      ))}
    </Carousel>
  );
};
