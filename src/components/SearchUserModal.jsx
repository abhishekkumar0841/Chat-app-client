import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {  InputAdornment, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setShowUserSearchModal } from "../redux/slices/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearchUserQuery } from "../redux/baseApi/baseApi";
import SearchUserCard from "./SearchUserCard";

const style = {
  position: "absolute",
  top: "33%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function SearchUserModal() {
  const dispatch = useDispatch();
  const showSearchUserModal = useSelector(
    (state) => state.user.showSearchUserModal
  );
  const handleOpen = () => dispatch(setShowUserSearchModal(true));
  const handleClose = () => dispatch(setShowUserSearchModal(false));
  const [searchText, setSearchText] = useState("");

  const { isLoading, isSuccess, data, isError, error } = useSearchUserQuery({
    search: searchText,
    limit: 4,
    page: 1
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("DATA:", data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log("ERROR:", error);
    }
  }, [isError, error]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showSearchUserModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showSearchUserModal}>
          <Box sx={style} display={'flex'} flexDirection={'column'} gap={'14px'}>
            <TextField
              fullWidth
              label="Search User"
              variant="outlined"
              name="name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="large" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searchText && (
                      <ClearIcon
                        onClick={() => setSearchText("")}
                        sx={{ cursor: "pointer" }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            {isLoading ? (
              "Loading..."
            ) : isSuccess && data?.data?.length > 0 ? (
              data?.data?.map((user) => (
                <SearchUserCard key={user?._id} user={user} />
              ))
            ) : (
              <Typography variant="body1" color="initial">
                User not found
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
