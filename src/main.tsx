import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.ts";
import { queryClient } from "./service/store/reactQuery.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
