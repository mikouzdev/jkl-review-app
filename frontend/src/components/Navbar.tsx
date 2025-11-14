import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography component={Link} variant="h6" to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            arvostele.jkl
          </Typography>
        </Box>

        {isAuthenticated ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={Link} to="/profile" variant="contained" size="small">
              Profiili
            </Button>
            <Button variant="contained" onClick={handleLogout} size="small">
              Kirjaudu ulos
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" component={Link} to="/login" size="small">
              Kirjaudu
            </Button>
            <Button variant="contained" component={Link} to="/register" size="small">
              Luo Käyttäjä
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
