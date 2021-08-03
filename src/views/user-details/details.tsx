import {
  Box,
  Container,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { capitalize } from "../../utils/helpers";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useUserPermissions from "../../hooks/useUserPermissions";

function Details() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const { id } = useParams() as any;
  const { users, handleChangePermission } = useUsers();

  const user = useMemo(() => {
    return users.find((user) => user.id === Number(id)) || users[0];
  }, [users, id]);

  const { nameAndSurnamePermissions, emailPermissions, rolePermissions } =
    useUserPermissions(user);

  const handleExpandedChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            marginTop: "60px !important",
            "& > :not(style)": { m: 1, width: "340px" },
          }}
        >
          <Typography variant="h3">Details</Typography>
          <TextField label="Name" variant="outlined" value={user.name} />
          <TextField label="Surname" variant="outlined" value={user.surname} />
          <TextField label="Email" variant="outlined" value={user.email} />
          <TextField
            label="Role"
            variant="outlined"
            value={capitalize(user.role)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            maxWidth: 500,
            marginTop: "60px !important",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3">Permissions</Typography>
            <Typography variant="subtitle1">{capitalize(user.role)}</Typography>
          </Box>
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleExpandedChange("panel1")}
              sx={{ background: "transparent" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{`Name & Surname`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {nameAndSurnamePermissions.map((permission) => {
                  return (
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{permission.label}</Typography>
                      <Switch
                        disabled={user.disabled}
                        checked={permission.enable}
                        onChange={(e) =>
                          handleChangePermission(
                            user,
                            permission,
                            e.target.checked
                          )
                        }
                      />
                    </Box>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleExpandedChange("panel2")}
              sx={{ background: "transparent" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{`Email`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {emailPermissions.map((permission) => {
                  return (
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{permission.label}</Typography>
                      <Switch
                        disabled={user.disabled}
                        checked={permission.enable}
                        onChange={(e) =>
                          handleChangePermission(
                            user,
                            permission,
                            e.target.checked
                          )
                        }
                      />
                    </Box>
                  );
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleExpandedChange("panel3")}
              sx={{ background: "transparent" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>{`Role`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {rolePermissions.map((permission) => {
                  return (
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{permission.label}</Typography>
                      <Switch
                        disabled={user.disabled}
                        checked={permission.enable}
                        onChange={(e) =>
                          handleChangePermission(
                            user,
                            permission,
                            e.target.checked
                          )
                        }
                      />
                    </Box>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default React.memo(Details);
