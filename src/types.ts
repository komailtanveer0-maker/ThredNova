export type Category = 
  | 'all'
  | 'deals'
  | 'special-pizzas'
  | 'traditional-pizzas'
  | 'crust-specials'
  | 'burgers'
  | 'fried-chicken'
  | 'appetizers'
  | 'pasta-fries'
  | 'beverages';

export interface PizzaSizeOption {
  size: 'Small' | 'Medium' | 'Large' | 'X-Large' | '36-Inch';
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  sizes?: PizzaSizeOption[];
  image: string;
  badge?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  flavours?: string[]; // for train pizza etc
}

export interface DealItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  items: string[];
  image: string;
  posterImage?: string;
  badge: string;
  serves: string;
  description: string;
}

export interface CartItem {
  id: string;
  menuItemId?: string;
  name: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
  notes?: string;
  selectedFlavours?: string[];
}

export type OrderType = 'delivery' | 'takeaway' | 'dine-in';
export type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Indoor Palm Garden' | 'Family Hall' | 'Circular Booth' | 'Executive Table';
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface VideoReel {
  id: string;
  title: string;
  tagline: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  aspectRatio: '9:16';
  features: string[];
  description: string;
}

export interface StaffUser {
  id: string;
  name: string;
  role: 'manager' | 'kitchen' | 'waitstaff';
  token: string;
}
