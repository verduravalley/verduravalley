'use client';

import { use, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDashboardProducts } from '@/store/features/shopSlice';
import { usePageView } from '@/hooks/usePageView';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ProductDetailMain from '@/components/marketing/main/ProductDetailMain';
import RelatedProducts from '@/components/marketing/product/RelatedProducts';
import ErrorSection from '@/components/marketing/error/ErrorSection';

interface PageProps {
  params: Promise<{ productSlug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const { productSlug } = use(params);
  const dispatch = useAppDispatch();
  const { shopData, status } = useAppSelector((state) => state.shop);
  usePageView('product', productSlug);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardProducts());
    }
  }, [dispatch, status]);

  const productInfo = shopData.find((item) => item.slug === productSlug);

  if (status === 'loading') {
    return (
      <>
        <BreadcrumbSection title="Product Details" />
        <div className="container py-5 text-center">
          <p>Loading product...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {productInfo ? (
        <>
          <BreadcrumbSection title={productInfo.name} />
          <ProductDetailMain item={productInfo} />
          <RelatedProducts />
        </>
      ) : (
        <ErrorSection />
      )}
    </>
  );
}
