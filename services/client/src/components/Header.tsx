import API_URL from "@/config/constant";
import axiosUtil from "@/utils/axios.util";
import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import Logout from "./Logout";

export default async function Header() {
  let userName: string | undefined;

  const request = axiosUtil({ url: API_URL.AUTH.BASE + API_URL.AUTH.CURRENT_USER, method: "get" });

  const { data, status, message } = await request();

  if (status === 200) userName = data?.user?.name;
  else console.error(message);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          App
        </Typography>
        {userName ? (
          <>
            <Link href={"/ticket"} color="inherit" underline="none" m={1}>
              Ticket
            </Link>
            <Logout />
          </>
        ) : (
          <>
            <Link href={"/login"} color="inherit" underline="none" m={1}>
              Login
            </Link>
            <Link href={"/signup"} color="inherit" underline="none" m={1}>
              Signup
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
