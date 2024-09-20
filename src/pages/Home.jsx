import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetUserDetailsQuery } from "../redux/baseApi/baseApi";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers, setUser } from "../redux/slices/userSlice";
import io from "socket.io-client";
import { setSocketConnection } from "../redux/slices/socketSlice";

const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { isLoading, isSuccess, data, isError, error } = useGetUserDetailsQuery(
    "",
    {
      refetchOnMountOrArgChange: true, // Ensure refetch on mount
    }
  );
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data?.data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("ERROR:", error);
    }
  }, [isError, error]);

  // SOCKET CONNECTION
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BASE_URL, {
      auth: {
        token: token,
      },
    });

    socketConnection.on("onlineUser", (data) => {
      console.log("ONLINE USERS:", data);
      dispatch(setOnlineUsers(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // const getDetails = async()=>{
  //   const res = await fetch('http://localhost:5000/api/v1/user-details', {
  //     method:'GET',
  //     credentials: 'include'
  //   })
  //   const data = await res.json();
  //   console.log('data details:', data);

  //   if(data?.success){
  //     dispatch(setUser(data?.data))
  //   }
  // }

  // useEffect(()=>{
  //   getDetails();
  // },[])

  return (
    <>
      <Box display={"flex"} >
        <Sidebar />
        <Outlet />
      </Box>
    </>
  );
};

export default Home;
