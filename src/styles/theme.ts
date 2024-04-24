"use client";
import { Roboto, Stick } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const stick = Stick({
  weight: ["400"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontFamily: stick.style.fontFamily,
    },
    h2: {
      fontFamily: stick.style.fontFamily,
    },
    h3: {
      fontFamily: stick.style.fontFamily,
    },
    h4: {
      fontFamily: stick.style.fontFamily,
    },
    h5: {
      fontFamily: stick.style.fontFamily,
    },
    h6: {
      fontFamily: stick.style.fontFamily,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#33ccbb",
    },
    secondary: {
      main: "#ff0099",
    },
  },
});

export default responsiveFontSizes(theme);
