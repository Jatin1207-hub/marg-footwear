import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  label: string;
  isDefault: boolean;
}

export interface UserPreferences {
  preferredCategory: string | null;
  shoeSize: number | null;
  genderPreference: 'Men' | 'Women' | 'Kids' | null;
  notifications: {
    orderUpdates: boolean;
    newArrivals: boolean;
    promotional: boolean;
    smsAlerts: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string; // Stored locally for mock purposes only
  memberSince: string;
  preferences: UserPreferences;
  addresses: Address[];
  orders: Order[];
  wishlist: WishlistItem[];
  paymentMethods: PaymentMethod[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: Partial<User>) => void;
  signup: (user: Partial<User>) => void;
  logout: () => void;
  deleteAccount: () => void;
  
  updateProfile: (data: Partial<User>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updatePassword: (newPassword: string) => void;
  
  // Addresses
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Wishlist
  toggleWishlist: (item: WishlistItem) => void;
  
  // Payment Methods
  addPaymentMethod: (pm: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

const getDefaultUserObj = (user: Partial<User>): User => {
  return {
    id: user.id || "usr_" + Math.random().toString(36).substr(2, 9),
    name: user.name || "Guest",
    email: user.email || "",
    phone: user.phone || "",
    password: user.password || "",
    memberSince: user.memberSince || new Date().toISOString(),
    preferences: user.preferences || {
      preferredCategory: null,
      shoeSize: null,
      genderPreference: null,
      notifications: {
        orderUpdates: true,
        newArrivals: true,
        promotional: false,
        smsAlerts: false
      },
    },
    addresses: user.addresses || [],
    orders: user.orders || [
      {
        id: "ORD-98234",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        status: "Delivered",
        total: 245.00,
        items: [{ id: "i1", productId: "p1", name: "Marg Alpha Runner", price: 245, quantity: 1, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" }]
      },
      {
        id: "ORD-99102",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        status: "Processing",
        total: 180.00,
        items: [{ id: "i2", productId: "p2", name: "Marg Velocity Pro", price: 180, quantity: 1, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=300" }]
      }
    ], // seed with mock orders
    wishlist: user.wishlist || [],
    paymentMethods: user.paymentMethods || [
      { id: "pm1", type: "card", label: "•••• 4532", isDefault: true }
    ], // seed with mock payment
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => set({ user: getDefaultUserObj(userData), isAuthenticated: true }),
      signup: (userData) => set({ user: getDefaultUserObj(userData), isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      deleteAccount: () => set({ user: null, isAuthenticated: false }),
      
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
      
      updatePreferences: (prefs) => set((state) => ({
        user: state.user 
          ? { ...state.user, preferences: { ...state.user.preferences, ...prefs } } 
          : null
      })),

      updatePassword: (newPassword) => set((state) => ({
        user: state.user ? { ...state.user, password: newPassword } : null
      })),
      
      addAddress: (address) => set((state) => {
        if (!state.user) return state;
        const newAddress = { ...address, id: "add_" + Math.random().toString(36).substr(2, 9) };
        const addresses = [...state.user.addresses];
        if (addresses.length === 0 || newAddress.isDefault) {
          newAddress.isDefault = true;
          addresses.forEach(a => a.isDefault = false);
        }
        return { user: { ...state.user, addresses: [...addresses, newAddress] } };
      }),
      
      removeAddress: (id) => set((state) => {
        if (!state.user) return state;
        return { user: { ...state.user, addresses: state.user.addresses.filter(a => a.id !== id) } };
      }),
      
      setDefaultAddress: (id) => set((state) => {
        if (!state.user) return state;
        return {
          user: {
            ...state.user,
            addresses: state.user.addresses.map(a => ({ ...a, isDefault: a.id === id }))
          }
        };
      }),
      
      toggleWishlist: (item) => set((state) => {
        if (!state.user) return state;
        const exists = state.user.wishlist.some(w => w.productId === item.productId);
        if (exists) {
          return { user: { ...state.user, wishlist: state.user.wishlist.filter(w => w.productId !== item.productId) } };
        } else {
          return { user: { ...state.user, wishlist: [...state.user.wishlist, item] } };
        }
      }),
      
      addPaymentMethod: (pm) => set((state) => {
        if (!state.user) return state;
        const newPm = { ...pm, id: "pm_" + Math.random().toString(36).substr(2, 9) };
        const methods = [...state.user.paymentMethods];
        if (methods.length === 0 || newPm.isDefault) {
          newPm.isDefault = true;
          methods.forEach(m => m.isDefault = false);
        }
        return { user: { ...state.user, paymentMethods: [...methods, newPm] } };
      }),
      
      removePaymentMethod: (id) => set((state) => {
        if (!state.user) return state;
        return { user: { ...state.user, paymentMethods: state.user.paymentMethods.filter(m => m.id !== id) } };
      }),
      
      setDefaultPaymentMethod: (id) => set((state) => {
        if (!state.user) return state;
        return {
          user: {
            ...state.user,
            paymentMethods: state.user.paymentMethods.map(m => ({ ...m, isDefault: m.id === id }))
          }
        };
      })

    }),
    {
      name: 'marg-auth-storage', // key in local storage
    }
  )
);
