import { AppBar, Container, Toolbar } from "@mui/material";
import Link from "next/link";
import { Logo } from "../logo";

export function Header() {
  return (
    <AppBar
      component='header'
      position='sticky'
      sx={{ height: "3rem", display: "flex", justifyContent: "center", bottom: 0 }}
    >
      <Container maxWidth='xl'>
        <Toolbar>
          <Link href='/'>
            <Logo component='p' variant='h6' />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
