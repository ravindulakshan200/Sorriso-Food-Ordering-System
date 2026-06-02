"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, MenuItem, ItemSize } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, size?: ItemSize) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function resolvePrice(item: MenuItem, size?: ItemSize): number {
  if (!item.has_sizes || !size) return item.price;
  if (size === "Medium") return item.price_medium ?? item.price;
  if (size === "Large") return item.price_large ?? item.price;
  return item.price;
}

function makeCartItemId(item: MenuItem, size?: ItemSize): string {
  return item.has_sizes && size ? `${item.id}-${size}` : item.id;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addToCart = (item: MenuItem, size?: ItemSize) => {
    const cartItemId = makeCartItemId(item, size);
    const sizePrice = resolvePrice(item, size);

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        cartItemId,
        selectedSize: size,
        sizePrice,
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) =>
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce(
    (total, item) => total + (item.sizePrice ?? item.price) * item.quantity,
    0
  );
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
