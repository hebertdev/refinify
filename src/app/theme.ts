import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    brand: [
      "#fff1e1",
      "#ffe3cb",
      "#ffc599",
      "#ffa563",
      "#ff8a36",
      "#ff7918",
      "#ff7006",
      "#e45f00",
      "#cc5300",
      "#b24500",
    ],
    dark: [
      "#FF6B00", // color del título en darkmode
      "#FF6B00", // color del link <a> en darkmode
      "#d7d7d7", // color del texto <p> en darkmode
      "#8B8B8B", // input placeholder color en darkmode
      "#313131", // border input color en darkmode (ajustado a negro)
      "#010101", // color border en div en darkmode y también default hover button (ajustado a negro)
      "#1A1A1A", // input bg en darkmode (puedes ajustar esto según lo que prefieras)
      "#000000", // background color en darkmode (ajustado a negro puro)
      "#272727", // mantine color dark 8 (ajustado a negro)
      "#fad", // color adicional
    ],
  },
  primaryColor: "brand",
});
