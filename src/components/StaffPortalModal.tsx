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
  AlertCircle,
  Sparkles,
  MapPin,
  RotateCcw,
  Tag
} from 'lucide-react';
import { Order, OrderStatus, Reservation, MenuItem, Category, PizzaSizeOption, DeliverySettings, DEFAULT_DELIVERY_SETTINGS, DealItem } from '../types';
import pizzaDelightImg from '../assets/images/pizza_delight_1789213397214.jpg';
import trainPizzaImg from '../assets/images/train_pizza_1789213434117.jpg';
import behariRollsImg from '../assets/images/spin_rolls_1789213450425.jpg';
import zingerBurgerImg from '../assets/images/zinger_burger_1789213414778.jpg';
import appetizersImg from '../assets/images/reel_behari_cutting_1789223718736.jpg';
import drinksImg from '../assets/images/regenerated_image_1789214564553.png';
import dealFamilyImg from '../assets/images/regenerated_image_1789214547637.png';
import dealMega3Img from '../assets/images/regenerated_image_1789214556946.png';
import dealMega2Img from '../assets/images/regenerated_image_1789214562459.png';

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
  deals?: DealItem[];
  onUpdateDeal?: (deal: DealItem) => void;
  onAddDeal?: (deal: DealItem) => void;
  onDeleteDeal?: (dealId: string) => void;
  deliverySettings?: DeliverySettings;
  onUpdateDeliverySettings?: (settings: DeliverySettings) => void;
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
  { label: 'Special Pizza Delight', url: pizzaDelightImg },
  { label: '36" Train Pizza', url: trainPizzaImg },
  { label: 'Behari Kabab Spin Roll', url: behariRollsImg },
  { label: 'Crispy Zinger Burger', url: zingerBurgerImg },
  { label: 'Appetizer Wings & Fries', url: appetizersImg },
  { label: 'Cold Drink Refreshment', url: drinksImg },
];

const PRESET_DEAL_PICTURES = [
  { label: '36" Train Pizza', url: trainPizzaImg },
  { label: 'Family Feast Combo', url: dealFamilyImg },
  { label: 'Mega Treat Trio', url: dealMega3Img },
  { label: 'Mega Treat Duo', url: dealMega2Img },
  { label: 'Special Pizza Delight', url: pizzaDelightImg },
  { label: 'Behari Kabab Spin Roll', url: behariRollsImg },
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
  deals = [],
  onUpdateDeal,
  onAddDeal,
  onDeleteDeal,
  deliverySettings,
  onUpdateDeliverySettings,
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'recipes' | 'deals' | 'delivery'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Delivery charge & dispatch management state
  const effectiveDelivery = deliverySettings || DEFAULT_DELIVERY_SETTINGS;
  const [deliveryFormData, setDeliveryFormData] = useState<DeliverySettings>(effectiveDelivery);
  const [deliverySavedSuccess, setDeliverySavedSuccess] = useState(false);

  React.useEffect(() => {
    if (deliverySettings) {
      setDeliveryFormData(deliverySettings);
    }
  }, [deliverySettings]);

  const handleSaveDeliverySettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onUpdateDeliverySettings) {
      const sanitized: DeliverySettings = {
        ...deliveryFormData,
        deliveryFee: Math.max(0, Math.round(Number(deliveryFormData.deliveryFee) || 0)),
        minOrderAmount: Math.max(0, Math.round(Number(deliveryFormData.minOrderAmount) || 0)),
        freeDeliveryThreshold: Math.max(0, Math.round(Number(deliveryFormData.freeDeliveryThreshold) || 0)),
        updatedAt: new Date().toISOString(),
      };
      onUpdateDeliverySettings(sanitized);
      setDeliverySavedSuccess(true);
      setTimeout(() => setDeliverySavedSuccess(false), 3500);
    }
  };

  const handleSetQuickDeliveryFee = (fee: number) => {
    const sanitizedFee = Math.max(0, fee);
    const updated: DeliverySettings = {
      ...deliveryFormData,
      deliveryFee: sanitizedFee,
      updatedAt: new Date().toISOString(),
    };
    setDeliveryFormData(updated);
    if (onUpdateDeliverySettings) {
      onUpdateDeliverySettings(updated);
      setDeliverySavedSuccess(true);
      setTimeout(() => setDeliverySavedSuccess(false), 3500);
    }
  };

  // Recipe management states
  const [recipeSearch, setRecipeSearch] = useState('');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<Category | 'all'>('all');
  const [editingRecipe, setEditingRecipe] = useState<MenuItem | null>(null);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);

  // Deals management states
  const [dealSearch, setDealSearch] = useState('');
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);
  const [isCreatingDeal, setIsCreatingDeal] = useState(false);
  const [dealFormError, setDealFormError] = useState<string | null>(null);
  const dealFileInputRef = useRef<HTMLInputElement>(null);

  // Form state for Add/Edit Deal
  const [dealFormData, setDealFormData] = useState<{
    id: string;
    title: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    itemsText: string;
    image: string;
    badge: string;
    serves: string;
    description: string;
  }>({
    id: '',
    title: '',
    subtitle: '',
    price: 1999,
    originalPrice: 2499,
    itemsText: '1 Large Handcrafted Pizza (Any Flavour)\n4 Pcs Chicken Wings\n1 Litre Chilled Cold Drink',
    image: trainPizzaImg,
    badge: 'HOT DEAL',
    serves: '3 - 4 Persons',
    description: '',
  });

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
    image: pizzaDelightImg,
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
      image: item.image || pizzaDelightImg,
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
      image: pizzaDelightImg,
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
      image: formData.image || pizzaDelightImg,
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

  // Deal handlers
  const handleOpenNewDeal = () => {
    setIsCreatingDeal(true);
    setEditingDeal(null);
    setDealFormData({
      id: '',
      title: '',
      subtitle: '',
      price: 1999,
      originalPrice: 2499,
      itemsText: '1 Large Handcrafted Pizza (Any Flavour)\n4 Pcs Chicken Wings\n1 Litre Chilled Cold Drink',
      image: trainPizzaImg,
      badge: 'HOT DEAL',
      serves: '3 - 4 Persons',
      description: '',
    });
    setDealFormError(null);
  };

  const handleOpenEditDeal = (deal: DealItem) => {
    setIsCreatingDeal(false);
    setEditingDeal(deal);
    setDealFormData({
      id: deal.id,
      title: deal.title,
      subtitle: deal.subtitle || '',
      price: deal.price,
      originalPrice: deal.originalPrice || Math.round(deal.price * 1.2),
      itemsText: deal.items ? deal.items.join('\n') : '',
      image: deal.image || trainPizzaImg,
      badge: deal.badge || '',
      serves: deal.serves || '',
      description: deal.description || '',
    });
    setDealFormError(null);
  };

  const handleCloseDealForm = () => {
    setIsCreatingDeal(false);
    setEditingDeal(null);
    setDealFormError(null);
  };

  const handleDealImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setDealFormError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDealFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
        setDealFormError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDealDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setDealFormError('Please drop an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDealFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
        setDealFormError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealFormData.title.trim()) {
      setDealFormError('Deal title is required.');
      return;
    }
    if (dealFormData.price <= 0) {
      setDealFormError('Please enter a valid deal price greater than 0.');
      return;
    }

    // Split items by newline
    const itemsList = dealFormData.itemsText
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const updatedOrNewDeal: DealItem = {
      id: dealFormData.id || 'deal-' + Date.now(),
      title: dealFormData.title.trim(),
      subtitle: dealFormData.subtitle.trim() || undefined,
      price: Math.max(0, Math.round(Number(dealFormData.price))),
      originalPrice: dealFormData.originalPrice > 0 ? Math.max(0, Math.round(Number(dealFormData.originalPrice))) : undefined,
      items: itemsList.length > 0 ? itemsList : ['1 Handcrafted Pizza', 'Chilled Drink'],
      image: dealFormData.image || trainPizzaImg,
      badge: dealFormData.badge.trim() || undefined,
      serves: dealFormData.serves.trim() || undefined,
      description: dealFormData.description.trim() || undefined,
    };

    if (isCreatingDeal) {
      if (onAddDeal) {
        onAddDeal(updatedOrNewDeal);
      }
    } else {
      if (onUpdateDeal) {
        onUpdateDeal(updatedOrNewDeal);
      }
    }

    handleCloseDealForm();
  };

  const handleDeleteDealPrompt = (dealId: string, dealTitle: string) => {
    if (window.confirm(`Are you sure you want to remove deal "${dealTitle}" from PizzaGarden live deals?`)) {
      if (onDeleteDeal) {
        onDeleteDeal(dealId);
      }
    }
  };

  // Filter deals
  const filteredDeals = deals.filter((deal) => {
    if (!dealSearch.trim()) return true;
    const q = dealSearch.toLowerCase();
    const titleMatch = deal.title.toLowerCase().includes(q);
    const subtitleMatch = deal.subtitle?.toLowerCase().includes(q) ?? false;
    const descMatch = deal.description?.toLowerCase().includes(q) ?? false;
    const badgeMatch = deal.badge?.toLowerCase().includes(q) ?? false;
    const itemsMatch = deal.items ? deal.items.some((it) => it.toLowerCase().includes(q)) : false;
    return titleMatch || subtitleMatch || descMatch || badgeMatch || itemsMatch;
  });

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

                <button
                  onClick={() => setActiveTab('deals')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'deals'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Deals &amp; Combos ({deals.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'delivery'
                      ? 'bg-amber-500 text-neutral-950 shadow'
                      : 'bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery Charges (Rs. {deliveryFormData.deliveryFee})</span>
                  {!deliveryFormData.isDeliveryActive && (
                    <span className="w-2 h-2 rounded-full bg-red-400" title="Delivery Paused"></span>
                  )}
                </button>
              </div>

              {activeTab === 'orders' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs border border-neutral-800 transition-colors"
                    title="Click to edit delivery charges"
                  >
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Delivery Fee: <strong className="text-white">Rs. {deliveryFormData.deliveryFee}</strong></span>
                    <span className="text-[10px] text-amber-400 font-bold ml-1 bg-amber-500/10 px-1.5 py-0.5 rounded">Edit</span>
                  </button>

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

              {activeTab === 'deals' && (
                <button
                  onClick={handleOpenNewDeal}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Upload / Add New Deal</span>
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
                            <div className="mt-2 pt-2 border-t border-neutral-800 space-y-1">
                              {order.orderType === 'delivery' && (
                                <>
                                  <div className="flex justify-between text-[11px] text-neutral-400">
                                    <span>Subtotal:</span>
                                    <span>Rs. {order.subtotal}</span>
                                  </div>
                                  <div className="flex justify-between text-[11px] text-neutral-400">
                                    <span className="flex items-center gap-1">
                                      <Truck className="w-3 h-3 text-amber-400" />
                                      <span>Delivery Fee:</span>
                                    </span>
                                    <span className={order.deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-neutral-300'}>
                                      {order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee}`}
                                    </span>
                                  </div>
                                </>
                              )}
                              <div className="flex justify-between font-black text-amber-400 pt-1 border-t border-neutral-800/80">
                                <span>Total:</span>
                                <span>Rs. {order.total}</span>
                              </div>
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

              {/* TAB 4: DELIVERY CHARGES & DISPATCH SETTINGS */}
              {activeTab === 'delivery' && (
                <div className="space-y-6 max-w-4xl mx-auto py-2">
                  {/* Top Notification Toast upon saving */}
                  {deliverySavedSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-white">Delivery Charges Updated Successfully!</p>
                          <p className="text-xs text-emerald-300/90">
                            New customer orders in Chakwal will now apply <strong>Rs. {deliveryFormData.deliveryFee}</strong> delivery fee.
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-emerald-300">
                        Live in App
                      </span>
                    </div>
                  )}

                  {/* Header Banner */}
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                          Chakwal Delivery Price &amp; Dispatch Manager
                        </h4>
                        <p className="text-xs text-neutral-400">
                          Edit delivery charges, toggle live delivery availability, set free delivery promos, and adjust rush-hour ETAs.
                        </p>
                      </div>
                    </div>

                    {/* Delivery Service Online / Paused Switch */}
                    <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...deliveryFormData, isDeliveryActive: true };
                          setDeliveryFormData(updated);
                          if (onUpdateDeliverySettings) onUpdateDeliverySettings(updated);
                          setDeliverySavedSuccess(true);
                          setTimeout(() => setDeliverySavedSuccess(false), 3000);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          deliveryFormData.isDeliveryActive
                            ? 'bg-emerald-600 text-white shadow'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                        <span>Deliveries Active</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...deliveryFormData, isDeliveryActive: false };
                          setDeliveryFormData(updated);
                          if (onUpdateDeliverySettings) onUpdateDeliverySettings(updated);
                          setDeliverySavedSuccess(true);
                          setTimeout(() => setDeliverySavedSuccess(false), 3000);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          !deliveryFormData.isDeliveryActive
                            ? 'bg-red-600 text-white shadow'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-red-300"></span>
                        <span>Pause Delivery</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* LEFT COLUMN: Main Delivery Fee Editor (7 cols) */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Price Control Card */}
                      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                          <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span>Standard Delivery Charge</span>
                            <span className="text-[11px] font-normal text-amber-400 lowercase">(in PKR)</span>
                          </label>
                          <span className="text-[11px] text-neutral-400">
                            Current Rate: <strong className="text-white font-mono">Rs. {deliveryFormData.deliveryFee}</strong>
                          </span>
                        </div>

                        {/* Huge Numeric Input & Steppers */}
                        <div className="flex items-center gap-3">
                          <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-neutral-500 text-lg">
                              Rs.
                            </span>
                            <input
                              type="number"
                              min={0}
                              max={2000}
                              step={10}
                              value={deliveryFormData.deliveryFee}
                              onChange={(e) => {
                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                setDeliveryFormData({ ...deliveryFormData, deliveryFee: val });
                              }}
                              className="w-full pl-14 pr-4 py-3 rounded-2xl bg-neutral-900 border-2 border-neutral-800 text-white text-2xl font-black font-mono focus:outline-none focus:border-amber-500 transition-colors"
                            />
                          </div>

                          {/* Quick Adjust Steppers */}
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const newFee = Math.max(0, Number(deliveryFormData.deliveryFee) - 50);
                                setDeliveryFormData({ ...deliveryFormData, deliveryFee: newFee });
                              }}
                              className="px-2.5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-xs font-bold hover:text-white"
                              title="Decrease by Rs. 50"
                            >
                              -50
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newFee = Math.max(0, Number(deliveryFormData.deliveryFee) - 10);
                                setDeliveryFormData({ ...deliveryFormData, deliveryFee: newFee });
                              }}
                              className="px-2.5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-xs font-bold hover:text-white"
                              title="Decrease by Rs. 10"
                            >
                              -10
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newFee = Number(deliveryFormData.deliveryFee) + 10;
                                setDeliveryFormData({ ...deliveryFormData, deliveryFee: newFee });
                              }}
                              className="px-2.5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-xs font-bold hover:text-white"
                              title="Increase by Rs. 10"
                            >
                              +10
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newFee = Number(deliveryFormData.deliveryFee) + 50;
                                setDeliveryFormData({ ...deliveryFormData, deliveryFee: newFee });
                              }}
                              className="px-2.5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-mono text-xs font-bold hover:text-white"
                              title="Increase by Rs. 50"
                            >
                              +50
                            </button>
                          </div>
                        </div>

                        {/* Quick 1-Tap Preset Pills */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[11px] text-neutral-400 font-semibold block">
                            Quick 1-Tap Presets (Click to instant apply):
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {[
                              { label: 'Free (Rs. 0)', fee: 0, tag: 'Promo' },
                              { label: 'Rs. 50', fee: 50, tag: 'Discount' },
                              { label: 'Rs. 100', fee: 100, tag: 'Standard' },
                              { label: 'Rs. 150', fee: 150, tag: 'Suburbs' },
                              { label: 'Rs. 200', fee: 200, tag: 'Outskirts' },
                              { label: 'Rs. 250', fee: 250, tag: 'Highway' },
                            ].map((preset) => (
                              <button
                                key={preset.fee}
                                type="button"
                                onClick={() => handleSetQuickDeliveryFee(preset.fee)}
                                className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                                  Number(deliveryFormData.deliveryFee) === preset.fee
                                    ? 'bg-amber-500 text-neutral-950 font-black border-amber-400 shadow-md scale-[1.02]'
                                    : 'bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border-neutral-800'
                                }`}
                              >
                                <span className="block text-xs font-bold">{preset.label}</span>
                                <span className={`block text-[10px] mt-0.5 ${
                                  Number(deliveryFormData.deliveryFee) === preset.fee ? 'text-neutral-900/80 font-semibold' : 'text-neutral-500'
                                }`}>
                                  {preset.tag}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="text-[11px] text-neutral-400 leading-relaxed bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/80">
                          💡 <strong>Instant Sync:</strong> Updating this delivery fee immediately adjusts the cart billing calculations in real-time, displays the new price to customers in the sliding cart drawer, and formats the WhatsApp order receipt.
                        </p>
                      </div>

                      {/* Dispatch & Delivery Timings */}
                      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                          <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Estimated Delivery Time (ETA)</span>
                          </label>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={deliveryFormData.estimatedTime}
                            onChange={(e) => setDeliveryFormData({ ...deliveryFormData, estimatedTime: e.target.value })}
                            placeholder="e.g. 30 - 45 mins"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-medium focus:outline-none focus:border-amber-500"
                          />
                          <div className="flex flex-wrap gap-2 pt-1">
                            {['25 - 35 mins (Fast)', '30 - 45 mins (Normal)', '45 - 60 mins (Peak Rush)', '60+ mins (Rain)'].map((eta) => (
                              <button
                                key={eta}
                                type="button"
                                onClick={() => setDeliveryFormData({ ...deliveryFormData, estimatedTime: eta })}
                                className={`px-2.5 py-1 rounded-lg text-[11px] border transition-colors ${
                                  deliveryFormData.estimatedTime === eta
                                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {eta}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Promotion & Live Simulator (5 cols) */}
                    <div className="lg:col-span-5 space-y-5">
                      {/* Free Delivery Promotion Setting */}
                      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                          <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Free Delivery Promotion</span>
                          </label>
                          <span className="text-[11px] text-amber-400 font-semibold">
                            {Number(deliveryFormData.freeDeliveryThreshold) > 0 ? `Above Rs. ${deliveryFormData.freeDeliveryThreshold}` : 'Disabled'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] text-neutral-400 block">
                            Free delivery threshold in PKR (Set 0 to disable promo):
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-neutral-500 text-xs">
                              Rs.
                            </span>
                            <input
                              type="number"
                              min={0}
                              step={100}
                              value={deliveryFormData.freeDeliveryThreshold || 0}
                              onChange={(e) => {
                                const val = Math.max(0, parseInt(e.target.value) || 0);
                                setDeliveryFormData({ ...deliveryFormData, freeDeliveryThreshold: val });
                              }}
                              className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div className="flex gap-1.5 pt-1">
                            {[
                              { label: 'Off (0)', val: 0 },
                              { label: 'Rs. 1,500', val: 1500 },
                              { label: 'Rs. 2,000', val: 2000 },
                              { label: 'Rs. 2,500', val: 2500 },
                            ].map((opt) => (
                              <button
                                key={opt.val}
                                type="button"
                                onClick={() => setDeliveryFormData({ ...deliveryFormData, freeDeliveryThreshold: opt.val })}
                                className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
                                  (deliveryFormData.freeDeliveryThreshold || 0) === opt.val
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Coverage Locality & Rider Notes */}
                      <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>Delivery Coverage Localities</span>
                        </label>
                        <textarea
                          rows={2}
                          value={deliveryFormData.deliveryNotes || ''}
                          onChange={(e) => setDeliveryFormData({ ...deliveryFormData, deliveryNotes: e.target.value })}
                          placeholder="e.g. Chakwal City, Talagang Road, NFC, Pinwal & Surroundings"
                          className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>

                      {/* Live Customer Preview Simulator */}
                      <div className="p-4 rounded-2xl bg-neutral-900/80 border border-amber-500/20 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <span>Customer Cart Live Simulation</span>
                          </span>
                          <span className="text-[10px] text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded-full border border-neutral-800">
                            Live Bill Preview
                          </span>
                        </div>

                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 text-xs">
                          <div className="flex justify-between text-neutral-400 text-[11px]">
                            <span>Sample Order Subtotal (2 items)</span>
                            <span>Rs. 1,450</span>
                          </div>
                          <div className="flex justify-between text-neutral-300 text-xs font-medium">
                            <span className="flex items-center gap-1">
                              <Truck className="w-3 h-3 text-amber-400" />
                              <span>Chakwal City Delivery</span>
                            </span>
                            {Number(deliveryFormData.deliveryFee) === 0 ? (
                              <span className="font-bold text-emerald-400">FREE</span>
                            ) : (
                              <span className="font-bold text-white font-mono">Rs. {deliveryFormData.deliveryFee}</span>
                            )}
                          </div>
                          <div className="flex justify-between text-white font-black text-xs pt-1.5 border-t border-neutral-800">
                            <span>Customer Total</span>
                            <span className="text-amber-400 font-mono">
                              Rs. {1450 + Number(deliveryFormData.deliveryFee)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save & Reset Bottom Controls */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const def = DEFAULT_DELIVERY_SETTINGS;
                        setDeliveryFormData(def);
                        if (onUpdateDeliverySettings) onUpdateDeliverySettings(def);
                        setDeliverySavedSuccess(true);
                        setTimeout(() => setDeliverySavedSuccess(false), 3000);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-neutral-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults (Rs. 100)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSaveDeliverySettings()}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Save &amp; Apply Delivery Charges (Rs. {deliveryFormData.deliveryFee})</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: DEALS & COMBOS MANAGEMENT */}
              {activeTab === 'deals' && (
                <div className="space-y-4">
                  {/* Deals Search Bar and Summary Header */}
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search deals by title, items, badge, or description..."
                        value={dealSearch}
                        onChange={(e) => setDealSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                      />
                      {dealSearch && (
                        <button
                          onClick={() => setDealSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs text-neutral-400 px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 whitespace-nowrap">
                        Showing <span className="text-amber-400 font-bold">{filteredDeals.length}</span> of {deals.length} deals
                      </div>

                      <button
                        onClick={handleOpenNewDeal}
                        className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Upload Deal</span>
                      </button>
                    </div>
                  </div>

                  {/* Deals Grid View */}
                  {filteredDeals.length === 0 ? (
                    <div className="text-center py-16 text-neutral-500 text-xs bg-neutral-950/40 rounded-2xl border border-neutral-800/60 p-8">
                      <Tag className="w-8 h-8 text-neutral-600 mx-auto mb-2 opacity-60" />
                      <p className="font-semibold text-neutral-400">No deals match your search.</p>
                      <p className="text-[11px] text-neutral-500 mt-1">Try a different keyword or upload a new deal.</p>
                      <button
                        onClick={handleOpenNewDeal}
                        className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Upload New Deal</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDeals.map((deal) => (
                        <div
                          key={deal.id}
                          className="group relative flex flex-col p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0">
                              <img
                                src={deal.image}
                                alt={deal.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {deal.badge && (
                                <span className="absolute top-1 left-1 bg-amber-500 text-neutral-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                                  {deal.badge}
                                </span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-bold text-white truncate">
                                  {deal.title}
                                </h4>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => handleOpenEditDeal(deal)}
                                    className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                                    title="Edit Deal"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDealPrompt(deal.id, deal.title)}
                                    className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                                    title="Delete Deal"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {deal.subtitle && (
                                <p className="text-[11px] text-amber-300/80 line-clamp-1 mt-0.5">
                                  {deal.subtitle}
                                </p>
                              )}

                              {deal.serves && (
                                <div className="inline-flex items-center gap-1 text-[10px] text-neutral-400 mt-1 bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800/80">
                                  <span>Serves:</span>
                                  <strong className="text-neutral-200">{deal.serves}</strong>
                                </div>
                              )}

                              <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-base font-black text-amber-400 font-mono">
                                  Rs. {deal.price}
                                </span>
                                {deal.originalPrice && deal.originalPrice > deal.price && (
                                  <span className="text-xs line-through text-neutral-500 font-mono">
                                    Rs. {deal.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Deal items listing */}
                          {deal.items && deal.items.length > 0 && (
                            <div className="pt-2 border-t border-neutral-800/60">
                              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                                Included in this deal:
                              </span>
                              <ul className="space-y-1">
                                {deal.items.map((it, idx) => (
                                  <li key={idx} className="text-[11px] text-neutral-300 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                                    <span className="truncate">{it}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {deal.description && (
                            <p className="text-[11px] text-neutral-400 italic line-clamp-2 pt-1 border-t border-neutral-900">
                              "{deal.description}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: ADD / EDIT DEAL OVERLAY */}
        {(editingDeal || isCreatingDeal) && (
          <div className="absolute inset-0 z-20 bg-neutral-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
            <div className="max-w-2xl w-full mx-auto space-y-5 my-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    {isCreatingDeal ? <Plus className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isCreatingDeal ? 'Upload New Deal / Combo' : 'Edit Deal Details'}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Changes immediately reflect on the live PizzaGarden deals showcase.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseDealForm}
                  className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Error Message */}
              {dealFormError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{dealFormError}</span>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSaveDeal} className="space-y-4 text-xs">
                {/* Title and Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Deal Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mega Weekend Feast Combo"
                      value={dealFormData.title}
                      onChange={(e) => setDealFormData({ ...dealFormData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Large Pizza + Wings + 1.5L Drink"
                      value={dealFormData.subtitle}
                      onChange={(e) => setDealFormData({ ...dealFormData, subtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Price and Original Price */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Deal Price (Rs.) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={dealFormData.price}
                      onChange={(e) => setDealFormData({ ...dealFormData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Original / Strike Price (Rs.)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 2500"
                      value={dealFormData.originalPrice || ''}
                      onChange={(e) => setDealFormData({ ...dealFormData, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Serves / Capacity
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3 - 4 Persons"
                      value={dealFormData.serves}
                      onChange={(e) => setDealFormData({ ...dealFormData, serves: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Deal Items (One per line) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-neutral-300 font-semibold block">
                      Items Included in Deal (Write one item per line)
                    </label>
                    <span className="text-[10px] text-neutral-500">Each line will become a bullet item</span>
                  </div>
                  <textarea
                    rows={4}
                    placeholder={`1 Extra Large Handcrafted Pizza\n5 Pcs Crispy Hot Wings\nLoaded Melted Fries\n1 Litre Chilled Cold Drink`}
                    value={dealFormData.itemsText}
                    onChange={(e) => setDealFormData({ ...dealFormData, itemsText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-mono text-xs leading-relaxed"
                  />
                </div>

                {/* Deal Image Upload and Preview */}
                <div className="space-y-2 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <label className="text-neutral-300 font-semibold block">
                    Deal Photo / Banner Image
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0 relative flex items-center justify-center">
                      {dealFormData.image ? (
                        <img
                          src={dealFormData.image}
                          alt="Deal Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-neutral-600" />
                      )}
                    </div>

                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDealDropImage}
                      className="flex-1 w-full p-3 rounded-xl border-2 border-dashed border-neutral-800 hover:border-amber-500/50 transition-colors flex flex-col items-center justify-center text-center gap-1 cursor-pointer bg-neutral-900/40"
                      onClick={() => dealFileInputRef.current?.click()}
                    >
                      <Upload className="w-5 h-5 text-amber-400" />
                      <span className="text-xs text-neutral-300 font-medium">
                        Click or drag &amp; drop deal banner photo here
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        PNG, JPG, WebP supported. Replaces image immediately.
                      </span>
                      <input
                        ref={dealFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleDealImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Preset quick photos for Deals */}
                  <div className="pt-2 border-t border-neutral-800/80">
                    <span className="text-[10px] text-neutral-400 block mb-1.5">
                      Or pick from existing PizzaGarden deal photos:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_DEAL_PICTURES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setDealFormData({ ...dealFormData, image: preset.url })}
                          className={`px-2 py-1 rounded-md text-[10px] font-medium border transition-colors ${
                            dealFormData.image === preset.url
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

                {/* Badge and Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Badge / Tag (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SPECIAL OFFER, FAMILY COMBO, 30% OFF"
                      value={dealFormData.badge}
                      onChange={(e) => setDealFormData({ ...dealFormData, badge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">
                      Description Note (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Short summary for customer cart and deals view..."
                      value={dealFormData.description}
                      onChange={(e) => setDealFormData({ ...dealFormData, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseDealForm}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isCreatingDeal ? 'Publish Deal to Website' : 'Save Deal Changes'}</span>
                  </button>
                </div>
              </form>
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
