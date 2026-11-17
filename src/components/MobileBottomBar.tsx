import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { useBookingCart } from '../context/BookingCartContext';

export const MobileBottomBar: React.FC = () => {
  const { openCart, cartItems } = useBookingCart();

  return (
    <div className="fixed-bootom">
      <a href={`tel:${SALON_INFO.phoneRaw}`}>
        📞 CLICK TO CALL
      </a>
      <button
        type="button"
        className="mobile-bottom-book-btn"
        onClick={() => openCart()}
      >
        📅 BOOK NOW {cartItems.length > 0 && `(${cartItems.length})`}
      </button>
    </div>
  );
};
