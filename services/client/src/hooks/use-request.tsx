import axios, { AxiosResponse } from "axios";

type Props = {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
};
type KeyValue = {
  [key: string]: any;
};

const useRequest = ({ url, method }: Props) => {
  const request = async (body: KeyValue = {}) => {
    let data: KeyValue | undefined,
      errors: KeyValue | undefined,
      status: number | undefined,
      error: any | undefined,
      message: string | undefined;
    try {
      const res: AxiosResponse = await axios[method](url, body);
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

export default useRequest;
