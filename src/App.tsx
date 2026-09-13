/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InsidePizzaGardenReels } from './components/InsidePizzaGardenReels';
import { DealsSection } from './components/DealsSection';
import { MenuSection } from './components/MenuSection';
import { AmbienceGallery } from './components/AmbienceGallery';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { TableReservationModal } from './components/TableReservationModal';
import { StaffPortalModal } from './components/StaffPortalModal';
import { DEALS, MENU_ITEMS } from './data/menuData';
import { CartItem, MenuItem, DealItem, Order, Reservation, OrderStatus } from './types';

export default function App() {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pizzagarden_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with initial sample or persisted
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('pizzagarden_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'ord-init-1',
        orderNumber: 'PG-4819',
        customerName: 'Muhammad Hamza',
        customerPhone: '0329-6864242',
        orderType: 'delivery',
        deliveryAddress: 'Near NFC College, Talagang Road, Chakwal',
        items: [
          {
            id: 'train-pizza-36-sample',
            name: "The Big Boss Train Pizza (36'')",
            price: 3599,
            quantity: 1,
            image: '/assets/images/train_pizza_1789213434117.jpg',
            selectedFlavours: ['Chicken Tikka', 'Mayo Garlic Ranch', 'Super Supreme'],
          },
        ],
        subtotal: 3599,
        deliveryFee: 150,
        discount: 0,
        total: 3749,
        status: 'preparing',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
    ];
  });

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('pizzagarden_reservations');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'res-sample-1',
        name: 'Tariq Mehmood',
        phone: '0300-5544332',
        date: new Date().toISOString().split('T')[0],
        time: '20:00',
        guests: 6,
        seatingArea: 'Circular Booth',
        specialRequests: 'Family gathering dinner',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Menu Items state (supports adding/editing recipes with persistent storage)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('pizzagarden_menu_items');
      if (saved) return JSON.parse(saved);
    } catch {}
    return MENU_ITEMS;
  });

  // Modals visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pizzagarden_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pizzagarden_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync reservations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pizzagarden_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  // Sync menu items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pizzagarden_menu_items', JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Navigation smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    selectedSize?: string,
    customPrice?: number,
    selectedFlavours?: string[]
  ) => {
    const cartItemId = `${item.id}-${selectedSize || 'default'}-${selectedFlavours ? selectedFlavours.sort().join('-') : ''}`;
    const price = customPrice ?? item.price;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          name: item.name,
          price,
          quantity: 1,
          size: selectedSize,
          image: item.image,
          selectedFlavours,
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleAddDealToCart = (deal: DealItem) => {
    const cartItemId = `deal-${deal.id}`;
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          name: deal.title,
          price: deal.price,
          quantity: 1,
          image: deal.image,
          notes: deal.items.join(', '),
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const handleReservationSubmitted = (res: Reservation) => {
    setReservations((prev) => [res, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleOrderFeaturedFromReel = (reelId: string) => {
    if (reelId === 'reel-kitchen' || reelId === 'kitchen-craft') {
      // Find signature pizza or 36 train pizza
      const pizza = MENU_ITEMS.find((m) => m.id === 'p-delight') || MENU_ITEMS[0];
      handleAddToCart(pizza, 'Large', 1850);
    } else {
      // Find zinger burger or deal
      const burger = MENU_ITEMS.find((m) => m.id === 'b-zinger-supreme') || MENU_ITEMS[4];
      handleAddToCart(burger, undefined, 450);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500 selection:text-neutral-950">
      {/* Sticky Top Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenStaff={() => setIsStaffOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOrderNow={() => handleNavigate('menu')}
          onExploreDeals={() => handleNavigate('deals')}
          onWatchReels={() => handleNavigate('reels')}
        />

        {/* Experience Inside PizzaGarden (9:16 Vertical Video Reels) */}
        <InsidePizzaGardenReels
          onOrderFeatured={handleOrderFeaturedFromReel}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Special Deals & 36'' Train Pizza */}
        <DealsSection
          onAddDealToCart={handleAddDealToCart}
        />

        {/* Culinary Menu with Search & Size Selectors */}
        <MenuSection
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
        />

        {/* Dining Ambience & Interior Photos */}
        <AmbienceGallery
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* Footer & Location Guide */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenStaff={() => setIsStaffOpen(true)}
        onViewMenuPoster={() => handleNavigate('menu')}
        onNavigate={handleNavigate}
      />

      {/* Sliding Tray / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Table Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onReservationSubmitted={handleReservationSubmitted}
      />

      {/* Staff & Kitchen Portal Modal */}
      <StaffPortalModal
        isOpen={isStaffOpen}
        onClose={() => setIsStaffOpen(false)}
        orders={orders}
        reservations={reservations}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        menuItems={menuItems}
        onUpdateMenuItem={handleUpdateMenuItem}
        onAddMenuItem={handleAddMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
      />
    </div>
  );
}
