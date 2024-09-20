import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import { useCheckEmailMutation } from "../redux/baseApi/baseApi";

const CheckEmail = () => {
  const [checkEmail, {isLoading, isError, error, isSuccess, data}] = useCheckEmailMutation()
  const navigate = useNavigate();

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message)
      navigate('/password', {
        state: data?.data
      })
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
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      checkEmail({...values});
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
            label="Email"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button type="submit" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CheckEmail;
