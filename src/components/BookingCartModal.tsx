import React, { useState } from 'react';
import { useBookingCart, CartItem } from '../context/BookingCartContext';
import { SALON_INFO } from '../data/salonData';

const POPULAR_ADD_ONS: CartItem[] = [
  {
    id: 'addon-blowout',
    name: 'Signature Blow Out',
    category: 'Styling',
    price: 50.00,
    priceFormatted: '$50.00',
    duration: '45 min',
    note: 'Voluminous, sleek finish'
  },
  {
    id: 'addon-deep-cond',
    name: 'Deep Conditioning Treatment',
    category: 'Treatments',
    price: 45.00,
    priceFormatted: '$45.00',
    duration: '30 min',
    note: 'Restorative moisture infusion'
  },
  {
    id: 'addon-single-process',
    name: 'Single Process (Roots)',
    category: 'Color',
    price: 85.50,
    priceFormatted: '$85.50',
    duration: '60 min',
    note: '100% gray coverage & root touch-up'
  },
  {
    id: 'addon-balayage',
    name: 'Balayage / Ombre Highlighting',
    category: 'Color',
    price: 275.00,
    priceFormatted: '$275.00',
    duration: '150 min',
    note: 'Sun-kissed bespoke hand-painted dimension'
  },
  {
    id: 'addon-keratin',
    name: 'Keratin Smoothing Treatment',
    category: 'Treatments',
    price: 250.00,
    priceFormatted: '$250.00',
    duration: '120 min',
    note: 'Frizz-free shine lasting up to 5 months'
  },
  {
    id: 'addon-makeup',
    name: 'Full Glam Makeup Application',
    category: 'Beauty',
    price: 120.00,
    priceFormatted: '$120.00',
    duration: '60 min',
    note: 'Flawless event-ready makeup'
  }
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '2:30 PM',
  '3:30 PM',
  '4:30 PM',
  '5:30 PM',
  '6:30 PM'
];

export const BookingCartModal: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    addItem,
    removeItem,
    clearCart,
    totalPrice,
    totalDurationMin,
    bookingDetails,
    updateBookingDetails
  } = useBookingCart();

  const [step, setStep] = useState<'cart' | 'details' | 'confirmed'>('cart');
  const [bookingRef, setBookingRef] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isCartOpen) return null;

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    if (hours > 0 && m > 0) return `${hours} hr ${m} min`;
    if (hours > 0) return `${hours} hr`;
    return `${m} min`;
  };

  const handleNextToDetails = () => {
    if (cartItems.length === 0) {
      setErrorMsg('Please select at least one service before proceeding.');
      return;
    }
    setErrorMsg('');
    setStep('details');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails.clientName.trim() || !bookingDetails.clientPhone.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }

    const ref = `ARD-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);
    setStep('confirmed');
  };

  const handleFinish = () => {
    clearCart();
    setStep('cart');
    closeCart();
  };

  return (
    <div className="cart-modal-overlay" onClick={closeCart}>
      <div
        className="cart-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="cart-modal-header">
          <div className="cart-modal-header-info">
            <div className="cart-modal-badge">ONLINE BOOKING</div>
            <h2 className="cart-modal-title">
              {step === 'confirmed' ? 'Appointment Confirmed!' : 'Your Salon Booking Cart'}
            </h2>
            <p className="cart-modal-subtitle">
              Ardona Beauty Salon • 2578 Broadway, Upper West Side NYC
            </p>
          </div>
          <button
            type="button"
            className="cart-modal-close-btn"
            onClick={closeCart}
            aria-label="Close booking modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="cart-modal-body">
          {step === 'cart' && (
            <>
              {errorMsg && <div className="cart-error-banner">{errorMsg}</div>}

              {/* Items in Cart */}
              <div className="cart-items-section">
                <div className="cart-section-title-row">
                  <h3>Selected Services ({cartItems.length})</h3>
                  {cartItems.length > 0 && (
                    <button type="button" className="cart-clear-link" onClick={clearCart}>
                      Clear All
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="cart-empty-state">
                    <div className="cart-empty-icon">✂️</div>
                    <p className="cart-empty-text">Your booking cart is currently empty.</p>
                    <p className="cart-empty-sub">
                      Choose a popular luxury service below or browse our menu:
                    </p>
                  </div>
                ) : (
                  <div className="cart-items-list">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item-card">
                        <div className="cart-item-info">
                          <span className="cart-item-category">{item.category || 'Service'}</span>
                          <h4 className="cart-item-name">{item.name}</h4>
                          <span className="cart-item-duration">⏱ {item.duration}</span>
                          {item.note && <p className="cart-item-note">*{item.note}</p>}
                        </div>
                        <div className="cart-item-actions">
                          <span className="cart-item-price">{item.priceFormatted}</span>
                          <button
                            type="button"
                            className="cart-item-remove-btn"
                            onClick={() => removeItem(item.id)}
                            title="Remove service"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Add Extra Services */}
              <div className="cart-addons-section">
                <h3 className="cart-addons-title">Frequently Added Together</h3>
                <div className="cart-addons-grid">
                  {POPULAR_ADD_ONS.map((addon) => {
                    const isAdded = cartItems.some((i) => i.id === addon.id);
                    return (
                      <div key={addon.id} className={`cart-addon-item ${isAdded ? 'added' : ''}`}>
                        <div className="cart-addon-info">
                          <span className="cart-addon-name">{addon.name}</span>
                          <span className="cart-addon-details">
                            {addon.priceFormatted} • {addon.duration}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={`cart-addon-btn ${isAdded ? 'btn-added' : 'red-btn'}`}
                          disabled={isAdded}
                          onClick={() => addItem(addon)}
                        >
                          {isAdded ? '✓ Added' : '+ Add Service'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Schedule Quick Pick */}
              <div className="cart-schedule-section">
                <h3 className="cart-addons-title">Select Date & Time</h3>
                <div className="cart-schedule-row">
                  <div className="cart-form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDetails.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => updateBookingDetails({ date: e.target.value })}
                      className="cart-input"
                    />
                  </div>
                  <div className="cart-form-group">
                    <label>Stylist Preference</label>
                    <select
                      value={bookingDetails.stylist}
                      onChange={(e) => updateBookingDetails({ stylist: e.target.value })}
                      className="cart-input"
                    >
                      <option value="Any Available Master Stylist">Any Available Master Stylist</option>
                      <option value="Senior Color Specialist">Senior Color Specialist</option>
                      <option value="Haircut & Styling Specialist">Haircut & Styling Specialist</option>
                      <option value="Keratin & Texture Expert">Keratin & Texture Expert</option>
                    </select>
                  </div>
                </div>

                <div className="cart-form-group">
                  <label>Available Times</label>
                  <div className="cart-times-grid">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`cart-time-chip ${bookingDetails.time === time ? 'selected' : ''}`}
                        onClick={() => updateBookingDetails({ time })}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Summary Box */}
              <div className="cart-summary-box">
                <div className="cart-summary-row">
                  <span>Total Duration:</span>
                  <span className="summary-val">{formatDuration(totalDurationMin)}</span>
                </div>
                <div className="cart-summary-row total-row">
                  <span>Estimated Total:</span>
                  <span className="summary-total-price">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="cart-deposit-notice">
                  * A 25% deposit is collected for services over $100 to guarantee your appointment slot.
                </p>
              </div>

              {/* Footer Red Button */}
              <div className="cart-modal-footer">
                <button
                  type="button"
                  className="cart-btn-primary red-btn"
                  onClick={handleNextToDetails}
                  disabled={cartItems.length === 0}
                >
                  PROCEED TO CONTACT DETAILS →
                </button>
              </div>
            </>
          )}

          {step === 'details' && (
            <form onSubmit={handleConfirmBooking} className="cart-details-form">
              {errorMsg && <div className="cart-error-banner">{errorMsg}</div>}

              <div className="cart-step-summary-card">
                <h4>Appointment Summary</h4>
                <p>
                  📅 <strong>{bookingDetails.date}</strong> at <strong>{bookingDetails.time}</strong>
                </p>
                <p>
                  ✂️ <strong>{cartItems.length} Service(s)</strong>: {cartItems.map((i) => i.name).join(', ')}
                </p>
                <p>
                  💵 <strong>Total: ${totalPrice.toFixed(2)}</strong> ({formatDuration(totalDurationMin)})
                </p>
              </div>

              <div className="cart-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jessica Miller"
                  value={bookingDetails.clientName}
                  onChange={(e) => updateBookingDetails({ clientName: e.target.value })}
                  className="cart-input"
                />
              </div>

              <div className="cart-form-group">
                <label>Phone Number (for SMS confirmation) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (212) 555-0199"
                  value={bookingDetails.clientPhone}
                  onChange={(e) => updateBookingDetails({ clientPhone: e.target.value })}
                  className="cart-input"
                />
              </div>

              <div className="cart-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. jessica@example.com"
                  value={bookingDetails.clientEmail}
                  onChange={(e) => updateBookingDetails({ clientEmail: e.target.value })}
                  className="cart-input"
                />
              </div>

              <div className="cart-form-group">
                <label>Special Requests / Hair History (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your hair length, prior color treatments, or any specific goals..."
                  value={bookingDetails.clientNotes}
                  onChange={(e) => updateBookingDetails({ clientNotes: e.target.value })}
                  className="cart-input"
                />
              </div>

              <div className="cart-modal-footer">
                <button
                  type="button"
                  className="cart-btn-secondary"
                  onClick={() => setStep('cart')}
                >
                  ← BACK TO SERVICES
                </button>
                <button type="submit" className="cart-btn-primary red-btn">
                  CONFIRM APPOINTMENT & BOOK (${totalPrice.toFixed(2)})
                </button>
              </div>
            </form>
          )}

          {step === 'confirmed' && (
            <div className="cart-confirmed-view">
              <div className="confirmed-badge-icon">✓</div>
              <h3 className="confirmed-title">Appointment Successfully Booked!</h3>
              <p className="confirmed-lead">
                Thank you, <strong>{bookingDetails.clientName}</strong>! Your salon appointment has been reserved at Ardona Beauty Salon.
              </p>

              <div className="confirmed-details-card">
                <div className="confirmed-row">
                  <span>Reference ID:</span>
                  <strong>{bookingRef}</strong>
                </div>
                <div className="confirmed-row">
                  <span>Date & Time:</span>
                  <strong>
                    {bookingDetails.date} at {bookingDetails.time}
                  </strong>
                </div>
                <div className="confirmed-row">
                  <span>Stylist:</span>
                  <strong>{bookingDetails.stylist}</strong>
                </div>
                <div className="confirmed-row">
                  <span>Location:</span>
                  <strong>{SALON_INFO.address.full}</strong>
                </div>
                <div className="confirmed-row">
                  <span>Services:</span>
                  <strong>{cartItems.map((i) => i.name).join(' + ')}</strong>
                </div>
                <div className="confirmed-row">
                  <span>Total Amount:</span>
                  <strong className="confirmed-price">${totalPrice.toFixed(2)}</strong>
                </div>
              </div>

              <p className="confirmed-sms-notice">
                📲 A confirmation SMS has been dispatched to <strong>{bookingDetails.clientPhone}</strong>. If you need to make changes, please call us at {SALON_INFO.phone}.
              </p>

              <div className="confirmed-actions-row">
                <button type="button" className="cart-btn-primary red-btn" onClick={handleFinish}>
                  RETURN TO SALON HOME
                </button>
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="cart-btn-secondary"
                  style={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  📞 CALL SALON ({SALON_INFO.phone})
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
