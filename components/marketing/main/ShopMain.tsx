'use client';

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  nextPage,
  selectFilteredShopData,
  setItemsPerPage,
  setSelectedCategories,
  setSorting,
  setView,
  fetchDashboardProducts,
} from "@/store/features/shopSlice";
import ShopTopActions from "../shop/ShopTopActions";
import ShopGridInnerProduct from "../shop/ShopGridInnerProduct";
import ShopPagination from "../shop/ShopPagination";
import NotFoundText from "../shop/NotFoundText";
import { useLocale } from "next-intl";

const ShopMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const shop = useAppSelector((state) => state.shop);
  const locale = useLocale();
  const isRtl = locale === 'ar';

  useEffect(() => {
    dispatch(fetchDashboardProducts());
  }, [dispatch]);

  const itemsPerPage = useAppSelector((state) => state.shop.itemsPerPage);
  const isGridView = useAppSelector((state) => state.shop.isGridView);
  const sorting = useAppSelector((state) => state.shop.sorting);
  const currentPage = useAppSelector((state) => state.shop.currentPage);
  const selectedCategories = useAppSelector((state) => state.shop.selectedCategories ?? []);

  const filtered = useAppSelector(selectFilteredShopData);
  const currentItems = filtered.currentItems;
  const totalItems = filtered.totalItems;
  const totalPages = filtered.totalPages;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Unique categories from all products (not filtered)
  const uniqueCategories = Array.from(
    new Set(shop.shopData.map((item) => isRtl && item.category_ar ? item.category_ar : item.category).filter(Boolean))
  );

  const handleCategoryToggle = (cat: string) => {
    // We need to match by English name since the store uses English category
    const shopItem = shop.shopData.find((item) =>
      (isRtl && item.category_ar ? item.category_ar : item.category) === cat
    );
    const englishCat = shopItem?.category ?? cat;

    const updated = selectedCategories.includes(englishCat)
      ? selectedCategories.filter((c) => c !== englishCat)
      : [...selectedCategories, englishCat];
    dispatch(setSelectedCategories(updated));
  };

  const isCategorySelected = (cat: string) => {
    const shopItem = shop.shopData.find((item) =>
      (isRtl && item.category_ar ? item.category_ar : item.category) === cat
    );
    const englishCat = shopItem?.category ?? cat;
    return selectedCategories.includes(englishCat);
  };

  const handleViewChange = () => dispatch(setView());
  const handleItemsPerPageChange = (value: number) => dispatch(setItemsPerPage(value));
  const handleSortingChange = (value: string) => dispatch(setSorting(value));
  const handleNextPage = (pageNumber: number) => {
    dispatch(nextPage(pageNumber));
    setTimeout(() => window.scrollTo(0, 200), 500);
  };

  return (
    <div className="rv-shop-area rv-section-spacing" style={{ paddingTop: 10 }}>
      <div className="container">
        {/* Category filter pills */}
        {uniqueCategories.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryToggle(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1.5px solid',
                  borderColor: isCategorySelected(cat) ? '#2d6a4f' : '#d1d5db',
                  background: isCategorySelected(cat) ? '#2d6a4f' : '#fff',
                  color: isCategorySelected(cat) ? '#fff' : '#374151',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => dispatch(setSelectedCategories([]))}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1.5px solid #e5e7eb',
                  background: 'transparent',
                  color: '#9ca3af',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            )}
          </div>
        )}

        <ShopTopActions
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          handleItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPage={itemsPerPage}
          isGridView={isGridView}
          handleViewChange={handleViewChange}
          handleSortingChange={handleSortingChange}
          sorting={sorting}
        />
        <div className="row gy-5 justify-content-center">
          <div className="col-12">
            {currentItems.length !== 0 ? (
              <ShopGridInnerProduct currentItems={currentItems} isGridView={isGridView} />
            ) : (
              <NotFoundText />
            )}
          </div>
          {currentItems.length !== 0 && (
            <ShopPagination
              totalPages={totalPages}
              currentPage={currentPage}
              handleNextPage={handleNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopMain;
