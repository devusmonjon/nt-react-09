import { ICar } from "@/interfaces/car";
import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  value: ICar[];
}

const initialState: cartState = {
  value: JSON.parse(localStorage.getItem("cart")!) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: ICar }) => {
      state.value.push(action.payload);

      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    removeFromCart: (state, action: { payload: ICar }) => {
      const index = state.value.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index > -1) {
        state.value.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    incrementCartITem: (state, action: { payload: ICar }) => {
      const index = state.value.findIndex(
        (item) => item._id === action.payload._id
      );
      // @ts-ignore
      state.value[index].quantity += 1;

      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    decrementCartITem: (state, action: { payload: ICar }) => {
      const index = state.value.findIndex(
        (item) => item._id === action.payload._id
      );
      // @ts-ignore
      state.value[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
    clearCart: (state) => {
      state.value = [];
      localStorage.setItem("cart", JSON.stringify(state.value));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementCartITem,
  decrementCartITem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
