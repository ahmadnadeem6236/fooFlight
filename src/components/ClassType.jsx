import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFlightStore from "../store";

export default function ClassType() {
  const { setClassType } = useFlightStore();
  const [cabinClass, setCabinClass] = React.useState("economy");

  const handleChange = (event) => {
    const newClass = event.target.value;
    setCabinClass(newClass);
    setClassType(newClass);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cabinClass}
          label="Cabin Class"
          onChange={handleChange}
        >
          <MenuItem value={"economy"}>Economy</MenuItem>
          <MenuItem value={"Premium economy"}>Premium</MenuItem>
          <MenuItem value={"business"}>Business</MenuItem>
          <MenuItem value={"First"}>First</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
