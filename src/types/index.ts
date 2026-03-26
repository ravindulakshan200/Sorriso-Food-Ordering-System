export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
