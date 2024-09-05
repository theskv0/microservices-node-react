"use client";
import API_URL from "@/config/constant";
import useRequest from "@/hooks/use-request";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Logout as LogoutIcon } from "@mui/icons-material";

export default function Logout() {
  const request = useRequest({ url: API_URL.AUTH.LOGOUT, method: "post" });
  const router = useRouter();

  const logout = async () => {
    await request({});
    router.push("/login");
  };

  return (
    <IconButton onClick={logout} color="inherit">
      <LogoutIcon />
    </IconButton>
  );
}
