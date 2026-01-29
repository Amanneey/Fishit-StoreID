
import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // === SECTION: PROMO ===
  {
    id: 'p1',
    name: 'FLASH SALE: All Mythics Bundle',
    description: 'Dapatkan semua Ikan Mythic dengan harga jauh lebih murah!',
    price: 75000,
    category: 'PROMO',
    image: 'https://i.ibb.co.com/Q7dj146Z/Screenshot-2026-01-28-17-11-27-680-com-canva-editor.png',
    rarity: 'Mythic',
    color: 'from-amber-400 to-red-600',
    promoEndDate: '2026-01-31T23:59:59'
  },
  {
    id: 'p2',
    name: 'Double XP + Luck Package',
    description: 'Paket Booster paling dicari untuk Leveling cepat!',
    price: 55000,
    category: 'PROMO',
    image: 'https://i.ibb.co.com/7t9T2PHJ/IMG-20260124-200343.jpg',
    rarity: 'Epic',
    color: 'from-yellow-400 to-amber-600',
    promoEndDate: '2026-01-31T23:59:59'
  },

  // === SECTION: Secret Fish ===
  {
    id: 'f1',
    name: 'Kraken',
    description: 'Ikan Secret Kraken!',
    price: 10000,
    category: 'Secret Fish',
    image: 'https://i.ibb.co.com/HLw8Wv76/Screenshot-2026-01-28-17-10-25-650-com-canva-editor.png',
    rarity: 'Mythic',
    color: 'from-purple-600 to-indigo-800'
  },
  {
    id: 'f2',
    name: 'El Maja',
    description: 'Ikan Secret El Maja!',
    price: 15000,
    category: 'Secret Fish',
    image: 'https://i.ibb.co.com/MDJZFW8p/Screenshot-2026-01-28-17-10-36-682-com-canva-editor.png',
    rarity: 'Epic',
    color: 'from-pink-500 to-rose-700'
  },
  {
    id: 'f3',
    name: 'Megalodon',
    description: 'Ikan Secret Megalodon!',
    price: 20000,
    category: 'Secret Fish',
    image: 'https://i.ibb.co.com/cS1NvShd/Screenshot-2026-01-28-17-10-46-266-com-canva-editor.png',
    rarity: 'Legendary',
    color: 'from-slate-800 to-black'
  },
  {
    id: 'f4',
    name: 'Leviathan',
    description: 'Ikan Secret Leviathan',
    price: 35000,
    category: 'Secret Fish',
    image: 'https://i.ibb.co.com/Q7dj146Z/Screenshot-2026-01-28-17-11-27-680-com-canva-editor.png',
    rarity: 'Legendary',
    color: 'from-blue-600 to-cyan-800'
  },
  {
    id: 'f5',
    name: 'Monster Lochness',
    description: 'Ikan Secret Monster Lochness!',
    price: 25000,
    category: 'Secret Fish',
    image: 'https://i.ibb.co.com/G3bxQwSd/Screenshot-2026-01-28-17-09-43-893-com-canva-editor.png',
    rarity: 'Epic',
    color: 'from-emerald-600 to-teal-800'
  },

  // === SECTION: Gamepass ===
  {
    id: 'g1',
    name: 'Extra Luck!',
    description: 'Menambahkan 80% Luck Selamanya!',
    price: 35000,
    category: 'Gamepass',
    image: 'https://i.ibb.co.com/mLnqwNr/IMG-20260124-184930.jpg', 
    color: 'from-emerald-500 to-green-700'
  },
  {
    id: 'g2',
    name: 'Advanced Luck!',
    description: 'Menambahkan 150% Luck Selamanya!',
    price: 50000,
    category: 'Gamepass',
    image: 'https://i.ibb.co.com/j94LRWFG/IMG-20260124-184828.jpg',
    color: 'from-blue-500 to-indigo-700'
  },
  {
    id: 'g3',
    name: '+ Mutations!',
    description: 'Menambah Kesempatan Mendapatkan ikan Bermutasi!',
    price: 40000,
    category: 'Gamepass',
    image: 'https://i.ibb.co.com/cSpJdqGq/IMG-20260124-184950.jpg',
    color: 'from-purple-500 to-fuchsia-700'
  },
  {
    id: 'g4',
    name: 'Sell Anywhere!',
    description: 'Jual Ikan mu dimana Saja!',
    price: 35000,
    category: 'Gamepass',
    image: 'https://i.ibb.co.com/JRcVz6x9/IMG-20260124-200414.jpg',
    color: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'g6',
    name: 'VIP + LUCK!',
    description: 'Mendapat 50% Luck Selamanya + Gelar VIP!',
    price: 45000,
    category: 'Gamepass',
    image: 'https://i.ibb.co.com/M5Ccwc5p/IMG-20260124-184903.jpg',
    color: 'from-yellow-500 via-orange-400 to-amber-600'
  },
  {
    id: 'g5',
    name: 'Double XP!',
    description: 'Mendapatkan 2x XP setiap Menangkap Ikan!',
    price: 25000,
    category: 'Gamepass',
    image: 'https://i.ibb.co.com/7t9T2PHJ/IMG-20260124-200343.jpg',
    color: 'from-cyan-500 to-blue-700'
  },

  // === SECTION: Skin Crates ===
  {
    id: 'sc1',
    name: 'Pirate Crates',
    description: 'Buka Pirate Crates untuk Skin keren! Beli 5x jauh lebih hemat.',
    price: 12000,
    price5x: 55000,
    oldPrice5x: 60000,
    category: 'Skin Crates',
    image: 'https://i.ibb.co.com/2Y6BwKx9/IMG-20260128-183404.jpg',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 'sc2',
    name: 'Elderwood Crates',
    description: 'Buka Elderwood Crates! Beli 5x jauh lebih hemat.',
    price: 11000,
    price5x: 46000,
    oldPrice5x: 55000,
    category: 'Skin Crates',
    image: 'https://i.ibb.co.com/r2Xf2dRf/IMG-20260128-183429.jpg',
    color: 'from-green-800 to-emerald-950'
  },
  {
    id: 'sc3',
    name: 'Luxury Crates',
    description: 'Buka Luxury Crates untuk tampilan Mewah! Beli 5x jauh lebih hemat.',
    price: 11000,
    price5x: 46000,
    oldPrice5x: 55000,
    category: 'Skin Crates',
    image: 'https://i.ibb.co.com/4rhJwKy/IMG-20260128-183456.jpg',
    color: 'from-yellow-600 to-amber-900'
  },
  {
    id: 'sc4',
    name: 'Enchanted Crates',
    description: 'Buka Enchanted Crates! Beli 5x jauh lebih hemat.',
    price: 11000,
    price5x: 46000,
    oldPrice5x: 55000,
    category: 'Skin Crates',
    image: 'https://i.ibb.co.com/zWJVNCs9/IMG-20260128-183528.jpg',
    color: 'from-purple-800 to-indigo-950'
  },
  {
    id: 'sc5',
    name: 'Ocean Crates',
    description: 'Buka Ocean Crates! Beli 5x jauh lebih hemat.',
    price: 10000,
    price5x: 40000,
    oldPrice5x: 50000,
    category: 'Skin Crates',
    image: 'https://i.ibb.co.com/wZ7zTY0w/IMG-20260128-183556.jpg',
    color: 'from-blue-800 to-cyan-950'
  },

  // === SECTION: Enchant Items ===
  {
    id: 'e1',
    name: 'Evolved Enchant Stone',
    description: 'Untuk Double Enchant Rod Kamu!',
    price: 1500,
    category: 'Enchant Items',
    image: 'https://i.ibb.co.com/5Wdchds6/Screenshot-2026-01-28-17-13-08-300-com-canva-editor.png',
    color: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'e2',
    name: 'Secret Tumbal',
    description: 'Untuk Enchant Rod Kamu!',
    price: 2000,
    category: 'Enchant Items',
    image: 'https://i.ibb.co.com/vnfV5r7/Screenshot-2026-01-28-17-11-39-951-com-canva-editor.png',
    color: 'from-purple-500 to-indigo-700'
  },
  {
    id: 'e3',
    name: '40 Enchant Stone',
    description: 'Untuk Enchant Rod Kamu!',
    price: 5000,
    category: 'Enchant Items',
    image: 'https://i.ibb.co.com/8gDJSvS5/Screenshot-2026-01-28-17-14-03-005-com-canva-editor.png',
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'e4',
    name: '3M Koin',
    description: 'Koin untuk Membeli Kebutuhan mu In-Game!',
    price: 5000,
    category: 'Enchant Items',
    image: 'https://i.ibb.co.com/8Ds0Dq6r/Screenshot-2026-01-28-17-14-31-382-com-canva-editor.png',
    color: 'from-yellow-400 to-amber-600'
  },

  // === SECTION: Bundle Pack ===
  {
    id: 'b3',
    name: 'Ruby Gemstone',
    description: 'Item Yang digunakan untuk Quest Diamond Rod!',
    price: 40000,
    category: 'Bundle Pack',
    image: 'https://i.ibb.co.com/xqGYNZv5/Screenshot-2026-01-28-18-32-51-475-com-canva-editor.png',
    color: 'from-red-600 to-rose-900'
  },
  {
    id: 'b4',
    name: 'Bundle Diamond Rod',
    description: 'Bundle Harga Spesial Quest Diamond Rod!',
    price: 60000,
    category: 'Bundle Pack',
    image: 'https://i.ibb.co.com/d0vxghgN/Screenshot-2026-01-28-18-33-03-343-com-canva-editor.png',
    color: 'from-cyan-400 to-blue-700'
  }
];
