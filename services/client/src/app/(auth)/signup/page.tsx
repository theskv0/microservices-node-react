"use client";
import CpEmailField from "@/components/CpEmailField";
import CpPasswordField from "@/components/CpPasswordField";
import CpTextField from "@/components/CpTextField";
import API_URL from "@/config/constant";
import useRequest from "@/hooks/use-request";
import { Button, CircularProgress, Grid, Link, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const request = useRequest({ url: API_URL.AUTH.SIGNUP, method: "post" });
  const router = useRouter();

  type InitialFormValues = {
    name: string;
    email: string;
    password: string;
  };

  const initialFormValues: InitialFormValues = {
    name: "Test",
    email: "test@yopmail.com",
    password: "password",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(64).required(),
  });

  const handleSubmit = async (values: InitialFormValues, { setFieldError }: any) => {
    setLoading(true);
    const { data, errors } = await request(values);
    setLoading(false);
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
        <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Grid textAlign="center" my={5}>
              <Typography variant="h5">Signup</Typography>
            </Grid>
            <Grid my={4} mx={1}>
              <CpTextField name="name" label="Name" />
            </Grid>
            <Grid my={4} mx={1}>
              <CpEmailField name="email" label="Email" />
            </Grid>
            <Grid my={4} mx={1}>
              <CpPasswordField name="password" label="Password" />
            </Grid>
            <Grid my={7} mx={1}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                {loading ? <CircularProgress color="inherit" size={28} /> : "Signup"}
              </Button>
            </Grid>
            <Grid textAlign={"center"} my={6} mx={1}>
              <Link href={"/login"} underline="none">
                Login
              </Link>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
