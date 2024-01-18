import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CryptoJS from "crypto-js";
import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
} from "../../shared/utils/Validator";

import RenderTextField from "../../shared/components/RenderTextField";
import RenderButton from "../../shared/components/RenderButton";
import RenderRadioGroup from "../../shared/components/RenderRadioGroup";
import RenderCheckboxGroup from "../../shared/components/RenderCheckboxGroup";
import RenderSelect from "../../shared/components/RenderSelect";
const { url } = require("../../shared/utils/common");

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState([]);
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("");
  const [stateOptions] = useState(["Maharastra", "Karnatka", "Madhya Pardesh"]);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("show passowards visibility " + showPassword);
  };

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [hduknowError, sethduKnowError] = useState(false);
  const [cityError, setCityError] = useState(false);

  const emailValidator = [VALIDATOR_EMAIL()];
  const passwordValidator = [VALIDATOR_MINLENGTH(6)];
  const nameValidator = [VALIDATOR_REQUIRE()];
  const phoneValidator = [
    VALIDATOR_REQUIRE(),
    VALIDATOR_MINLENGTH(10),
    VALIDATOR_MAXLENGTH(10),
  ];
  const stateValidator = [VALIDATOR_REQUIRE()];
  const genderValidator = [VALIDATOR_REQUIRE()];
  const hduknowValidator = [VALIDATOR_REQUIRE()];
  const cityValidator = [VALIDATOR_REQUIRE()];
  const navigate = useNavigate();

  const handleSave = async () => {
    setEmailError(!validate(email, emailValidator));
    setPasswordError(!validate(password, passwordValidator));
    setNameError(!validate(name, nameValidator));
    setPhoneError(!validate(phone, phoneValidator));
    setStateError(!validate(state, stateValidator));
    setGenderError(!validate(gender, genderValidator));
    if (howDidYouHear.length !== 0)
      sethduKnowError(!validate(howDidYouHear[0], hduknowValidator));
    else sethduKnowError(true);
    setCityError(!validate(city, cityValidator));
    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      !phoneError &&
      !stateError &&
      !genderError &&
      !nameError &&
      !cityError
    ) {
      console.log("iske andar to nahi aani chahiye !");
      try {
        const data1 = {
          name,
          email,
          password,
          phone,
          gender,
          howDidYouHear,
          city,
          state,
        };
        const secretKey = "mgfabygkp";
        data1.password = await CryptoJS.AES.encrypt(
          JSON.stringify(password),
          secretKey
        ).toString();
        const response = await axios.post(`${url}/signup`, data1);
        console.log("this is response " + response.data.success);
        if (response.data.success) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate("/");// separate list of routes 
        } else {
          toast.error("email already exits  ", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        console.log(response);
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
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const howDidYouHearOptions = [
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Friends", label: "Friends" },
    { value: "JobPortal", label: "Job Portal" },
    { value: "Others", label: "Others" },
  ];
  const cityOptions = ["Mumbai", "Pune", "Ahmedabad"];

  return (
    <div className="h-full bg-slate-50  ">
      <ToastContainer />
      <div className="max-w-md mx-auto mt-4 p-6 bg-white shadow-md rounded-md ">
        <div className="flex flex-col items-center">
          <h4 className="text-2xl font-bold mb-4">Mindful Gurukul</h4>
          <img src="./logo.png" className="h-24 w-24" alt="../../asset" />
        </div>

        <Box
          component="form"
          sx={{ "& > :not(style)": { mb: 2 } }}
          noValidate
          autoComplete="off"
        >
          <RenderTextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
          />

          {/* Use RenderTextField in place of TextField */}
          <RenderTextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Invalid email format" : ""}
          />

          {/* Use RenderTextField in place of TextField */}
          <RenderTextField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <RenderTextField
            id="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
            helperText={
              phoneError
                ? phone.length === 0
                  ? "Phone number is req uired field"
                  : "10 digits required"
                : ""
            }
          />

          <Typography variant="subtitle1" gutterBottom>
            Select Gender
          </Typography>
          <RenderRadioGroup
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={genderOptions}
          />
          {genderError && <p className="text-red-600 text-sm">Select gender</p>}
          <Typography variant="subtitle1" gutterBottom>
            How did you hear ?
          </Typography>
          <div className="grid grid-cols-2 sm: grid-col-4">
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={howDidYouHear.includes("LinkedIn")}
                  onChange={() =>
                    setHowDidYouHear((prev) =>
                      prev.includes("LinkedIn")
                        ? prev.filter((item) => item !== "LinkedIn")
                        : [...prev, "LinkedIn"]
                    )
                  }
                />
              }
              label="LinkedIn"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={howDidYouHear.includes("Friends")}
                  onChange={() =>
                    setHowDidYouHear((prev) =>
                      prev.includes("Friends")
                        ? prev.filter((item) => item !== "Friends")
                        : [...prev, "Friends"]
                    )
                  }
                />
              }
              label="Friends"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={howDidYouHear.includes("JobPortal")}
                  onChange={() =>
                    setHowDidYouHear((prev) =>
                      prev.includes("JobPortal")
                        ? prev.filter((item) => item !== "JobPortal")
                        : [...prev, "JobPortal"]
                    )
                  }
                />
              }
              label="Job Portal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={howDidYouHear.includes("Others")}
                  onChange={() =>
                    setHowDidYouHear((prev) =>
                      prev.includes("Others")
                        ? prev.filter((item) => item !== "Others")
                        : [...prev, "Others"]
                    )
                  }
                />
              }
              label="Others"
            /> */}
            <RenderCheckboxGroup
              options={howDidYouHearOptions}
              selectedOptions={howDidYouHear}
              onChange={setHowDidYouHear}
            />
          </div>
          {hduknowError && (
            <p className="text-red-600 text-sm">Select how do you know ?</p>
          )}
          <RenderSelect
            id="city"
            label="City"
            options={cityOptions}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={cityError}
            helperText={cityError ? "Select city first" : ""}
          />
          {/* <TextField
            id="state"
            label="State"
            variant="outlined"
            fullWidth
            select
            SelectProps={{ native: true }}
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={stateError}
            helperText={stateError ? "select state first" : ""}
          >
            <option value="" disabled>
              State
            </option>
            {stateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField> */}
          <RenderSelect
            id="state"
            label="State"
            options={stateOptions}
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={stateError}
            helperText={stateError ? "Select state first" : ""}
          />
        </Box>

        <div className="flex justify-between ">
          <RenderButton
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="mx-10"
          >
            Signup
          </RenderButton>
          <Link
            to="/login"
            className="underline text-black p-2 rounded-md hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
