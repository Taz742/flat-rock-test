import { Box, Container, TextField } from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { capitalize } from "../../utils/helpers";

function Details() {
  const { id } = useParams() as any;
  const { users } = useUsers();

  const user = useMemo(() => {
    return users.find((user) => user.id === Number(id)) || users[0];
  }, [users, id]);

  return (
    <Container>
      <Box
        display="flex"
        sx={{
          marginTop: '60px !important',
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField label="Name" variant="outlined" value={user.name} />
        <TextField label="Surname" variant="outlined" value={user.surname} />
        <TextField label="Email" variant="outlined" value={user.email} />
        <TextField
          label="Role"
          variant="outlined"
          value={capitalize(user.role)}
        />
      </Box>
    </Container>
  );
}

export default React.memo(Details);