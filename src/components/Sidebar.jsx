import { Box, IconButton, Stack, Typography, Divider } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import MessageIcon from "@mui/icons-material/Message";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/baseApi/baseApi";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  setShowUserDetails,
  setShowUserSearchModal,
} from "../redux/slices/userSlice";
import UserDetailsModal from "./UserDetailsModal";
import SearchUserModal from "./SearchUserModal";
import BadgeAvatar from "./BadgeAvatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideocamIcon from "@mui/icons-material/Videocam";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showUserDetails = useSelector((state) => state.user.showUserDetails);
  const showSearchUserModal = useSelector(
    (state) => state.user.showSearchUserModal
  );
  const { name, _id, profile_pic } = useSelector((state) => state.user);
  const socketConnection = useSelector(
    (state) => state.socket?.socketConnection
  );

  const [allUser, setAllUser] = useState([]);

  const [logout, { isLoading, isSuccess, data, isError, error }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      dispatch(logoutUser());
      navigate("/email");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", _id);

      socketConnection.on("conversation", (data) => {
        // console.log("con data:", data);
        const conUserData = data.map((conUser) => {
          if (conUser?.sender?._id === conUser?.receiver?._id) {
            return {
              ...conUser,
              userDetails: conUser?.sender,
            };
          } else if (conUser?.receiver?._id !== _id) {
            return {
              ...conUser,
              userDetails: conUser?.receiver,
            };
          } else {
            return {
              ...conUser,
              userDetails: conUser?.sender,
            };
          }
        });

        setAllUser(conUserData);
      });
    }
  }, [socketConnection]);

  return (
    <>
      <Stack
        bgcolor={"#ebe9e6"}
        height={"100vh"}
        width={"70px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        flexShrink={0}
        py={"20px"}
      >
        <Stack
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <IconButton>
            <MessageIcon
              fontSize="large"
              titleAccess="Messages"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>
          <IconButton onClick={() => dispatch(setShowUserSearchModal(true))}>
            <PersonAddAltIcon
              fontSize="large"
              titleAccess="Users"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>
        </Stack>

        <Stack
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Box
            height={"50px"}
            width={"50px"}
            borderRadius={"50%"}
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(setShowUserDetails(true))}
          >
            <BadgeAvatar profilePic={profile_pic} name={name} id={_id} />
          </Box>

          <IconButton onClick={() => logout()}>
            <LogoutIcon
              fontSize="large"
              titleAccess="Logout"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>
        </Stack>
      </Stack>

      <Box width={"300px"} borderRight={"8px solid #ebe9e6"}>
        <Typography
          variant="h4"
          textAlign={"center"}
          borderBottom={"8px solid #ebe9e6"}
          padding={"10px"}
        >
          Messages
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={"14px"}>
          {allUser?.length > 0 ? (
            allUser?.map((user, idx) => (
              <Fragment key={user?._id}>
                <NavLink
                  to={`/${user?.userDetails?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"12px"}
                    px={"14px"}
                    pt={idx === 0 && "18px"}
                  >
                    <BadgeAvatar
                      profilePic={user?.userDetails?.profile_pic}
                      name={user?.userDetails?.name}
                      id={user?.userDetails?._id}
                    />
                    <Box>
                      <Typography variant="body1">
                        {user?.userDetails?.name}
                      </Typography>
                      <Typography variant="body2">
                        {user?.lastMessage?.text?.length > 15
                          ? user?.lastMessage?.text?.substr(0, 14) + "..."
                          : user?.lastMessage?.text}
                      </Typography>
                      {user?.lastMessage?.imageUrl && (
                        <Box display={"flex"} alignItems={"center"} gap={"6px"}>
                          <CameraAltIcon sx={{ color: "GrayText" }} />
                          <Typography color={"GrayText"} variant="body2">
                            Image
                          </Typography>
                        </Box>
                      )}

                      {user?.lastMessage?.videoUrl && (
                        <Box display={"flex"} alignItems={"center"} gap={"6px"}>
                          <VideocamIcon sx={{ color: "GrayText" }} />
                          <Typography color={"GrayText"} variant="body2">
                            Video
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {Boolean(user?.unSeenMessage) && (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        padding={"2px"}
                        height={"34px"}
                        width={"34px"}
                        borderRadius={"50%"}
                        bgcolor={"#44b700"}
                      >
                        <Typography color={"white"} variant="body2">
                          {user?.unSeenMessage}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </NavLink>
                <Divider variant="fullWidth" orientation="horizontal" />
              </Fragment>
            ))
          ) : (
            <Typography variant="body1" color="initial">
              No conversation found
            </Typography>
          )}
        </Box>
      </Box>

      {showUserDetails && <UserDetailsModal />}

      {showSearchUserModal && <SearchUserModal />}
    </>
  );
};

export default Sidebar;
