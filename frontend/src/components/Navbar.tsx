import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        component={Link}
                        variant="h6"
                        to="/"
                        sx={{ textDecoration: "none", color: "inherit" }}
                    >
                        Jyväskylä arvostelut
                    </Typography>
                </Box>

                {isAuthenticated ? (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button variant="outlined">Profile</Button>
                        <Button variant="outlined" onClick={logout}>Logout</Button>
                    </Box>
                ) :
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button variant="outlined" component={Link} to="/login">Log in</Button>
                        <Button variant="outlined" component={Link} to="/register">Register</Button>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;