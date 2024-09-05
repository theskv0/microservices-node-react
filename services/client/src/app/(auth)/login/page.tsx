"use client";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";
import CpTextField from "@/components/CpTextField";
import { Form, Formik } from "formik";
import CpPasswordField from "@/components/CpPasswordField";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";
import API_URL from "@/config/constant";

const Login = () => {
  const request = useRequest({ url: API_URL.AUTH.LOGIN, method: "post" });
  const router = useRouter();

  type InitialFormValues = {
    email: string;
    password: string;
  };

  const initialFormValues: InitialFormValues = {
    email: "test@yopmail.com",
    password: "password",
  };

  const handleSubmit = async (values: InitialFormValues, { setFieldError }: any) => {
    const { data, errors } = await request(values);
    if (data) {
      console.log("data", data);
      router.push("/");
    } else {
      for (let key in errors) {
        setFieldError(key, errors[key]);
      }
    }
  };

  const paperStyle = { padding: 20, width: "350px", margin: "48px auto" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
          <Form>
            <Grid textAlign="center" my={5}>
              <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid my={4} mx={1}>
              <CpTextField name="email" label="Email" />
            </Grid>
            <Grid my={4} mx={1}>
              <CpPasswordField name="password" label="password" />
            </Grid>
            <Grid my={7} mx={1}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid textAlign={"center"} my={6} mx={1}>
              <Link href={"/signup"} underline="none">
                Signup
              </Link>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;
