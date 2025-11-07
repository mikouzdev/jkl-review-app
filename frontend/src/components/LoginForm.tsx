import { Container, Button, Paper, Typography, Box, TextField } from '@mui/material';

export interface LoginData {
    email: string;
    password: string;
}

interface Props {
    form: LoginData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string;
    isLoading: boolean;
}

function LoginForm({ form, handleChange, handleSubmit, error, isLoading }: Props) {
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
                    gutterBottom
                >
                    Kirjaudu sisään
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

                    <TextField value={form.email} onChange={handleChange} name="email" label="Sähköposti" type="email" variant="outlined" fullWidth />
                    <TextField value={form.password} onChange={handleChange} name="password" label="Salasana" type="password" variant="outlined" fullWidth />

                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}

                    <Button disabled={isLoading} type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
                        Kirjaudu sisään
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default LoginForm;