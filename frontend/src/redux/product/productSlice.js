import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Action to set the current product for editing
    setCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
    // Action to update the product
    updateProduct(state, action) {
      const { id, data } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...data };
      }
    },
  },
});

export const { setCurrentProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;
