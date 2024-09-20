import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../redux/baseApi/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFiles from "../helpers/uploadFiles";
import AuthHeader from "../components/AuthHeader";

const RegisterPage = () => {
  const [register, { isLoading, isError, isSuccess, data, error }] =
    useRegisterMutation();
  const navigate = useNavigate();

  const [profile_pic_file, setProfile_pic_file] = useState(null);
  // const [uploadedPicUrl, setUploadedPicUrl] = useState("")

  const handleProfilePicFile = async (e) => {
    const file = e.target.files[0];
    // const uploadedPic = await uploadFiles(file)
    // setUploadedPicUrl(uploadedPic?.secure_url)
    setProfile_pic_file(file);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/email");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log("err:", error);
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const uploadedPic = await uploadFiles(profile_pic_file);
      register({ ...values, profile_pic: uploadedPic?.secure_url });
      resetForm();
      setProfile_pic_file(null);
    },
  });

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <AuthHeader />
        <form onSubmit={formik.handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"400px"}
            gap={"20px"}
            mt={"20px"}
          >
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />

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

            <Box>
              <Typography variant="body1" pl={"14px"}>
                Profile Pic
              </Typography>
              <TextField
                sx={{ display: "none" }}
                type="file"
                id="profile_pic"
                variant="outlined"
                name="profile_pic"
                onChange={handleProfilePicFile}
              />
              <label htmlFor="profile_pic">
                <Box
                  border={"1px solid gray"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={"50px"}
                  width={"400px"}
                >
                  <Typography variant="body1">
                    {profile_pic_file?.name
                      ? profile_pic_file?.name?.substr(0, 20)
                      : "Upload profile picture"}
                  </Typography>
                </Box>
              </label>
            </Box>

            <Button type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default RegisterPage;
