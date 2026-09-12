import React from 'react';
import { X, ShoppingBag, Phone, Download, ZoomIn, Sparkles, Check } from 'lucide-react';
import { DealItem } from '../types';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';

interface PosterViewerModalProps {
  deal: DealItem | null;
  onClose: () => void;
  onAddToCart: (deal: DealItem) => void;
}

export const PosterViewerModal: React.FC<PosterViewerModalProps> = ({
  deal,
  onClose,
  onAddToCart,
}) => {
  if (!deal) return null;

  const posterSrc = deal.posterImage || deal.image;

  const handleWhatsAppDeal = () => {
    const text = `*PIZZAGARDEN CHAKWAL - DEAL ORDER*\n` +
      `I would like to order the: *${deal.title}*\n` +
      `Price: Rs. ${deal.price}\n` +
      `Included items: ${deal.items.join(', ')}\n` +
      `Please confirm delivery time to Chakwal.`;
    window.open(`https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 text-neutral-300 hover:text-white backdrop-blur-md shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster Artwork Display */}
        <div className="md:w-3/5 bg-neutral-950 flex items-center justify-center p-4 sm:p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-neutral-800">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 max-w-md w-full">
            <img
              src={posterSrc}
              alt={deal.title}
              className="w-full h-auto object-contain max-h-[75vh]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Poster Details & Action Sidebar */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-neutral-900">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{deal.badge}</span>
            </div>

            <h3 className="text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
              {deal.title}
            </h3>

            <p className="text-xs text-amber-400 font-semibold mt-1">
              {deal.subtitle}
            </p>

            <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
              {deal.description}
            </p>

            <div className="mt-5 pt-4 border-t border-neutral-800 space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Included In This Package:
              </span>
              {deal.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-400">
              <div className="flex justify-between py-1">
                <span>Serves:</span>
                <span className="text-white font-semibold">{deal.serves}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Location:</span>
                <span className="text-white font-semibold">Chakwal, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Controls */}
          <div className="pt-6 border-t border-neutral-800 mt-6 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                {deal.originalPrice && (
                  <span className="text-xs text-neutral-500 line-through mr-2">
                    Rs. {deal.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-black text-amber-400">
                  Rs. {deal.price}
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                Direct Deal Pricing
              </span>
            </div>

            <button
              onClick={() => {
                onAddToCart(deal);
                onClose();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Deal to Tray</span>
            </button>

            <button
              onClick={handleWhatsAppDeal}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Order This Deal on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
