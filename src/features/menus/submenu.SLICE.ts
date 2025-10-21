import { createSlice } from "@reduxjs/toolkit";


const submenuSlice = createSlice({
  name: "submenu",
  initialState: {
    submenus: [] as any[],
  },
  reducers: {
    setSubmenus(state, action) {
      state.submenus = action.payload;
    }
    },
});

export const { setSubmenus } = submenuSlice.actions;