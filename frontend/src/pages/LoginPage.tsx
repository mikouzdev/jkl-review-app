import { useState } from "react";
import LoginForm, { type LoginData } from "../components/LoginForm";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Container } from "@mui/material";

function LoginPage() {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) return setError("Täytä kaikki kentät.");

    setIsLoading(true);
    loginRequest();
  };

  async function loginRequest() {
    setIsLoading(true);
    try {
      const success = await login(form.email, form.password);
      if (success) navigate("/");
      else return setError("Kirjautuminen epäonnistui.");
    } catch {
      setError("Kirjautuminen epäonnistui, yritä uudelleen.");
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
      <LoginForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      <GoogleLogin onSuccess={handleGoogleSignIn} onError={() => console.log("Error loggin in")} />
    </Container>
  );
}

export default LoginPage;
