import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';
import { CartItem, OrderType, Order } from '../types';
import { PIZZAGARDEN_CONTACT } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? PIZZAGARDEN_CONTACT.deliveryFeeDefault : 0;
  const total = subtotal + deliveryFee;

  const formatWhatsAppMessage = () => {
    let msg = `*🍕 PIZZAGARDEN CHAKWAL - NEW ORDER*\n`;
    msg += `-------------------------------------\n`;
    msg += `*Order Type:* ${orderType.toUpperCase()}\n`;
    msg += `*Customer:* ${customerName || 'Customer'}\n`;
    msg += `*Phone:* ${customerPhone || 'N/A'}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery Address:* ${deliveryAddress || 'Chakwal'}\n`;
    } else if (orderType === 'dine-in') {
      msg += `*Table Number:* ${tableNumber || 'Inside Hall'}\n`;
    }
    msg += `-------------------------------------\n`;
    msg += `*ORDER ITEMS:*\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* ${item.size ? `(${item.size})` : ''} x ${item.quantity} = Rs. ${item.price * item.quantity}\n`;
      if (item.selectedFlavours && item.selectedFlavours.length > 0) {
        msg += `   _Flavours: ${item.selectedFlavours.join(', ')}_\n`;
      }
      if (item.notes) {
        msg += `   _Note: ${item.notes}_\n`;
      }
    });

    msg += `-------------------------------------\n`;
    msg += `*Subtotal:* Rs. ${subtotal}\n`;
    if (orderType === 'delivery') {
      msg += `*Delivery Fee:* Rs. ${deliveryFee}\n`;
    }
    msg += `*TOTAL PAYABLE:* Rs. ${total}\n`;
    if (orderNotes) {
      msg += `*Special Instructions:* ${orderNotes}\n`;
    }
    msg += `-------------------------------------\n`;
    msg += `Please confirm my order and approximate preparation time. Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    if (!customerName || !customerPhone) {
      alert('Please enter your name and phone number before sending order.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress) {
      alert('Please provide your delivery address in Chakwal.');
      return;
    }

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'PG-' + Math.floor(1000 + Math.random() * 9000),
      customerName,
      customerPhone,
      orderType,
      deliveryAddress,
      tableNumber,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      status: 'received',
      createdAt: new Date().toISOString(),
      notes: orderNotes,
    };

    // Post to local storage and trigger callback
    onOrderPlaced(newOrder);

    // Open WhatsApp
    const url = `https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}?text=${formatWhatsAppMessage()}`;
    window.open(url, '_blank');
    setOrderSuccess(newOrder);
    onClearCart();
  };

  const handleOnlineOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName || !customerPhone) {
      alert('Please provide your name and phone number.');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress) {
      alert('Please provide your delivery address in Chakwal.');
      return;
    }

    setIsSubmitting(true);
    const orderData: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'PG-' + Math.floor(1000 + Math.random() * 9000),
      customerName,
      customerPhone,
      orderType,
      deliveryAddress,
      tableNumber,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      status: 'received',
      createdAt: new Date().toISOString(),
      notes: orderNotes,
    };

    try {
      // Save locally and also ping local server endpoint
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      }).catch(() => {
        // Safe fallback if offline/mock
      });

      onOrderPlaced(orderData);
      setOrderSuccess(orderData);
      onClearCart();
    } catch (err) {
      console.error(err);
      onOrderPlaced(orderData);
      setOrderSuccess(orderData);
      onClearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/80 backdrop-blur-sm flex justify-end">
      <div className="relative w-full max-w-lg bg-neutral-900 h-full flex flex-col shadow-2xl border-l border-neutral-800">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
              Your Order Tray
            </h3>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-semibold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {orderSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                Order Confirmed!
              </h4>
              <p className="text-sm text-neutral-300 max-w-sm mx-auto">
                Thank you, <strong className="text-white">{orderSuccess.customerName}</strong>. 
                Your order <strong className="text-amber-400">{orderSuccess.orderNumber}</strong> has been received by our Chakwal kitchen.
              </p>
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2 max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Total:</span>
                  <span className="font-bold text-amber-400">Rs. {orderSuccess.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Type:</span>
                  <span className="font-semibold text-white capitalize">{orderSuccess.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Status:</span>
                  <span className="font-semibold text-emerald-400">Kitchen Preparing</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${PIZZAGARDEN_CONTACT.whatsappRaw}?text=${encodeURIComponent(`Hello PizzaGarden! Following up on order ${orderSuccess.orderNumber}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat With PizzaGarden on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    onClose();
                  }}
                  className="py-2.5 text-xs text-neutral-400 hover:text-white"
                >
                  Close Tray &amp; Return to Menu
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
              <h4 className="text-base font-bold text-white">Your tray is currently empty</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Explore our special deals, 36-inch Train Pizza, or handcrafted crusts to add your favorites!
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-bold"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Toggle */}
              <div className="grid grid-cols-3 gap-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    orderType === 'delivery'
                      ? 'bg-amber-500 text-neutral-950 shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    orderType === 'takeaway'
                      ? 'bg-amber-500 text-neutral-950 shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Takeaway</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    orderType === 'dine-in'
                      ? 'bg-amber-500 text-neutral-950 shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <UtensilsCrossed className="w-3 h-3" />
                  <span>Dine-In</span>
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                        {item.size && (
                          <span className="font-semibold text-amber-400">{item.size}</span>
                        )}
                        <span>Rs. {item.price} each</span>
                      </div>
                      {item.selectedFlavours && (
                        <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                          Flavours: {item.selectedFlavours.join(', ')}
                        </p>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 bg-neutral-900 rounded-lg border border-neutral-800 p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 rounded text-neutral-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 rounded text-neutral-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Customer Details Form */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Delivery &amp; Customer Information:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0329-XXXXXXX"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                      Delivery Address in Chakwal *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House/Shop #, Street, Mohallah, Chakwal"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {orderType === 'dine-in' && (
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                      Table Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4 / Palm Booth"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                    Special Notes
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Extra napkins, less spicy sauce, etc."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Billing & Actions */}
        {!orderSuccess && cart.length > 0 && (
          <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">Rs. {subtotal}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-neutral-400">
                  <span>Chakwal City Delivery</span>
                  <span className="font-semibold text-white">Rs. {deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-neutral-800">
                <span>Total Amount</span>
                <span className="text-xl text-amber-400 font-black">Rs. {total}</span>
              </div>
            </div>

            {/* Send Order via WhatsApp */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Phone className="w-4 h-4" />
              <span>Send Order via WhatsApp (+92 329 6864242)</span>
            </button>
            <p className="text-[11px] text-center text-neutral-400">
              ⚡ Instant receipt &amp; kitchen notification sent directly to PizzaGarden Chakwal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
