import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import MailIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/LockOpen';
import BackgroundImage from "../../assets/images/signin-bg.jpg";
import LogoDevIcon from '@mui/icons-material/LogoDev';

const SignInView = ({
  email = "",
  password = "",
  handleFieldChange = () => {},
  handleLogin = () => {}
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        height: "100vh"
      }}
    >
      <Paper
        sx={{
          width: "25%",
          minHeight: "50%",
          maxHeight: "90%",
          borderRadius: 2
        }}
      >
        <Box
          sx={{
            pt: 2,
            pb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey.50",
            borderRadius: "8px 8px 0px 0px"
          }}
        >
          <LogoDevIcon
            sx={{
              fontSize: 48,
            }}
          />
        </Box>
        <Box sx={{ p: 4 }}>
          <Typography
            variant="body1"
            color="primary.light"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            SIGN IN
          </Typography>
          <TextField
            value={email}
            onChange={handleFieldChange}
            InputProps={{
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                  <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                </>
              )
            }}
            name="email"
            placeholder="xxxx@example.com"
            variant="outlined"
            margin="dense"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            type="password"
            value={password}
            onChange={handleFieldChange}
            InputProps={{
              startAdornment: (
                <>
                  <InputAdornment position="start">
                   <LockIcon />
                  </InputAdornment>
                  <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                </>
              )
            }}
            name="password"
            placeholder="Password"
            variant="outlined"
            margin="dense"
            size="small"
            fullWidth
          />
          <Typography
            variant="body2"
            color="primary.light"
            sx={{ mt: 2, mb: 2, textAlign: "center" }}
          >
            Don't remember your password?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            size="large"
            fullWidth
            sx={{ borderRadius: 2, mb: 2, textTransform: "none" }}
            disabled={!email.length || !password.length}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignInView;
