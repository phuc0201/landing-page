import React, { createContext, useCallback, useState } from "react";

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  thumbnailUrl?: string;
  summary?: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "wishlist_items";

const loadFromStorage = (): WishlistItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: WishlistItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage quota exceeded or unavailable — fail silently
  }
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => loadFromStorage());

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev;
      const next = [...prev, item];
      saveToStorage(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      const next = exists ? prev.filter((i) => i.id !== item.id) : [...prev, item];
      saveToStorage(next);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (id: number) => {
      return items.some((i) => i.id === id);
    },
    [items],
  );

  const clear = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clear,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextValue => {
  const ctx = React.useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
};

export default WishlistProvider;
