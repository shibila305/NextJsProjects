"use client";
 
import React from "react";
import { useRouter } from "next/navigation";
 
function Logout() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <button onClick={logout} className="logOut">
      Logout
    </button>
  );
}
export default Logout;