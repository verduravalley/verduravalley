import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { createSelector } from "reselect";
import { ShopItem } from "../../types";
import axios from "axios";

// Thunk to fetch products from Dashboard API
export const fetchDashboardProducts = createAsyncThunk(
  "shop/fetchDashboardProducts",
  async () => {
    const response = await axios.get("/api/products");
    // Map dashboard product structure to website ShopItem structure
    // Filter out inactive products
    return response.data
      .filter((item: any) => item.is_active !== false)
      .map((item: any, index: number) => ({
        id: index + 1,
        slug: item.slug,
        category: item.category || "Organic",
        img: item.images?.[0] || "/assets/img/product/1.png",
        images: item.images || [],
        name: item.name,
        price: Number(item.price) || 0,
        prevPrice: item.prev_price ? Number(item.prev_price) : Number(item.price) || 0,
        discount: item.prev_price && Number(item.prev_price) > Number(item.price),
        rating: 5,
        popularity: 0,
        quantity: 1,
        color: "green",
        product_info: item.product_info || "",
        description: item.description || "",
        name_ar: item.name_ar || "",
        description_ar: item.description_ar || "",
        product_info_ar: item.product_info_ar || "",
        category_ar: item.category_ar || "",
      }));
  }
);

interface ShopState {
  isGridView: boolean;
  itemsPerPage: number;
  sorting: string;
  currentPage: number;
  shopData: ShopItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedCategories: string[];
}

const initialState: ShopState = {
  isGridView: true,
  itemsPerPage: 12,
  sorting: "menu_order",
  currentPage: 1,
  shopData: [],
  status: 'idle',
  selectedCategories: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setView: (state) => {
      state.isGridView = !state.isGridView;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
      state.currentPage = 1;
    },
    nextPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setShopData: (state, action: PayloadAction<ShopItem[]>) => {
      state.shopData = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shopData = action.payload;
      })
      .addCase(fetchDashboardProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setView, setItemsPerPage, setSorting, nextPage, setShopData, setSelectedCategories } =
  shopSlice.actions;

// New selector to get the filtered shop data based on the current state
export const selectShopState = (state: RootState) => state.shop;

export const selectFilteredShopData = createSelector(
  [selectShopState],
  (shop) => {
    const { sorting, itemsPerPage, currentPage, shopData, selectedCategories = [] } = shop;

    const filtered = selectedCategories.length === 0
      ? shopData
      : shopData.filter((item) => selectedCategories.includes(item.category));

    const sortedShopData = [...filtered].sort((a, b) => {
      switch (sorting) {
        case "popularity":
          // Placeholder logic for popularity
          return b.popularity - a.popularity;
        case "rating":
          // Placeholder logic for rating
          return b.rating - a.rating;
        case "price":
          // Placeholder logic for price: low to high
          return a.price - b.price;
        case "price-desc":
          // Placeholder logic for price: high to low
          return b.price - a.price;
        default:
          // Default sorting (menu_order or any other sorting option)
          // Add your logic here if needed
          break;
      }
      // Return 0 for no change in order if none of the cases match
      return 0;
    });

    const totalItems = sortedShopData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return { currentItems: sortedShopData.slice(startIndex, endIndex), totalItems, totalPages };
  }
);

export default shopSlice.reducer;
