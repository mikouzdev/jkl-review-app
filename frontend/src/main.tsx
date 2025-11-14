import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme.ts";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "leaflet/dist/leaflet.css";
import { SnackbarProvider } from "./context/SnackbarContext.tsx";

const CLIENT_ID = "1019147150385-0bcgn38qn19tcbk9f4n0055nkgl04jg8.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  </StrictMode>
);
