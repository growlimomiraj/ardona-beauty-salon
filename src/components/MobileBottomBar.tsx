import React from 'react';
import { SALON_INFO } from '../data/salonData';

export const MobileBottomBar: React.FC = () => {
  return (
    <div className="fixed-bootom">
      <a href={`tel:${SALON_INFO.phoneRaw}`}>
        📞 Click to Call
      </a>
      <a href={SALON_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
        📅 Book an Appointment
      </a>
    </div>
  );
};
