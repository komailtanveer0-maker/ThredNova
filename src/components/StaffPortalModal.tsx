import React, { useState, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Truck, 
  RefreshCw,
  Phone,
  Calendar,
  Filter,
  UtensilsCrossed,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Image as ImageIcon,
  Flame,
  Leaf,
  Star,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { Order, OrderStatus, Reservation, MenuItem, Category, PizzaSizeOption } from '../types';

interface StaffPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  reservations: Reservation[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  menuItems: MenuItem[];
  onUpdateMenuItem: (item: MenuItem) => void;
  onAddMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (itemId: string) => void;
}

const CATEGORY_OPTIONS: { id: Category; label: string }[] = [
  { id: 'special-pizzas', label: 'Special Pizzas' },
  { id: 'traditional-pizzas', label: 'Traditional Pizzas' },
  { id: 'crust-specials', label: 'Crust Specials & 36"' },
  { id: 'burgers', label: 'Burgers & Grilled' },
  { id: 'fried-chicken', label: 'Crispy Fried Chicken' },
  { id: 'appetizers', label: 'Appetizers & Wings' },
  { id: 'pasta-fries', label: 'Pasta & Loaded Fries' },
  { id: 'beverages', label: 'Chilled Drinks' },
];

const PRESET_PICTURES = [
  { label: 'Special Pizza Delight', url: '/assets/images/pizza_delight_1789213251413.jpg' },
  { label: '36" Train Pizza', url: '/assets/images/train_pizza_1789213434117.jpg' },
  { label: 'Behari Kabab Spin Roll', url: '/assets/images/behari_rolls_1789213271171.jpg' },
  { label: 'Crispy Zinger Burger', url: '/assets/images/zinger_burger_1789213328372.jpg' },
  { label: 'Appetizer Wings & Fries', url: '/assets/images/pasta_fries_1789213386768.jpg' },
  { label: 'Cold Drink Refreshment', url: '/assets/images/drinks_reels_1789213460831.jpg' },
];

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({
  isOpen,
  onClose,
  orders,
  reservations,
  onUpdateOrderStatus,
  menuItems,
  onUpdateMenuItem,
  onAddMenuItem,
  onDeleteMenuItem,
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'recipes'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Recipe management states
  const [recipeSearch, setRecipeSearch] = useState('');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<Category | 'all'>('all');
  const [editingRecipe, setEditingRecipe] = useState<MenuItem | null>(null);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);

  // Form state for Add/Edit Recipe
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    category: Category;
    description: string;
    price: number;
    image: string;
    badge: string;
    isPopular: boolean;
    isSpicy: boolean;
    isVegetarian: boolean;
    hasSizes: boolean;
    smallPrice: number;
    mediumPrice: number;
    largePrice: number;
    xlargePrice: number;
  }>({
    id: '',
    name: '',
    category: 'special-pizzas',
    description: '',
    price: 999,
    image: '/assets/images/pizza_delight_1789213251413.jpg',
    badge: '',
    isPopular: false,
    isSpicy: false,
    isVegetarian: false,
    hasSizes: true,
    smallPrice: 550,
    mediumPrice: 1150,
    largePrice: 1850,
    xlargePrice: 2350,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized Staff Code
    if (accessCode.trim() === '313302') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Received
          </span>
        );
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
            <ChefHat className="w-3 h-3" /> Kitchen Baking
          </span>
        );
      case 'on_the_way':
        return (
          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center gap-1">
            <Truck className="w-3 h-3" /> Out for Delivery
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Delivered / Served
          </span>
        );
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  // Filtered recipes
  const filteredRecipes = menuItems.filter((item) => {
    if (recipeCategoryFilter !== 'all' && item.category !== recipeCategoryFilter) {
      return false;
    }
    if (recipeSearch.trim() !== '') {
      const q = recipeSearch.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    return true;
  });

  // Open recipe editor for existing item
  const handleOpenEditRecipe = (item: MenuItem) => {
    const small = item.sizes?.find((s) => s.size === 'Small')?.price || 550;
    const med = item.sizes?.find((s) => s.size === 'Medium')?.price || item.price;
    const large = item.sizes?.find((s) => s.size === 'Large')?.price || 1850;
    const xl = item.sizes?.find((s) => s.size === 'X-Large')?.price || 2350;

    setFormData({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.image || '/assets/images/pizza_delight_1789213251413.jpg',
      badge: item.badge || '',
      isPopular: !!item.isPopular,
      isSpicy: !!item.isSpicy,
      isVegetarian: !!item.isVegetarian,
      hasSizes: Boolean(item.sizes && item.sizes.length > 0),
      smallPrice: small,
      mediumPrice: med,
      largePrice: large,
      xlargePrice: xl,
    });
    setEditingRecipe(item);
    setIsCreatingRecipe(false);
    setFormError(null);
  };

  // Open recipe creator for brand new item
  const handleOpenNewRecipe = () => {
    setFormData({
      id: 'pg-recipe-' + Date.now(),
      name: '',
      category: 'special-pizzas',
      description: '',
      price: 1150,
      image: '/assets/images/pizza_delight_1789213251413.jpg',
      badge: "CHEF'S SPECIAL",
      isPopular: true,
      isSpicy: false,
      isVegetarian: false,
      hasSizes: true,
      smallPrice: 550,
      mediumPrice: 1150,
      largePrice: 1850,
      xlargePrice: 2350,
    });
    setEditingRecipe(null);
    setIsCreatingRecipe(true);
    setFormError(null);
  };

  // Close recipe modal
  const handleCloseRecipeForm = () => {
    setEditingRecipe(null);
    setIsCreatingRecipe(false);
    setFormError(null);
  };

  // Handle uploading picture from device
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormError('Uploaded picture is too large (max 5MB). Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
        setFormError(null);
      }
    };
    reader.onerror = () => {
      setFormError('Failed to read image file from device.');
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop of Image
  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please drop an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
        setFormError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save recipe
  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Recipe name is required.');
      return;
    }
    if (formData.price <= 0) {
      setFormError('Please enter a valid price greater than 0.');
      return;
    }

    let sizes: PizzaSizeOption[] | undefined = undefined;
    if (formData.hasSizes) {
      sizes = [
        { size: 'Small', price: Number(formData.smallPrice) || 550 },
        { size: 'Medium', price: Number(formData.mediumPrice) || formData.price },
        { size: 'Large', price: Number(formData.largePrice) || 1850 },
        { size: 'X-Large', price: Number(formData.xlargePrice) || 2350 },
      ];
    }

    const updatedOrNewItem: MenuItem = {
      id: formData.id || 'pg-item-' + Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      price: Number(formData.price),
      sizes,
      image: formData.image || '/assets/images/pizza_delight_1789213251413.jpg',
      badge: formData.badge.trim() || undefined,
      isPopular: formData.isPopular,
      isSpicy: formData.isSpicy,
      isVegetarian: formData.isVegetarian,
    };

    if (isCreatingRecipe) {
      onAddMenuItem(updatedOrNewItem);
    } else {
      onUpdateMenuItem(updatedOrNewItem);
    }

    handleCloseRecipeForm();
  };

  const handleDeleteRecipePrompt = (itemId: string, itemName: string) => {
    if (window.confirm(`Are you sure you want to remove "${itemName}" from PizzaGarden menu?`)) {
      onDeleteMenuItem(itemId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                  PizzaGarden Staff &amp; Kitchen Control
                </h3>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Authenticated
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400">
                Talagang Road Branch, Chakwal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
              Staff &amp; Kitchen Access
            </h4>
            <p className="text-xs text-neutral-400">
              Please enter your authorized PizzaGarden staff PIN to access live kitchen orders, table bookings, and menu management.
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={6}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter 6-digit Staff PIN"
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                autoFocus
              />

              {authError && (
                <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid access code. Please verify with management.</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg transition-colors cursor-pointer"
              >
                Unlock Staff Portal
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="p-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/60">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Live Orders Queue ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'reservations'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Table Bookings ({reservations.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('recipes')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'recipes'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Recipes &amp; Menu ({menuItems.length})</span>
                </button>
              </div>

              {activeTab === 'orders' && (
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-neutral-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2 py-1 text-xs rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="received">New Orders</option>
                    <option value="preparing">In Kitchen</option>
                    <option value="on_the_way">Out for Delivery</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              {activeTab === 'recipes' && (
                <button
                  onClick={handleOpenNewRecipe}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add New Recipe / Dish</span>
                </button>
              )}
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* TAB 1: ORDERS */}
              {activeTab === 'orders' && (
                filteredOrders.length === 0 ? (
                  <div className="text-center py-16 text-neutral-500 text-xs">
                    No orders in this status category.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white font-mono">
                              {order.orderNumber}
                            </span>
                            {getStatusBadge(order.status)}
                            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                              · {order.orderType}
                            </span>
                          </div>
                          <div className="text-xs text-neutral-400">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-neutral-400 block">Customer:</span>
                            <span className="text-white font-bold">{order.customerName}</span>
                            <span className="text-neutral-400 block">{order.customerPhone}</span>
                            {order.deliveryAddress && (
                              <p className="text-neutral-300 mt-1">
                                📍 {order.deliveryAddress}
                              </p>
                            )}
                            {order.tableNumber && (
                              <p className="text-amber-400 mt-1">
                                🪑 Table: {order.tableNumber}
                              </p>
                            )}
                          </div>

                          <div className="bg-neutral-900/90 p-3 rounded-xl border border-neutral-800">
                            <span className="text-neutral-400 block mb-1 font-semibold">
                              Items Ordered:
                            </span>
                            <ul className="space-y-1">
                              {order.items.map((it) => (
                                <li key={it.id} className="text-neutral-200 flex justify-between">
                                  <span>
                                    {it.quantity}x {it.name} {it.size ? `(${it.size})` : ''}
                                  </span>
                                  <span className="text-neutral-400">
                                    Rs. {it.price * it.quantity}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-2 pt-2 border-t border-neutral-800 flex justify-between font-black text-amber-400">
                              <span>Total:</span>
                              <span>Rs. {order.total}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Change Controls */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-900">
                          <span className="text-[11px] text-neutral-400">Change Status:</span>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'received')}
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-900 hover:bg-neutral-800 text-blue-300 border border-neutral-700"
                            >
                              New
                            </button>
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-neutral-700"
                            >
                              Baking / Prep
                            </button>
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'on_the_way')}
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-900 hover:bg-neutral-800 text-purple-300 border border-neutral-700"
                            >
                              Out for Delivery
                            </button>
                            <button
                              onClick={() => onUpdateOrderStatus(order.id, 'completed')}
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                            >
                              Mark Delivered
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* TAB 2: RESERVATIONS */}
              {activeTab === 'reservations' && (
                reservations.length === 0 ? (
                  <div className="text-center py-16 text-neutral-500 text-xs">
                    No table reservations booked yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map((res) => (
                      <div
                        key={res.id}
                        className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-bold text-white">{res.name}</h5>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                              {res.guests} Guests
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[10px]">
                              {res.seatingArea}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                            <span>📅 {res.date} at {res.time}</span>
                            <span>📞 {res.phone}</span>
                          </div>
                          {res.specialRequests && (
                            <p className="text-[11px] text-neutral-400 mt-1">
                              Note: {res.specialRequests}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/92${res.phone.replace(/^0+/, '')}?text=Hello%20${res.name}!%20Confirming%20your%20table%20reservation%20at%20PizzaGarden%20Chakwal.`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* TAB 3: RECIPES & MENU MANAGEMENT */}
              {activeTab === 'recipes' && (
                <div className="space-y-5">
                  {/* Controls Bar: Search & Category filter */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800">
                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        value={recipeSearch}
                        onChange={(e) => setRecipeSearch(e.target.value)}
                        placeholder="Search recipe by name or ingredient..."
                        className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-xs text-neutral-400 shrink-0">Category:</span>
                      <select
                        value={recipeCategoryFilter}
                        onChange={(e) => setRecipeCategoryFilter(e.target.value as Category | 'all')}
                        className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="all">All Categories ({menuItems.length})</option>
                        {CATEGORY_OPTIONS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Recipe Cards Grid */}
                  {filteredRecipes.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-950/60 rounded-2xl border border-dashed border-neutral-800 space-y-3">
                      <UtensilsCrossed className="w-10 h-10 text-neutral-600 mx-auto" />
                      <p className="text-sm font-semibold text-neutral-400">No dishes match your search or filter</p>
                      <button
                        onClick={handleOpenNewRecipe}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
                      >
                        Create New Recipe
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredRecipes.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between gap-3 group"
                        >
                          <div className="flex gap-3.5">
                            {/* Recipe Photo Thumbnail */}
                            <div className="relative w-20 h-20 rounded-xl bg-neutral-900 overflow-hidden shrink-0 border border-neutral-800 shadow-inner">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              {item.badge && (
                                <span className="absolute bottom-1 left-1 right-1 text-[8px] font-black uppercase text-center px-1 py-0.5 rounded bg-amber-500 text-neutral-950 truncate shadow">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="text-sm font-bold text-white truncate font-['Cabinet_Grotesk',sans-serif]">
                                  {item.name}
                                </h5>
                                <span className="text-xs font-black text-amber-400 shrink-0">
                                  Rs. {item.price}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                                  {CATEGORY_OPTIONS.find((c) => c.id === item.category)?.label || item.category}
                                </span>
                                {item.isSpicy && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center gap-0.5">
                                    <Flame className="w-2.5 h-2.5" /> Spicy
                                  </span>
                                )}
                                {item.isVegetarian && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-0.5">
                                    <Leaf className="w-2.5 h-2.5" /> Veg
                                  </span>
                                )}
                                {item.isPopular && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-bold flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5 fill-current" /> Popular
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Sizes summary if multi-size */}
                          {item.sizes && item.sizes.length > 0 && (
                            <div className="pt-2 border-t border-neutral-900 flex flex-wrap gap-1.5 text-[10px] text-neutral-400">
                              <span className="text-neutral-500">Sizes:</span>
                              {item.sizes.map((s) => (
                                <span key={s.size} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                                  {s.size}: <strong className="text-amber-400">Rs. {s.price}</strong>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons: Edit Recipe & Delete */}
                          <div className="pt-2 border-t border-neutral-900 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-neutral-500 font-mono">
                              ID: {item.id}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditRecipe(item)}
                                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>Edit Recipe</span>
                              </button>

                              <button
                                onClick={() => handleDeleteRecipePrompt(item.id, item.name)}
                                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-neutral-800 transition-colors cursor-pointer"
                                title="Delete Recipe"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: ADD / EDIT RECIPE OVERLAY */}
        {(editingRecipe || isCreatingRecipe) && (
          <div className="absolute inset-0 z-20 bg-neutral-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
            <div className="max-w-2xl w-full mx-auto space-y-5 my-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    {isCreatingRecipe ? <Plus className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                      {isCreatingRecipe ? 'Add New Recipe / Dish' : `Edit Recipe: ${editingRecipe?.name}`}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Configure dish recipe details, pricing, and photo upload.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseRecipeForm}
                  className="p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSaveRecipe} className="space-y-4 text-xs">
                {/* 1. Recipe Name & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Dish / Recipe Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Malai Boti Special Crust"
                      className="w-full py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. UPLOAD PICTURE OF RECIPE FROM DEVICE OPTION */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <div className="flex items-center justify-between">
                    <label className="text-neutral-200 font-bold flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Upload Picture of Recipe from Device</span>
                    </label>
                    <span className="text-[11px] text-amber-400/90 font-medium">
                      Phone Gallery, Camera or PC file
                    </span>
                  </div>

                  {/* Hidden native file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />

                  {/* Drag & Drop / Preview Box */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropImage}
                    className="border-2 border-dashed border-neutral-700 hover:border-amber-500/50 rounded-xl p-3 text-center transition-colors bg-neutral-950/50 flex flex-col sm:flex-row items-center gap-4"
                  >
                    {/* Picture Preview */}
                    <div className="relative w-28 h-24 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0 mx-auto sm:mx-0 shadow-md">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt="Recipe Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
                          <ImageIcon className="w-6 h-6 mb-1" />
                          <span className="text-[9px]">No Photo</span>
                        </div>
                      )}
                    </div>

                    {/* Upload CTA Controls */}
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <div className="space-y-0.5">
                        <p className="text-white font-semibold text-xs">
                          Choose an image file from your phone or computer
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          Supports JPG, PNG, WebP · Drag &amp; drop or browse
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Browse Device Photos</span>
                        </button>

                        {formData.image && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '' })}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 text-xs transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Preset Photos (Optional convenience) */}
                  <div className="pt-2 border-t border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block mb-1.5">
                      Or quick-select from existing PizzaGarden culinary photos:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_PICTURES.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: preset.url })}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium border transition-colors ${
                            formData.image === preset.url
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Description & Secret Ingredients */}
                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold block">
                    Description / Ingredients &amp; Recipe Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g. Tender marinated chicken chunks, mozzarella & cheddar cheese, capsicum, olives, and signature garlic dip..."
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500 text-xs leading-relaxed"
                  />
                </div>

                {/* 4. Pricing & Multi-Size Options */}
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-white font-bold text-xs block">
                        Base / Default Price (Rs.) <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[10px] text-neutral-400">Regular single-portion price</span>
                    </div>
                    <div className="w-36">
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full py-1.5 px-3 rounded-xl bg-neutral-950 border border-neutral-700 text-amber-400 font-bold text-sm text-right focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Multi-Size Toggle */}
                  <div className="pt-2 border-t border-neutral-800">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.hasSizes}
                        onChange={(e) => setFormData({ ...formData, hasSizes: e.target.checked })}
                        className="rounded bg-neutral-950 border-neutral-700 text-amber-500 focus:ring-0"
                      />
                      <span className="text-xs text-neutral-300 font-semibold">
                        Configure Multi-Size Options (Small, Medium, Large, X-Large)
                      </span>
                    </label>

                    {formData.hasSizes && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2.5 pt-2 border-t border-neutral-800/60">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-400 block font-medium">Small (Rs.)</span>
                          <input
                            type="number"
                            value={formData.smallPrice}
                            onChange={(e) => setFormData({ ...formData, smallPrice: Number(e.target.value) })}
                            className="w-full py-1 px-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs text-right"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-400 block font-medium">Medium (Rs.)</span>
                          <input
                            type="number"
                            value={formData.mediumPrice}
                            onChange={(e) => setFormData({ ...formData, mediumPrice: Number(e.target.value) })}
                            className="w-full py-1 px-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs text-right"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-400 block font-medium">Large (Rs.)</span>
                          <input
                            type="number"
                            value={formData.largePrice}
                            onChange={(e) => setFormData({ ...formData, largePrice: Number(e.target.value) })}
                            className="w-full py-1 px-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs text-right"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-400 block font-medium">X-Large (Rs.)</span>
                          <input
                            type="number"
                            value={formData.xlargePrice}
                            onChange={(e) => setFormData({ ...formData, xlargePrice: Number(e.target.value) })}
                            className="w-full py-1 px-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs text-right"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Badges & Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">Custom Badge Text</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. CHEF'S CHOICE, BESTSELLER"
                      className="w-full py-1.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex flex-col justify-end space-y-2 pt-2 sm:pt-0">
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={formData.isSpicy}
                          onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
                          className="rounded bg-neutral-950 border-neutral-700 text-red-500 focus:ring-0"
                        />
                        <Flame className="w-3.5 h-3.5 text-red-400" />
                        <span>Spicy</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={formData.isVegetarian}
                          onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                          className="rounded bg-neutral-950 border-neutral-700 text-emerald-500 focus:ring-0"
                        />
                        <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Vegetarian</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={formData.isPopular}
                          onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                          className="rounded bg-neutral-950 border-neutral-700 text-amber-500 focus:ring-0"
                        />
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span>Popular</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseRecipeForm}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isCreatingRecipe ? 'Add Recipe to Live Menu' : 'Save Recipe Updates'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
