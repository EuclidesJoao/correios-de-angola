import { createSlice } from "@reduxjs/toolkit";

const menusSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [] as any[],
  },
  reducers: {
    setMenus(state, action) {
      state.menus = action.payload;
    }
    },
});

export const { setMenus } = menusSlice.actions;