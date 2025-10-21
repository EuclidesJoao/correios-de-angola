import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  selectedSlug: string | null;
}

const initialState: PageState = {
  selectedSlug: null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setSelectedSlug: (state, action: PayloadAction<string>) => {
      state.selectedSlug = action.payload;
    },
    clearSelectedSlug: (state) => {
      state.selectedSlug = null;
    },
  },
});

export const { setSelectedSlug, clearSelectedSlug } = pageSlice.actions;
export default pageSlice.reducer;
