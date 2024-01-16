import React, { useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/Validator";
import CryptoJS from "crypto-js";

import { url } from "../../shared/utils/common";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const emailValidator = [VALIDATOR_EMAIL()];
  const passwordValidator = [VALIDATOR_MINLENGTH(6)];
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setEmailError(!validate(email, emailValidator));
    setPasswordError(!validate(password, passwordValidator));
    if (!emailError && !passwordError) {
      try {
        const secretKey = "mgfabygkp";
        const encryptedPassword = await CryptoJS.AES.encrypt(
          JSON.stringify(password),
          secretKey
        ).toString();
        let data = { email, password: encryptedPassword };
        console.log("data ", data);
        const loginDetails = await axios.post(`${url}/signup/login`, data);
        if (!loginDetails.data.success) {
          toast.error("Wrong credentials!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          localStorage.setItem("email", email);
          localStorage.setItem("token", loginDetails.data.token);
          window.location.reload();
        }
      } catch (e) {
        toast.error("Internal server error !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className=" h-screen bg-slate-50">
      <ToastContainer className="w-32 h-12 absolute right-0 " />
      <div className=" h-screen flex flex-col justify-center">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md ">
          <div className="flex items-center flex-col">
            <h4 className="text-2xl font-bold mb-4">Mindful Gurukul</h4>
            <img src="./logo.png" className="h-24 w-24" alt="../../asset" />
          </div>
          <Box
            component="form"
            sx={{ "& > :not(style)": { mb: 2 } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Invalid email format" : ""}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={
                passwordError ? "Password must be at least 6 characters" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="flex justify-between">
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                className="mx-10"
              >
                Login
              </Button>
              <Link
                to="/signup"
                className="underline text-black p-2 rounded-md hover:scale-105"
              >
                Signup
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
