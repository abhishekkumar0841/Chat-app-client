import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useCheckPasswordMutation } from "../redux/baseApi/baseApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/userSlice";

const CheckPassword = () => {
  const [checkPassword, {isLoading, isError, error, isSuccess, data}] = useCheckPasswordMutation()
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message)
      dispatch(setToken(data?.token))
      navigate('/')
    }
  },[isSuccess, data])

  useEffect(()=>{
    if(isError){
      console.log('error:', error);
      toast.error(error?.data?.message)
    }
  },[isError, error])

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        password: values.password,
        userId: location?.state?._id
      }
      checkPassword(data);
      resetForm();
    },
  });

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <AuthHeader/>
        <Box
          component={"form"}
          onSubmit={formik.handleSubmit}
          display={"flex"}
          flexDirection={"column"}
          width={"400px"}
          gap={"20px"}
          mt={"20px"}
        >
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CheckPassword;
