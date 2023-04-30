import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "All",
    gender: "All",
    sort: "latest",
  },
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_CATEGORY_AND_GENDER(state, action) {
      const { products, category, gender } = action.payload;
      let tempProducts = [];
      if (category === "All" && gender === "All") {
        tempProducts = products;
      } else if (category === "All") {
        tempProducts = products.filter((product) => product.gender === gender);
      } else if (gender === "All") {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      } else {
        tempProducts = products.filter(
          (product) =>
            product.category === category && product.gender === gender
        );
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_CATEGORY_GENDER_AND_SEARCH(state, action) {
      const { products, category, gender, search } = action.payload;
      let tempProducts = [];
      if (category === "All" && gender === "All") {
        tempProducts = products;
      } else if (category === "All") {
        tempProducts = products.filter((product) => product.gender === gender);
      } else if (gender === "All") {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      } else {
        tempProducts = products.filter(
          (product) =>
            product.category === category && product.gender === gender
        );
      }
      if (search && category === "All" && gender === "All") {
        tempProducts = tempProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        );
      }

      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS_BY_CATEGORY_AND_GENDER(state, action) {
      const { products, sort, category, gender } = action.payload;
      let tempProducts = [];
      if (category === "All" && gender === "All") {
        tempProducts = products;
      } else if (category === "All") {
        tempProducts = products.filter((product) => product.gender === gender);
      } else if (gender === "All") {
        tempProducts = products.filter(
          (product) => product.category === category
        );
      } else {
        tempProducts = products.filter(
          (product) =>
            product.category === category && product.gender === gender
        );
      }

      if (sort === "latest") {
        tempProducts = tempProducts;
      }

      if (sort === "lowest-price") {
        tempProducts = tempProducts.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = tempProducts.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = tempProducts.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = tempProducts.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },
    CLEAR_PRODUCT_FILTERS(state, action) {
      const { products } = action.payload;
      let tempProducts = products;
      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS_BY_CATEGORY_AND_GENDER,
  FILTER_BY_CATEGORY_AND_GENDER,
  CLEAR_PRODUCT_FILTERS,
  FILTER_BY_CATEGORY_GENDER_AND_SEARCH,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;