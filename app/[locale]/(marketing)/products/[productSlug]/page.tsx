import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/app/[locale]/layout';
import { query } from '@/lib/db';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ProductDetailMain from '@/components/marketing/main/ProductDetailMain';
import RelatedProducts from '@/components/marketing/product/RelatedProducts';

interface PageProps {
  params: Promise<{ locale: string; productSlug: string }>;
}

// Route params arrive percent-encoded, so an Arabic slug only matches the
// stored value once it is decoded. Malformed escapes fall back to the raw value.
function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function getProduct(slug: string) {
  try {
    const result = await query('SELECT * FROM products WHERE slug = $1 AND is_active = true LIMIT 1', [decodeSlug(slug)]);
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, productSlug } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const product = await getProduct(productSlug);
  const name = (locale === 'ar' && product?.name_ar) ? product.name_ar : (product?.name ?? productSlug);
  return {
    title: `${name} | ${t('title')}`,
    description: product?.description ?? t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}/products/${productSlug}` },
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { locale, productSlug } = await params;
  setRequestLocale(locale);

  const row = await getProduct(productSlug);
  if (!row) notFound();

  const isRtl = locale === 'ar';

  // Map DB row to ShopItem shape
  const productInfo = {
    id: row.id,
    slug: row.slug,
    name: row.name,
    name_ar: row.name_ar ?? '',
    category: row.category ?? '',
    category_ar: row.category_ar ?? '',
    description: row.description ?? '',
    description_ar: row.description_ar ?? '',
    product_info: row.product_info ?? '',
    product_info_ar: row.product_info_ar ?? '',
    price: row.price ?? 0,
    prevPrice: row.prev_price ?? 0,
    img: Array.isArray(row.images) && row.images.length > 0 ? row.images[0] : '/assets/img/shop/1.jpg',
    images: Array.isArray(row.images) ? row.images : [],
    quantity: 1,
    popularity: 0,
    rating: 5,
    color: '',
  };

  return (
    <>
      <BreadcrumbSection title={isRtl && productInfo.name_ar ? productInfo.name_ar : productInfo.name} />
      <ProductDetailMain item={productInfo} />
      <RelatedProducts currentSlug={productSlug} />
    </>
  );
}
