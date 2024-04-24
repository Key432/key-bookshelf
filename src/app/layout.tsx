import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import { Header } from "@/components/bases/header";

import "./global.css";
import { Footer } from "@/components/bases/footer";
import { grey } from "@mui/material/colors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "わたしの本棚",
  description: "蔵書管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box height='100%'>
              <Header />
              <Box component='main' minHeight='calc(100% - 6rem)'>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
