import { Typography, TypographyProps } from "@mui/material";
import { Stick, Noto_Color_Emoji } from "next/font/google";

const stick = Stick({
  weight: ["400"],
  subsets: ["latin"],
});

const notoEmoji = Noto_Color_Emoji({
  weight: ["400"],
  subsets: ["emoji"],
});

export function Logo({ ...props }: TypographyProps) {
  const { fontFamily, component } = props;
  return (
    <Typography
      fontFamily={fontFamily || stick.style.fontFamily}
      component={component || "p"}
      {...props}
    >
      <Typography fontFamily={notoEmoji.style.fontFamily} component='span' fontSize='inherit'>
        📚
      </Typography>
      わたしの本棚
    </Typography>
  );
}
