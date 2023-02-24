import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isEditFormDisplayed: false,
  eventToEdit: null,
  toReload: false,
  mode: 'create',
};

const EventEditSlice = createSlice({
  name: 'EventEdit',
  initialState,
  reducers: {
    setIsEditFormDisplayed: (state, data) => {
      state.isEditFormDisplayed = data.payload;
    },
    setToReload: state => {
      state.toReload = !state.toReload;
    },
    setEventToEdit: (state, data) => {
      state.eventToEdit = data.payload;
    },
    setMode: (state, data) => {
      state.mode = data.payload;
    },
  },
});
const EventEditReducer = EventEditSlice.reducer;
export default EventEditReducer;
export const EventEditActions = EventEditSlice.actions;
