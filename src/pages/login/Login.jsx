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
} from "@mui/material";
import { VisibilityOff, Visibility, ErrorSharp } from "@mui/icons-material";
import { prodUrl } from "../../config";
import { useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const handleClickShowPassword = () => setShowPassword(!showPassword);
  // const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(values));
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

    fetch(prodUrl + "/api/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/");
        }
        else{
          throw new Error(result.error)
        }

      })
      .catch((error) => console.log("error", error));
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

// Error Handling

// const { register, formState: { errors } } = useForm();
// console.log(errors);

const [formErrors, setFormErrors] = useState({});

const validate = (values) => {
  const error = {}
  const regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!values.username) {
      error.username = "Username is required"
  }
  if (!values.Password) {
      error.username = "Password is required"
  }

  return error;


}

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
                // required
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField 
                id="outlined-basic"
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                {...register("firstName", { required: "First Name is required."})}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}

              />

            </Grid> */}

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
                  // required
                  // {...register("pass", { required: "Password is required."})}
                  // error={Boolean(errors.pass)}
                  // helperText={errors.pass?.message}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
