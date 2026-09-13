import React from 'react';
import { Sparkles, Phone, ArrowDown, Star, Play, MapPin, Clock } from 'lucide-react';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';
import heroImg from '../assets/images/pizzagarden_hero_1789213225448.jpg';

interface HeroProps {
  onOrderNow: () => void;
  onExploreDeals: () => void;
  onWatchReels: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderNow,
  onExploreDeals,
  onWatchReels,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Warm Amber & Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="PizzaGarden Chakwal Restaurant Ambience"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[8000ms]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />
      </div>

      {/* Decorative Warm Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Location & Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-xl backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Talagang Hwy, opposite NFC, Chakwal, Pakistan</span>
          <span className="w-1 h-1 rounded-full bg-amber-400"></span>
          <span className="text-emerald-400 font-bold">Open Daily 11 AM – 1 AM</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-['Cabinet_Grotesk',sans-serif] leading-[1.08] max-w-4xl">
          Where Handcrafted Pizza Meets{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
            Luxury Ambience
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
          Welcome to <strong className="text-white font-semibold">PizzaGarden Chakwal</strong>. 
          Indulge in our legendary 36-inch Train Pizza, oven-baked Behari spin rolls, crispy zinger burgers, 
          and relaxing indoor palm dining.
        </p>

        {/* Highlights Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>The Big Boss Train Pizza (36&quot;)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Pure Mozzarella Cheesy Pulls</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dine-In · Take-Away · Home Delivery</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full max-w-lg">
          <button
            onClick={onOrderNow}
            className="flex-1 min-w-[200px] px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-base shadow-2xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Order Online Now
          </button>

          <a
            href={`https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}?text=Hello%20PizzaGarden%20Chakwal!%20I%20would%20like%20to%20place%20an%20order.`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="w-5 h-5" />
            <span>WhatsApp Order</span>
          </a>
        </div>

        {/* Watch Reels Button */}
        <div className="mt-6 flex items-center gap-6">
          <button
            onClick={onWatchReels}
            className="group flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-amber-400 ml-0.5" />
            </span>
            <span>Watch Inside PizzaGarden Reels (Videos)</span>
          </button>
          
          <button
            onClick={onExploreDeals}
            className="text-sm font-semibold text-neutral-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            View Family Deals &amp; Bundles
          </button>
        </div>

        {/* Scroll Down Hint */}
        <div className="mt-14 animate-bounce text-neutral-500">
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
};
