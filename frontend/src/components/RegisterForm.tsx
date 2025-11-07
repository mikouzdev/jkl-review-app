import { Container, Button, Paper, Typography, Box, TextField } from '@mui/material';

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface Props {
    form: RegisterData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string;
    isLoading: boolean;
}

function RegisterForm({ form, handleChange, handleSubmit, error, isLoading }: Props) {
    return (
        <Container sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 2
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom>
                    Register
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={
                        {
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 2
                        }}
                >

                    <TextField value={form.username} onChange={handleChange} name="username" label="Käyttäjänimi" variant="outlined" fullWidth />
                    <TextField value={form.email} onChange={handleChange} name="email" label="Sähköposti" type="email" variant="outlined" fullWidth />
                    <TextField value={form.password} onChange={handleChange} name="password" label="Salasana" type="password" variant="outlined" fullWidth />
                    <TextField value={form.confirmPassword} onChange={handleChange} name="confirmPassword" label="Vahvista salasana" type="password" variant="outlined" fullWidth />

                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}

                    <Button disabled={isLoading} type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
                        Luo käyttäjä
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default RegisterForm