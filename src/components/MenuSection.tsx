import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Leaf, 
  Sparkles, 
  Plus, 
  Check, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, Category, CartItem } from '../types';

interface MenuSectionProps {
  menuItems?: MenuItem[];
  onAddToCart: (item: MenuItem, selectedSize?: string, customPrice?: number, selectedFlavours?: string[]) => void;
}

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'special-pizzas', label: 'Special Pizzas' },
  { id: 'traditional-pizzas', label: 'Traditional Pizzas' },
  { id: 'crust-specials', label: 'Crust Specials & 36"' },
  { id: 'burgers', label: 'Burgers & Grilled' },
  { id: 'fried-chicken', label: 'Crispy Fried Chicken' },
  { id: 'appetizers', label: 'Appetizers & Wings' },
  { id: 'pasta-fries', label: 'Pasta & Loaded Fries' },
  { id: 'beverages', label: 'Chilled Drinks' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ menuItems, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  // Per-item selected size state
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  // Per-item selected flavors for Train Pizza
  const [selectedTrainFlavours, setSelectedTrainFlavours] = useState<Record<string, string[]>>({});

  const itemsToFilter = menuItems && menuItems.length > 0 ? menuItems : MENU_ITEMS;

  const filteredItems = useMemo(() => {
    return itemsToFilter.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      if (filterSpicyOnly && !item.isSpicy) return false;
      if (filterVegOnly && !item.isVegetarian) return false;
      return true;
    });
  }, [activeCategory, searchQuery, filterSpicyOnly, filterVegOnly]);

  const handleSizeChange = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleFlavourToggle = (itemId: string, flavour: string) => {
    setSelectedTrainFlavours((prev) => {
      const current = prev[itemId] || ['Chicken Tikka', 'Mayo Garlic Ranch', 'Super Supreme'];
      if (current.includes(flavour)) {
        if (current.length === 1) return prev; // keep at least 1
        return { ...prev, [itemId]: current.filter((f) => f !== flavour) };
      } else {
        if (current.length >= 3) {
          // replace oldest
          return { ...prev, [itemId]: [...current.slice(1), flavour] };
        }
        return { ...prev, [itemId]: [...current, flavour] };
      }
    });
  };

  const getItemPrice = (item: MenuItem): number => {
    if (!item.sizes || item.sizes.length === 0) {
      return item.price;
    }
    const currentSize = selectedSizes[item.id] || item.sizes[0].size;
    const option = item.sizes.find((s) => s.size === currentSize);
    return option ? option.price : item.price;
  };

  const handleAdd = (item: MenuItem) => {
    const currentSize = item.sizes ? (selectedSizes[item.id] || item.sizes[0].size) : undefined;
    const price = getItemPrice(item);
    const flavours = item.flavours ? (selectedTrainFlavours[item.id] || ['Chicken Tikka', 'Mayo Garlic Ranch', 'Super Supreme']) : undefined;
    onAddToCart(item, currentSize, price, flavours);
  };

  return (
    <section id="menu" className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Dine-In &amp; Delivery Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Cabinet_Grotesk',sans-serif]">
            Explore Our Culinary Menu
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            From wood-style baked pizzas with real stringy mozzarella to double-crunch zinger burgers 
            and loaded platters. Pick your size and order straight to your table or doorstep.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizzas, burgers, rolls, drinks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap border ${
                filterSpicyOnly
                  ? 'bg-red-950/80 border-red-500 text-red-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Spicy Dishes</span>
            </button>

            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap border ${
                filterVegOnly
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vegetarian</span>
            </button>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/30 rounded-3xl border border-neutral-800">
            <p className="text-neutral-400 text-sm">No items found matching your filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterSpicyOnly(false);
                setFilterVegOnly(false);
              }}
              className="mt-3 text-xs text-amber-400 underline font-semibold"
            >
              Clear filters and view all dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const currentSize = selectedSizes[item.id] || (item.sizes ? item.sizes[0].size : undefined);
              const price = getItemPrice(item);
              const trainFlavours = selectedTrainFlavours[item.id] || ['Chicken Tikka', 'Mayo Garlic Ranch', 'Super Supreme'];

              return (
                <div
                  key={item.id}
                  className="bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden bg-neutral-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-black text-[10px] uppercase tracking-wider shadow">
                            {item.badge}
                          </span>
                        )}
                        {item.isPopular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider shadow">
                            Popular
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        {item.isSpicy && (
                          <span className="p-1 rounded-md bg-neutral-950/80 text-red-400" title="Spicy">
                            <Flame className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {item.isVegetarian && (
                          <span className="p-1 rounded-md bg-neutral-950/80 text-emerald-400" title="Vegetarian">
                            <Leaf className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Size Selector for Pizzas */}
                      {item.sizes && item.sizes.length > 1 && (
                        <div className="mt-4 pt-3 border-t border-neutral-800">
                          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
                            Select Pizza Size:
                          </label>
                          <div className="grid grid-cols-4 gap-1.5">
                            {item.sizes.map((s) => (
                              <button
                                key={s.size}
                                onClick={() => handleSizeChange(item.id, s.size)}
                                className={`py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all text-center ${
                                  currentSize === s.size
                                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                }`}
                              >
                                <div>{s.size}</div>
                                <div className="text-[9px] opacity-80">Rs.{s.price}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Flavors Selector for 36" Train Pizza */}
                      {item.flavours && (
                        <div className="mt-4 pt-3 border-t border-neutral-800">
                          <div className="flex items-center justify-between text-[11px] font-bold text-neutral-300 mb-1.5">
                            <span>Pick 3 Flavours:</span>
                            <span className="text-amber-400">{trainFlavours.length}/3 selected</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.flavours.map((f) => {
                              const isSelected = trainFlavours.includes(f);
                              return (
                                <button
                                  key={f}
                                  onClick={() => handleFlavourToggle(item.id, f)}
                                  className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors flex items-center gap-1 ${
                                    isSelected
                                      ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                                      : 'bg-neutral-800 text-neutral-400 border border-transparent'
                                  }`}
                                >
                                  {isSelected && <Check className="w-2.5 h-2.5" />}
                                  <span>{f}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="p-5 pt-0 border-t border-neutral-800/60 mt-2">
                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                          Price
                        </span>
                        <span className="text-xl font-black text-amber-400">
                          Rs. {price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
