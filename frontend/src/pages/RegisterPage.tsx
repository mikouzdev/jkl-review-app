import { useState } from "react";
import axios from "axios";
import RegisterForm, { type RegisterData } from "../components/RegisterForm";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Container } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../context/SnackbarContext";
import api from "../api/api";

function RegisterPage() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useSnackbar();
  const { googleSignIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password || !form.confirmPassword)
      return setError("Täytä kaikki kentät.");

    if (!form.email.includes("@")) return setError("Sähköposti ei kelpaa.");

    if (form.password.length < 6) return setError("Salasanan täytyy olla vähintään 6 merkkiä.");

    if (form.password !== form.confirmPassword) return setError("Salasanat eivät täsmää.");

    setIsLoading(true);
    registerRequest();
  };

  async function registerRequest() {
    try {
      const response = await api.post("api/users/register", form);
      if (response.status === 201) showSuccess("Käyttäjän luominen onnistui.");
      navigate("/login");
    } catch (error) {
      setError("Rekisteröinti epäonnistui, yritä uudelleen.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn(credential: CredentialResponse) {
    setIsLoading(true);
    try {
      const success = await googleSignIn(credential);
      if (success) navigate("/");
      else return setError("Kirjautuminen epäonnistui.");
    } catch {
      setError("Kirjautuminen epäonnistui, yritä uudelleen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container
      sx={{
        height: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <RegisterForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
      <GoogleLogin onSuccess={handleGoogleSignIn} onError={() => showError("Kirjautuminen epäonnistui.")} />
    </Container>
  );
}

export default RegisterPage;
