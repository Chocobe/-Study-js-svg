import Head from "next/head";
import type { AppProps } from 'next/app'

import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";

import AppLayout from "@/layouts/AppLayout";
import GlobalStyle from "@/styles/globalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Head>
          <title>
            SVG 기반 BoundingBox 작업도구
          </title>
        </Head>

        <GlobalStyle />

        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
}
