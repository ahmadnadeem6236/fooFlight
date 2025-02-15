import axios from "axios";
import { create } from "zustand";

const useFlightStore = create((set) => ({
  origin: null,
  destination: null,
  departureDate: "",
  tripType: "round-trip",
  returnDate: "",
  travellers: {
    adults: 1,
    children: 0,
    infantsSeat: 0,
    infantsLap: 0,
  },
  classType: "economy",
  airports: [],
  loading: false,

  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDepartureDate: (date) => set({ departureDate: date }),
  setTripType: (tripType) => set({ tripType }),
  setReturnDate: (date) => set({ returnDate: date }),
  setClassType: (classType) => set({ classType }),
  setTravellers: (newTravellers) =>
    set((state) => ({
      travellers: { ...state.travellers, ...newTravellers },
    })),

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
        console.log(data);
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

  fetchFlights: async (params) => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights`,
        {
          params,
          headers: {
            "x-rapidapi-host": `sky-scrapper.p.rapidapi.com`,
            "x-rapidapi-key": `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = res.data;
      if (data) {
        console.log("Fkig", data);
        set({
          flights: [data],
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching flights", error);
      set({ loading: false });
    }
  },
}));

export default useFlightStore;
