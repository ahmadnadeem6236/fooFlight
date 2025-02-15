import { Menu, Button, IconButton } from "@mui/material";
import { Person, Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import useFlightStore from "../store";

const PassengerSelector = () => {
  const { setTravellers } = useFlightStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const travellers = passengers;
    setTravellers(travellers);
  };

  const handleChange = (type, delta) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg"
      >
        <Person sx={{ width: 30, height: 30 }} className="text-gray-600 " />
        <span className="text-gray-700">
          {passengers.adults +
            passengers.children +
            passengers.infantsSeat +
            passengers.infantsLap}
        </span>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="w-64 p-4 space-y-4">
          {[
            { label: "Adults", key: "adults" },
            { label: "Children (2-11)", key: "children" },
            { label: "Infants (In seat)", key: "infantsSeat" },
            { label: "Infants (On lap)", key: "infantsLap" },
          ].map((item) => (
            <div key={item.key} className="flex justify-between items-center">
              <span className="text-gray-700">{item.label}</span>
              <div className="flex items-center">
                <IconButton
                  size="small"
                  onClick={() => handleChange(item.key, -1)}
                >
                  <Remove />
                </IconButton>
                <span className="px-3">{passengers[item.key]}</span>
                <IconButton
                  size="small"
                  onClick={() => handleChange(item.key, 1)}
                >
                  <Add />
                </IconButton>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-2">
            <Button onClick={handleClose} className="text-blue-500">
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              className="text-blue-500 font-semibold"
            >
              Done
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default PassengerSelector;
