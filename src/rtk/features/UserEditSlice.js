import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isEditFormDisplayed: false,
  userToEdit: null,
  toReload: false,
  mode: 'create',
};

const UserEditSlice = createSlice({
  name: 'UserEdit',
  initialState,
  reducers: {
    setIsEditFormDisplayed: (state, data) => {
      state.isEditFormDisplayed = data.payload;
    },
    setToReload: state => {
      state.toReload = !state.toReload;
    },
    setUserToEdit: (state, data) => {
      state.userToEdit = data.payload;
    },
    setMode: (state, data) => {
      state.mode = data.payload;
    },
  },
});
const UserEditReducer = UserEditSlice.reducer;
export default UserEditReducer;
export const UserEditActions = UserEditSlice.actions;
