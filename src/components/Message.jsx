import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import BadgeAvatar from "./BadgeAvatar";
import { IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideocamIcon from "@mui/icons-material/Videocam";
import uploadFiles from "../helpers/uploadFiles";
import ShowImageVideoModal from "./ShowImageVideoModal";
import BackdropLoader from "./BackdropLoader";
import moment from "moment";

const Message = () => {
  const params = useParams();
  const loggedInUser = useSelector((state) => state.user?._id);
  const socketConnection = useSelector(
    (state) => state?.socket?.socketConnection
  );

  const [currUserData, setCurrUserData] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: "",
  });

  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage) {
      currentMessage.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessages]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params?.userId);
      socketConnection.emit('seen', params?.userId)
      socketConnection.on("message-user", (data) => {
        setCurrUserData(data);
      });
      socketConnection.on("message", (data) => {
        setAllMessages(data);
      });
    }
  }, [socketConnection, params, params?.userId]);

  const [fileSelector, setFileSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageData, setMessageData] = useState({
    imageUrl: "",
    videoUrl: "",
    text: "",
  });

  const handleFileSelect = () => {
    setFileSelector((prev) => !prev);
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    try {
      const uploadImage = await uploadFiles(file);
      setMessageData((prev) => {
        return {
          ...prev,
          imageUrl: uploadImage?.secure_url,
        };
      });
      setFileSelector(false);
    } catch (error) {
      console.log("ERROR:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    try {
      const uploadVideo = await uploadFiles(file);
      setMessageData((prev) => {
        return {
          ...prev,
          videoUrl: uploadVideo?.secure_url,
        };
      });
      setFileSelector(false);
    } catch (error) {
      console.log("ERROR:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearImage = () => {
    setMessageData((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };

  const handleClearVideo = () => {
    setMessageData((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  const handleTextChange = (e) => {
    setMessageData((prev) => {
      return {
        ...prev,
        text: e?.target?.value,
      };
    });
  };

  const handleSendMessage = () => {
    const { imageUrl, videoUrl, text } = messageData;
    if (imageUrl || videoUrl || text) {
      if (socketConnection) {
        socketConnection.emit("new-message", {
          sender: loggedInUser,
          receiver: params?.userId,
          text: text,
          imageUrl: imageUrl,
          videoUrl: videoUrl,
          messageBy: loggedInUser,
        });
        setMessageData({
          imageUrl: "",
          videoUrl: "",
          text: "",
        });
      }
    }
  };

  return (
    <>
      <Box height={"100vh"} flexGrow={1}>
        <Box
          height={"64px"}
          bgcolor={"#ebe9e6"}
          padding={"20px"}
          display={"flex"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Box>
            <BadgeAvatar
              name={currUserData?.name}
              profilePic={currUserData?.profile_pic}
              id={currUserData?._id}
            />
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={"bold"}>
              {currUserData?.name}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"bold"}
              color={currUserData?.online ? "#44b700" : "gray"}
            >
              {currUserData?.online ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>

        {/* chat container */}
        <Box
          height={`calc(100vh - 128px)`}
          padding={"20px"}
          sx={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
            {allMessages?.map((message) => {
              return (
                <Box
                  ref={currentMessage}
                  key={message?._id}
                  textAlign={
                    loggedInUser === message?.messageBy ? "right" : "left"
                  }
                  padding={"10px"}
                >
                  {message?.imageUrl && (
                    <img
                      src={message?.imageUrl}
                      width={"200px"}
                      height={"200px"}
                    />
                  )}

                  {message?.videoUrl && (
                    <video
                      src={message?.videoUrl}
                      width={"200px"}
                      height={"200px"}
                      controls
                    />
                  )}
                  <Typography variant="body1">{message?.text}</Typography>
                  <Typography variant="body2" pl={"24px"}>
                    {moment(message?.createdAt)?.format("hh:mm A")}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* SHOWING IMAGE CONTAINER, if user selects image */}
          {messageData?.imageUrl && (
            <ShowImageVideoModal
              isOpen={messageData?.imageUrl ? true : false}
              onClose={() => handleClearImage()}
              imageUrl={messageData?.imageUrl}
            />
          )}

          {/* SHOWING VIDEO CONTAINER, if user selects video */}
          {messageData?.videoUrl && (
            <ShowImageVideoModal
              isOpen={messageData?.videoUrl ? true : false}
              onClose={() => handleClearVideo()}
              videoUrl={messageData?.videoUrl}
            />
          )}

          {/* SHOWING LOADER TILL GET IMAGE OR VIDEO URL */}
          {loading && (
            <BackdropLoader
              isLoading={loading}
              onClose={() => setLoading(false)}
            />
          )}
        </Box>

        {/* send message/video/photos */}
        <Box
          height={"64px"}
          px={"20px"}
          bgcolor={"#ebe9e6"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"20px"}
          position={"relative"}
        >
          <IconButton onClick={handleFileSelect}>
            <AddCircleIcon fontSize="large" />
          </IconButton>

          <TextField
            size="small"
            fullWidth
            value={messageData?.text}
            onChange={handleTextChange}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={
              !messageData?.imageUrl &&
              !messageData?.videoUrl &&
              !messageData?.text
            }
          >
            <SendIcon fontSize="large" />
          </IconButton>

          {fileSelector && (
            <Box
              position={"absolute"}
              bottom={"60px"}
              bgcolor={"#2f6cf7"}
              borderRadius={"10px"}
              pl={"20px"}
              pr={"28px"}
              py={"4px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"6px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <input
                  type="file"
                  id="image"
                  name="imageUrl"
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image">
                  <IconButton component="span">
                    <AddAPhotoIcon sx={{ color: "white" }} fontSize="large" />
                  </IconButton>
                </label>
                <Typography variant="body1" color={"white"}>
                  Image
                </Typography>
              </Box>

              <Box display={"flex"} alignItems={"center"}>
                <input
                  type="file"
                  id="video"
                  name="videoUrl"
                  style={{ display: "none" }}
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                <label htmlFor="video">
                  <IconButton component="span">
                    <VideocamIcon sx={{ color: "white" }} fontSize="large" />
                  </IconButton>
                </label>
                <Typography variant="body1" color={"white"}>
                  Video
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Message;
