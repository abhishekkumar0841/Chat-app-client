import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ShowImageVideoModal({
  isOpen,
  onClose,
  imageUrl,
  videoUrl,
}) {
  return (
    <Box>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}> */}
      <Box sx={style}>
        {imageUrl && <img src={imageUrl} alt="Image" width={"100%"} />}

        {videoUrl && (
          <video src={videoUrl} width={"100%"} controls muted autoPlay />
        )}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: "0", right: "0" }}
        >
          <ClearIcon fontSize="large" />
        </IconButton>
      </Box>
      {/* </Fade>
      </Modal> */}
    </Box>
  );
}
