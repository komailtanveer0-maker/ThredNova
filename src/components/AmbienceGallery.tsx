import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, Shield, Maximize2, X } from 'lucide-react';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';
import heroImg from '../assets/images/pizzagarden_hero_1789213225448.jpg';
import pizzaDelightImg from '../assets/images/pizza_delight_1789213397214.jpg';
import trainPizzaImg from '../assets/images/train_pizza_1789213434117.jpg';
import nightExteriorImg from '../assets/images/reel_night_exterior_1789223153243.jpg';
import circularBoothImg from '../assets/images/reel_circular_booth_1789223197371.jpg';
import indoorAmbienceImg from '../assets/images/reel_indoor_ambience_1789223165432.jpg';

interface AmbienceGalleryProps {
  onOpenReservation: () => void;
}

const AMBIENCE_PHOTOS = [
  {
    id: 'hero-dining',
    title: 'Central Palm Dining Hall',
    description: 'Under warm amber chandeliers with lush tropical indoor palms and circular booth seating.',
    image: indoorAmbienceImg,
    badge: 'Main Dining',
  },
  {
    id: 'food-delight',
    title: 'Freshly Baked Wood-Style Pizza',
    description: 'Golden bubbling 100% real mozzarella cheese on fresh handmade crust.',
    image: pizzaDelightImg,
    badge: 'Wood-Oven Craft',
  },
  {
    id: 'food-train',
    title: 'The 36-Inch Train Feast',
    description: 'Chakwal’s longest continuous pizza plank, featuring three customized flavours.',
    image: trainPizzaImg,
    badge: 'The Big Boss',
  },
  {
    id: 'circular-booth',
    title: 'Family Privacy & Circular Booths',
    description: 'Comfortable semi-private family booths designed for gatherings and birthday dinners.',
    image: circularBoothImg,
    badge: 'Family Comfort',
  },
  {
    id: 'food-ambience',
    title: 'Warm Atmospheric Lighting',
    description: 'Lush greenery and soft architectural lighting create the coziest restaurant vibe.',
    image: heroImg,
    badge: 'Dining Hall',
  },
  {
    id: 'entrance-steps',
    title: 'Illuminated Grand Entrance',
    description: 'Warm fairy-lit staircase welcoming guests from Talagang Highway, Chakwal.',
    image: nightExteriorImg,
    badge: 'Night Ambience',
  },
];

export const AmbienceGallery: React.FC<AmbienceGalleryProps> = ({ onOpenReservation }) => {
  const [selectedImage, setSelectedImage] = useState<(typeof AMBIENCE_PHOTOS)[0] | null>(null);

  return (
    <section id="ambience" className="py-20 bg-neutral-900/40 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Taste · Ambience · Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk',sans-serif]">
            The PizzaGarden Dining Experience
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Designed for memorable family gatherings, birthdays, and date nights. 
            Enjoy comfortable circular booths, natural palm accents, soothing warm lighting, and dedicated service in Chakwal.
          </p>
        </div>

        {/* Ambience Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMBIENCE_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedImage(photo)}
              className="group relative h-72 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer shadow-lg hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.01]"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  {photo.badge}
                </span>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-neutral-950/80 text-white backdrop-blur-md inline-block">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation CTA Strip */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
              Planning a Family Dinner or Celebration?
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Reserve your preferred circular booth or palm dining table ahead of time.
            </p>
          </div>

          <button
            onClick={onOpenReservation}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-xl shadow-amber-500/10 transition-transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Table Now</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/80 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-cover"
              referrerPolicy="no-referrer"
            />

            <div className="p-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {selectedImage.badge}
              </span>
              <h3 className="text-2xl font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-neutral-300 mt-2">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
