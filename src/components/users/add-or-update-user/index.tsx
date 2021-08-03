// @ts-nocheck

import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IUser, Role } from "../../../contexts/users/interfaces";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { options } from "./utils";
import { emailPattern } from "../../../utils/validation";
import useUsers from "../../../hooks/useUsers";

import FormInput from "../../form/form-input";
import Stack from "@material-ui/core/Stack";
import useUserPermissions from "../../../hooks/useUserPermissions";

interface IFormInput {
  name: string;
  surname: string;
  email: string;
  role: Role;
}

interface IProps {
  isOpen: boolean;
  user: IUser | null;
  onClose: () => void;
}

export default function AddOrUpdateUser(props: IProps) {
  const { isOpen, user, onClose } = props;

  const { handleAddOrUpdateUser } = useUsers();
  const permissions = useUserPermissions(user);

  const methods = useForm<IFormInput>({
    defaultValues: user || {
      role: "ADMIN",
    },
  });

  const { setValue, handleSubmit } = methods;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleAddOrUpdateUser({
      ...(user || {}),
      ...data,
    });
    onClose();
  };

  console.log(user);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="add-or-update-user"
        aria-describedby="add-or-update-user-desc"
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle
          id="add-or-update-user"
          sx={{ marginBottom: "10px !important" }}
        >
          {user ? "Edit User" : "Add New User"}
        </DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormInput
                  name="name"
                  label="Name"
                  validate={{ required: true }}
                  readOnly={
                    !permissions.nameAndSurnamePermissions.find(
                      (permission) => permission.label === "Name"
                    )?.enable
                  }
                />
                <FormInput
                  name="surname"
                  label="Surname"
                  validate={{ required: true }}
                  readOnly={
                    !permissions.nameAndSurnamePermissions.find(
                      (permission) => permission.label === "Surname"
                    )?.enable
                  }
                />
                <FormInput
                  type="email"
                  name="email"
                  label="Email"
                  validate={{ required: true, pattern: emailPattern }}
                  readOnly={
                    !permissions.emailPermissions.find(
                      (permission) => permission.label === "Email"
                    )?.enable
                  }
                />
                <TextField
                  select
                  fullWidth
                  label="Choose Role"
                  id="role"
                  defaultValue="ADMIN"
                  inputProps={{
                    "aria-readonly": true,
                  }}
                  onChange={(e: any) => {
                    setValue("role", e.target.value, true);
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </form>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
