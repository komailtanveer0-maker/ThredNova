import React from 'react';
import { 
  Sparkles, 
  Users, 
  Plus, 
  Phone, 
  Flame, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { DEALS, PIZZAGARDEN_CONTACT } from '../data/menuData';
import { DealItem } from '../types';

interface DealsSectionProps {
  onAddDealToCart: (deal: DealItem) => void;
  onViewPoster?: (deal: DealItem) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  onAddDealToCart,
}) => {
  return (
    <section id="deals" className="py-20 bg-neutral-900/50 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Bundles &amp; Super Deals</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk',sans-serif]">
              PizzaGarden Special Deals
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl">
              From our famous 36-inch Train Pizza to massive family platters and student combos. 
              Freshly prepared with generous savings.
            </p>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Available for Dine-In, Take-Away &amp; Free Delivery in Chakwal</span>
          </div>
        </div>

        {/* Big Boss Train Pizza Special Highlight Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/70 via-neutral-900 to-neutral-950 border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600 text-white text-xs font-black tracking-widest uppercase">
                <Flame className="w-4 h-4 fill-white" />
                <span>CHAKWAL&apos;S BIGGEST PIZZA (36 INCHES)</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Cabinet_Grotesk',sans-serif] leading-tight">
                The Big Boss{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500">
                  Train Pizza 36&quot;
                </span>
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Enjoy 3 full feet of delicious hand-crafted pizza served on an authentic wooden plank. 
                Customized with any <strong className="text-amber-400 font-bold">3 signature flavors</strong> of your choice side-by-side!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3">
                  <div className="text-xs text-neutral-400 font-medium">Length</div>
                  <div className="text-lg font-bold text-white">36 Inches</div>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3">
                  <div className="text-xs text-neutral-400 font-medium">Flavours</div>
                  <div className="text-lg font-bold text-amber-400">Pick Any 3</div>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 col-span-2 sm:col-span-1">
                  <div className="text-xs text-neutral-400 font-medium">Feeds</div>
                  <div className="text-lg font-bold text-white">6 - 8 People</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="text-left">
                  <span className="text-xs text-neutral-400 block line-through">Rs. 4,200</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400">
                    Rs. 3,599
                  </div>
                </div>

                <button
                  onClick={() => onAddDealToCart(DEALS[0])}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Train Pizza Now</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div 
                className="relative rounded-2xl overflow-hidden border-2 border-neutral-700/60 shadow-2xl max-w-sm w-full"
              >
                <img
                  src={DEALS[0].image}
                  alt="36-Inch Train Pizza PizzaGarden"
                  className="w-full h-72 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-neutral-950/85 px-3 py-1 rounded-md border border-neutral-700 font-bold text-amber-300">
                    36-Inch Handcrafted Train Pizza
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Other Featured Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEALS.slice(1).map((deal) => (
            <div
              key={deal.id}
              className="bg-neutral-950 rounded-3xl border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-52 overflow-hidden bg-neutral-900">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md">
                      {deal.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{deal.serves}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                        {deal.title}
                      </h3>
                      <p className="text-xs text-amber-400 font-semibold mt-1">
                        {deal.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                    {deal.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      What&apos;s Included:
                    </span>
                    {deal.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart Footer */}
              <div className="p-6 pt-0 border-t border-neutral-800/60 mt-4">
                <div className="flex items-baseline justify-between mb-4 pt-4">
                  <div>
                    {deal.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through mr-2">
                        Rs. {deal.originalPrice}
                      </span>
                    )}
                    <span className="text-2xl font-black text-amber-400">
                      Rs. {deal.price}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Best Value Deal
                  </span>
                </div>

                <div>
                  <button
                    onClick={() => onAddDealToCart(deal)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.01]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
