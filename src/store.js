import axios from "axios";
import { create } from "zustand";

const useFlightStore = create((set) => ({
  origin: null,
  destination: null,
  departureDate: "",
  returnDate: "",
  passengers: 1,
  airports: [],
  loading: false,

  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDepartureDate: (date) => set({ departureDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),
  setPassengers: (num) => set({ passengers: num }),

  fetchAirports: async (query) => {
    if (!query) return;
    set({ loading: true });
    try {
      const res = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          headers: {
            "x-rapidapi-host": `sky-scrapper.p.rapidapi.com`,
            "x-rapidapi-key": `639c330bd1mshd2e33b940dcde60p1164c5jsnf4122dc02147`,
          },
        }
      );
      const data = res.data;
      if (data) {
        set({
          airports: [data],
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching airports", error);
      set({ loading: false });
    }
  },
}));

export default useFlightStore;
