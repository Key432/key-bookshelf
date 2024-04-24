"use client";

import { BookForm } from "@/features/components/Form";
import { Box, Container, Typography } from "@mui/material";

export function Editor() {
  return (
    <Box>
      <Box textAlign='center' py={2}>
        <Typography variant='h4' component='h1'>
          登録
        </Typography>
      </Box>
      <Box pb={2}>
        <Container maxWidth='md'>
          <BookForm />
        </Container>
      </Box>
    </Box>
  );
}
