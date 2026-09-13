import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MessageCircle } from 'lucide-react';
import { Reservation } from '../types';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservationSubmitted: (res: Reservation) => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  onReservationSubmitted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(4);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name for the table reservation.');
      return;
    }
    if (!phone.trim()) {
      alert('Please enter your contact phone number.');
      return;
    }

    const newRes: Reservation = {
      id: 'res-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      seatingArea: 'Indoor Palm Garden',
      specialRequests: specialRequests.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onReservationSubmitted(newRes);
    setIsSubmitted(true);

    const text = `*TABLE RESERVATION - PIZZAGARDEN CHAKWAL*\n` +
      `👤 Name: ${name.trim()}\n` +
      `📞 Phone: ${phone.trim()}\n` +
      `📅 Date: ${date}\n` +
      `⏰ Time: ${time}\n` +
      `👥 Guests: ${guests} Persons\n` +
      (specialRequests.trim() ? `📝 Notes / Occasion: ${specialRequests.trim()}\n` : '') +
      `\nPlease confirm table availability. Thank you!`;

    window.open(`https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                Table Reservation via WhatsApp
              </h3>
              <p className="text-xs text-neutral-400">PizzaGarden Chakwal Dining Experience</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Opening WhatsApp...</h4>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Your reservation details for <strong className="text-white">{guests} guests</strong> on{' '}
                <strong className="text-amber-400">{date} at {time}</strong> have been pre-filled. Send the message on WhatsApp to finalize with our host desk.
              </p>

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleWhatsAppBooking()}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Re-open WhatsApp Chat</span>
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0329-XXXXXXX"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-2.5 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'Persons'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Special Occasion or Note (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday celebration, High chair needed"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Reserve Table on WhatsApp</span>
                </button>
                <p className="text-[11px] text-neutral-400 text-center mt-2">
                  Opens WhatsApp to immediately confirm with PizzaGarden Chakwal staff.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
