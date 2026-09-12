import React from 'react';
import { MapPin, Phone, Clock, Sparkles, Navigation, Heart, ShieldCheck, Film } from 'lucide-react';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenStaff: () => void;
  onViewMenuPoster: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenStaff,
  onViewMenuPoster,
  onNavigate,
}) => {
  return (
    <footer id="location" className="bg-neutral-950 border-t border-neutral-800 text-neutral-300">
      {/* Top Banner with Google Map embed / Location card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400/40 shadow-sm flex items-center justify-center overflow-hidden">
                <img 
                  src="/pizzagarden-logo.svg" 
                  alt="Pizza Garden Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-white font-['Cabinet_Grotesk',sans-serif]">
                  PIZZA <span className="text-amber-400">GARDEN</span>
                </div>
                <div className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400">
                  CHAKWAL · PAKISTAN
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Chakwal&apos;s celebrated dining landmark. Famous for The Big Boss 36-inch Train Pizza, 
              oven-baked Behari spin rolls, and relaxing indoor palm dining. 
              Taste, ambience, and hospitable service in every visit.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={onViewMenuPoster}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 text-xs font-bold border border-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Full Menu Poster Artwork</span>
              </button>

              <button
                onClick={() => onNavigate('reels')}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold border border-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-red-400" />
                <span>Watch Inside Reels</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Cabinet_Grotesk',sans-serif]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('deals')}
                  className="hover:text-amber-400 transition-colors"
                >
                  36&quot; Train Pizza &amp; Family Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Explore Complete Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reels')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Inside PizzaGarden (Vertical Video Reels)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ambience')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Dining Ambience &amp; Seating Photos
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-amber-400 transition-colors"
                >
                  Book Table for Family &amp; Friends
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStaff}
                  className="hover:text-amber-400 transition-colors"
                >
                  Staff & Kitchen Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Cabinet_Grotesk',sans-serif]">
              Visit &amp; Contact Us
            </h4>

            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Address:</strong>
                  <span>Talagang Hwy, opposite NFC, Chakwal, Punjab, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Opening Hours:</strong>
                  <span>Monday – Sunday: 11:00 AM – 1:00 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Phone / WhatsApp:</strong>
                  <a
                    href={`https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline font-bold"
                  >
                    +92 329 6864242
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=PizzaGarden+Chakwal+Talagang+Hwy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-800 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} PizzaGarden Chakwal. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Chakwal, Pakistan</span>
            <span>·</span>
            <span>Taste · Ambience · Services</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
