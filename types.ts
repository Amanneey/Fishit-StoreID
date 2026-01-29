
export type Category = 'PROMO' | 'Secret Fish' | 'Gamepass' | 'Skin Crates' | 'Enchant Items' | 'Bundle Pack';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  price5x?: number;
  oldPrice5x?: number;
  category: Category;
  image: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  color: string;
  promoEndDate?: string;
}

export interface CartItem extends Product {
  quantity: number;
  is5xPack?: boolean;
}
