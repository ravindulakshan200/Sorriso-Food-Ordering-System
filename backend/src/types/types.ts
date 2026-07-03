export type ItemSize = 'Medium' | 'Large';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  price_medium?: number;
  price_large?: number;
  has_sizes?: boolean;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: ItemSize;
  /** Resolved price for the chosen size */
  sizePrice?: number;
  /** Unique key = id + size so M and L are separate cart lines */
  cartItemId: string;
}
