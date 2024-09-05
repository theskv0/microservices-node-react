import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

type Props = {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
};
type KeyValue = {
  [key: string]: any;
};

const axiosUtil = ({ url, method }: Props) => {
  const cookie = cookies();
  const request = async (body: KeyValue = {}) => {
    let data: KeyValue | undefined,
      errors: KeyValue | undefined,
      status: number | undefined,
      error: any | undefined,
      message: string | undefined;
    try {
      let res: AxiosResponse;
      if (["get"].includes(method)) res = await axios[method](url, { headers: { Cookie: cookie.toString() } });
      else res = await axios[method](url, body, { headers: { Cookie: cookie.toString() } });
      data = res.data;
      status = res.status;
    } catch (err: any) {
      if (err.response) {
        status = err.response.status;
        error = err.response.data;
        message = error.message;
        if (status === 422) errors = error.errors;
      } else {
        message = err.message;
        status = 503;
      }
      console.error(message);
    }
    return { data, errors, status, error, message };
  };

  return request;
};

export default axiosUtil;
