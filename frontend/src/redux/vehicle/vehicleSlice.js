import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [],
  currentVehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    // Action to set the current vehicle for editing
    setCurrentVehicle(state, action) {
      state.currentVehicle = action.payload;
    },
    // Action to update the vehicle
    updateVehicle(state, action) {
      const { id, data } = action.payload;
      const index = state.vehicles.findIndex((vehicle) => vehicle.id === id);
      if (index !== -1) {
        state.vehicles[index] = { ...state.vehicles[index], ...data };
      }
    },
  },
});

export const { setCurrentVehicle, updateVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;
