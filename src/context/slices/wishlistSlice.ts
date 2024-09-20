import { ICar } from "@/interfaces/car";
import { createSlice } from "@reduxjs/toolkit";

interface wishlistState {
  value: ICar[];
}

const initialState: wishlistState = {
  value: JSON.parse(localStorage.getItem("wishlist")!) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: { payload: ICar }) => {
      const index = state.value.findIndex(
        (item) => item._id === action.payload._id
      );
      index > -1
        ? state.value.splice(index, 1)
        : state.value.push(action.payload);

      localStorage.setItem("wishlist", JSON.stringify(state.value));
    },
    clearWishlist: (state) => {
      state.value = [];
      localStorage.setItem("wishlist", JSON.stringify(state.value));
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
