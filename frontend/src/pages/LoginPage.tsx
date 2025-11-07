import { useState } from "react";
import LoginForm, { type LoginData } from "../components/LoginForm";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("");
    const [form, setForm] = useState<LoginData>({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) return setError("Täytä kaikki kentät.")

        setIsLoading(true);
        loginRequest();
    }

    async function loginRequest() {
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

    return <LoginForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
    />
}

export default LoginPage;