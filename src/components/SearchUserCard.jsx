import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowUserSearchModal } from "../redux/slices/userSlice";
import BadgeAvatar from "./BadgeAvatar";

const SearchUserCard = ({ user }) => {
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const isOnline = onlineUsers.includes(user?._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (userId) => {
    navigate(`/${userId}`);
    dispatch(setShowUserSearchModal(false));
  };
  return (
    <>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"20px"}
        sx={{ cursor: "pointer" }}
        onClick={() => handleNavigate(user?._id)}
      >
        {/* <Box height={"50px"} width={"50px"} borderRadius={"50%"}>
          <img
            height={"50px"}
            width={"50px"}
            style={{ borderRadius: "50%" }}
            src={
              user?.profile_pic
                ? user?.profile_pic
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`
            }
            alt={user?.name}
          />
        </Box> */}

        <BadgeAvatar profilePic={user?.profile_pic} name={user?.name} id={user?._id} />

        <Box>
          <Typography variant="body1" fontWeight={"bold"}>
            {user.name}
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default SearchUserCard;
