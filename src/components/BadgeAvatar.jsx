import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function BadgeAvatar({ profilePic, name, id }) {
  const { onlineUsers } = useSelector((state) => state.user);
  const isOnline = onlineUsers?.includes(id);
  return (
    <Stack direction="row" spacing={2}>
      {isOnline ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={name}
            src={
              profilePic
                ? profilePic
                : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
            }
          />
        </StyledBadge>
      ) : (
        <Avatar
          alt={name}
          src={
            profilePic
              ? profilePic
              : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
          }
        />
      )}
    </Stack>
  );
}
