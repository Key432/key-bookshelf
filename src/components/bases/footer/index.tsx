import { Box, Container } from "@mui/material";
import Link from "next/link";

export function Footer() {
  return (
    <Box
      bgcolor='primary.main'
      component='footer'
      sx={{ height: "3rem", display: "flex", alignItems: "center" }}
    >
      <Container maxWidth='xl' sx={{ textAlign: "right" }}>
        <Link href='#' target='_blank'>
          <Box>リポジトリ</Box>
        </Link>
      </Container>
    </Box>
  );
}
