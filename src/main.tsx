import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.ts";
import { queryClient } from "./service/store/reactQuery.ts";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <GlobalStyle />
          <Toaster />
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
