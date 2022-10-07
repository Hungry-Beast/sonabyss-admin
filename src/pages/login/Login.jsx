import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { prodUrl } from "../../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  // const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      regNo: e.target.regNo.value,
      password: e.target.pass.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(prodUrl + "/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setisLoading(false);
        console.log(result);
        if (result.success) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/");
        } else {
          throw new Error(result.error);
        }
      })
      .catch((error) => {
        Swal.fire(
          "Incorrect Password",
          "Please use correct credential",
          "error"
        );
        console.log("error", error);
      });
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Typography
        gutterBottom
        variant="h3"
        align="center"
        sx={{ fontFamily: "Roboto" }}
      >
        Login Page
      </Typography>
      <Card sx={{ maxWidth: "450px", margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}></Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ margin: "5px auto" }}
                name="regNo"
                label="Registration no"
                placeholder="Enter your registration no"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  sx={{ marginBottom: "5px" }}
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  placeholder="Enter your password"
                  name="pass"
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
