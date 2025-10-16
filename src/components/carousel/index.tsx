import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";

// Import your images
import Image1 from "../../assets/img/carosel001.png";
import Image2 from "../../assets/img/carosel002.png";
import Image3 from "../../assets/img/carosel003.png";

interface SlideItem {
  name: string;
  image: string;
  alt: string;
}

// Define the carousel items in an array for easy management
const items: SlideItem[] = [
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
      indicatorIconButtonProps={{
        style: {
          padding: "8px",
          color: "#ffffff80",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#ffffff",
        },
      }}
      navButtonsProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "50%",
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

// Component for a single slide
const SlideItem: React.FC<SlideItem> = ({ name, image, alt }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        position: "relative",
        height: { xs: "30vh", md: "60vh" },
        overflow: "hidden",
        borderRadius: "12px",
        mx: { xs: 1, md: 2 },
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