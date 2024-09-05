import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, TextFieldVariants } from "@mui/material";
import { useField } from "formik";
import { HTMLInputTypeAttribute, useState } from "react";

type Props = {
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
};

const CpField = (props: Props) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const fieldConfig = {
    ...field,
    ...props,
    variant: "standard" as TextFieldVariants,
    fullWidth: true,
    required: true,
    error: false,
    helperText: "",
  };

  if (meta && meta.touched && meta.error) {
    fieldConfig.error = true;
    fieldConfig.helperText = meta.error;
  }

  return (
    <TextField
      {...fieldConfig}
      type={showPassword ? "text" : fieldConfig.type}
      InputProps={
        fieldConfig.type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={(e) => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};

export default CpField;
