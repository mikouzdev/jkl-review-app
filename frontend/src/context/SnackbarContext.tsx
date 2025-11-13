import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarSeverity = "success" | "error";

interface SnackbarContextType {
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as SnackbarSeverity,
  });

  function showSnackbar(message: string, severity: SnackbarSeverity) {
    setSnackbar({ open: true, message, severity });
  }

  function showSuccess(message: string) {
    showSnackbar(message, "success");
  }

  function showError(message: string) {
    showSnackbar(message, "error");
  }

  function handleClose() {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar, showSuccess, showError }}>
      <Snackbar open={snackbar.open} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity={snackbar.severity} onClose={handleClose} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return ctx;
}
