import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFlightStore from "../store";

export default function TripType() {
  const { setTripType } = useFlightStore();
  const [trip, setTrip] = React.useState("round-trip");

  const handleChange = (event) => {
    const newTrip = event.target.value;
    setTrip(newTrip);
    setTripType(newTrip);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Trip</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={trip}
          label="Trip"
          onChange={handleChange}
        >
          <MenuItem value={"round-trip"}>Round trip</MenuItem>
          <MenuItem value={"one-way"}>One way</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
