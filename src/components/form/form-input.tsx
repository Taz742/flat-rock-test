import React, { FC, memo } from "react";
import { useFormContext, Controller, useFormState } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

export interface IProps {
  name: string;
  validate?: any;
  disabled?: boolean;
  label?: string;
}

const FormInput: FC<IProps> = ({
  name,
  disabled,
  validate,
  label,
  ...props
}) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const error = errors && errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field }) => (
        <TextField fullWidth {...field} label={label} error={error ? true : false} />
      )}
    />
  );
};

export default memo(FormInput);
