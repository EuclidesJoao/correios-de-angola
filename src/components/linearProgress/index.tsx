import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", width: "100%" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: `linear-gradient(180deg,rgba(226, 33, 29, 1) 50%, rgba(0, 0, 0, 1) 50%)`,
          padding: 1,
        }}
      ></Box>

      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(226, 33, 29, 0.2)",
              // Styles the moving bar itself
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: "#e2211d",
              },
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 200);

    // Cleans up the timer when the component is unmounted.
    return () => {
      clearInterval(timer);
    };
  }, []); // The empty array ensures this effect runs only once on mount.

  return <LinearProgressWithLabel value={progress} />;
}
