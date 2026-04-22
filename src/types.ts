export interface ArtWork {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends ArtWork {
  quantity: number;
}

export type ViewType = 'shop' | 'commissions' | 'cart';
