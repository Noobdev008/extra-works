import { useState } from "react";
import Box from "@mui/material/Box";

const defaultState = {};

const SettingsView = ({
  title = ""
}) => {
  const [state, setState] = useState(defaultState);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {title}
    </Box>
  )
};

export default SettingsView;
