import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserDetails, setUser } from "../redux/slices/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useUpdateUserDetailsMutation } from "../redux/baseApi/baseApi";
import uploadFiles from "../helpers/uploadFiles";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius:'20px'
};

export default function UserDetailsModal() {
  const dispatch = useDispatch();
  const showUserDetails = useSelector((state) => state.user.showUserDetails);
  const { name, profile_pic } = useSelector((state) => state.user);
  const handleOpen = () => dispatch(setShowUserDetails(true));
  const handleClose = () => dispatch(setShowUserDetails(false));

  const [updateDetails, { isLoading, isSuccess, data, isError, error }] =
    useUpdateUserDetailsMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      dispatch(setUser(data?.data));
      dispatch(setShowUserDetails(false));
    }
  }, [isSuccess, data]);

  const [profile_pic_file, setProfile_pic_file] = useState(null);

  const handleProfilePicFile = async (e) => {
    const file = e.target.files[0];
    setProfile_pic_file(file);
  };

  const formik = useFormik({
    initialValues: {
      name: name,
      profile_pic: profile_pic,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const uploadedPic = await uploadFiles(profile_pic_file);
      updateDetails({ ...values, profile_pic: uploadedPic?.secure_url });
      resetForm();
      setProfile_pic_file(null);
    },
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showUserDetails}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showUserDetails}>
        <Box
          component={"form"}
          sx={style}
          onSubmit={formik.handleSubmit}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />

          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Box height={"100px"} width={"100px"} borderRadius={"50%"}>
              <img
                height={"100px"}
                width={"100px"}
                src={
                  profile_pic
                    ? profile_pic
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
                }
                alt=""
                style={{ borderRadius: "50%" }}
              />
              <TextField
                sx={{ display: "none" }}
                type="file"
                id="profile_pic"
                variant="outlined"
                name="profile_pic"
                onChange={handleProfilePicFile}
              />
            </Box>

            <label htmlFor="profile_pic" style={{ flexGrow: 1 }}>
              <Button
                variant="outlined"
                component="span"
                sx={{ width: "100%", height: "100%" }}
              >
                {profile_pic_file?.name
                  ? profile_pic_file?.name?.substr(0, 20)
                  : "Change profile picture"}
              </Button>
            </label>
          </Box>

          <Button type="submit" variant="contained">
            Update Details
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
