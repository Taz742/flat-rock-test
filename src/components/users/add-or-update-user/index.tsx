// @ts-nocheck

import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IUser, Role } from "../../../contexts/users/interfaces/interfaces";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { options } from "./utils";
import { emailPattern } from "../../../utils/validation";
import useUsers from "../../../hooks/useUsers";

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

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: user || {
      role: "ADMIN",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleAddOrUpdateUser({
      ...(user || {}),
      ...data,
    });
    onClose();
  };

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
        <DialogTitle id="add-or-update-user" sx={{ marginBottom: '10px !important' }}>
          {user ? "Edit User" : "Add New User"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: 20 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    label="Name"
                    error={errors.name}
                  />
                )}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <Controller
                name="surname"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    label="Surname"
                    error={errors.name}
                  />
                )}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true, pattern: emailPattern }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    label="Email"
                    error={errors.email}
                  />
                )}
              />
            </div>
            <div>
              <TextField
                select
                fullWidth
                label="Choose Role"
                id="role"
                defaultValue="ADMIN"
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
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
