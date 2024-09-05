import API_URL from "@/config/constant";
import axiosUtil from "@/utils/axios.util";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const request = axiosUtil({ url: API_URL.AUTH.BASE + API_URL.AUTH.CURRENT_USER, method: "get" });

  const { status } = await request();

  if (status === 200) redirect("/");

  return <>{children}</>;
}
