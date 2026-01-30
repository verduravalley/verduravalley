export interface ShopItem {
  id: number;
  img: string;
  images?: string[];
  name: string;
  prevPrice: number;
  price: number;
  quantity: number;
  discount?: boolean;
  slug: string;
  popularity: number;
  rating: number;
  category: string;
  color: string;
  product_info?: string;
  description?: string;
}
