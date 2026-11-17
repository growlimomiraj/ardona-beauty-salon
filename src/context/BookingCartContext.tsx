import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  category?: string;
  price: number;
  priceFormatted: string;
  duration: string;
  note?: string;
}

interface BookingDetails {
  date: string;
  time: string;
  stylist: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientNotes: string;
}

interface BookingCartContextType {
  isCartOpen: boolean;
  cartItems: CartItem[];
  bookingDetails: BookingDetails;
  openCart: (initialItem?: Partial<CartItem>) => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  totalPrice: number;
  totalDurationMin: number;
}

const defaultBookingDetails: BookingDetails = {
  date: new Date().toISOString().split('T')[0],
  time: '11:00 AM',
  stylist: 'Any Available Master Stylist',
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  clientNotes: ''
};

const BookingCartContext = createContext<BookingCartContextType | undefined>(undefined);

export const BookingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'women-wash-cut-blowdry',
      name: 'Wash Cut Blow Dry Women',
      category: 'Cut & Style',
      price: 85.50,
      priceFormatted: '$85.50',
      duration: '45 min',
      note: 'Includes professional wash, cut, and blowout'
    }
  ]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(defaultBookingDetails);

  // Parse price helper
  const parsePrice = (priceStr: string | number): number => {
    if (typeof priceStr === 'number') return priceStr;
    const cleaned = priceStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const addItem = (item: CartItem) => {
    setCartItems(prev => {
      // Prevent exact duplicates or add another instance
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = (initialItem?: Partial<CartItem>) => {
    if (initialItem && initialItem.name) {
      const priceNum = parsePrice(initialItem.price || 0);
      const newItem: CartItem = {
        id: initialItem.id || `custom-${Date.now()}`,
        name: initialItem.name,
        category: initialItem.category || 'Salon Service',
        price: priceNum,
        priceFormatted: initialItem.priceFormatted || `$${priceNum.toFixed(2)}`,
        duration: initialItem.duration || '45 min',
        note: initialItem.note
      };
      addItem(newItem);
    }
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails(prev => ({ ...prev, ...details }));
  };

  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  const totalDurationMin = cartItems.reduce((acc, curr) => {
    const minsMatch = curr.duration.match(/(\d+)\s*min/);
    if (minsMatch) return acc + parseInt(minsMatch[1], 10);
    return acc + 45; // default 45 mins
  }, 0);

  // Prevent body scroll when cart modal is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <BookingCartContext.Provider
      value={{
        isCartOpen,
        cartItems,
        bookingDetails,
        openCart,
        closeCart,
        addItem,
        removeItem,
        clearCart,
        updateBookingDetails,
        totalPrice,
        totalDurationMin
      }}
    >
      {children}
    </BookingCartContext.Provider>
  );
};

export const useBookingCart = (): BookingCartContextType => {
  const context = useContext(BookingCartContext);
  if (!context) {
    throw new Error('useBookingCart must be used within a BookingCartProvider');
  }
  return context;
};
