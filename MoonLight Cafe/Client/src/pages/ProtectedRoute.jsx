import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/userContext";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useUserContext();

  //get user
  const getUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/get-user",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      // localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}


function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}