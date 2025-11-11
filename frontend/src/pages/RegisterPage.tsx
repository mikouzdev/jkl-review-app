import { useState } from "react";
import axios from "axios";
import RegisterForm, { type RegisterData } from "../components/RegisterForm";

function RegisterPage() {
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
      const response = await axios.post("api/users/register", form);
      if (response.status === 201) alert("Käyttäjän luominen onnistui.");
    } catch (error) {
      setError("Rekisteröinti epäonnistui, yritä uudelleen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RegisterForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
}

export default RegisterPage;
