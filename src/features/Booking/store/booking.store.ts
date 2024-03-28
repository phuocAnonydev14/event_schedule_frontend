import { create } from 'zustand';

import { IRenter } from '../../../types/booking';

interface IBookingStore {
  bookingCart: IRenter[];
  actions: {
    setBookingCart: (itemBooking: IRenter, isRemove?: boolean) => void;
    setInitBookingCart: (initBookingCart: IRenter[]) => void;
    resetBookingCart: () => void;
  };
}

const useBookingStore = create<IBookingStore>((set) => ({
  bookingCart: [],
  actions: {
    setInitBookingCart: (initBookingCart) =>
      set(() => ({ bookingCart: initBookingCart })),
    setBookingCart: (itemBooking, isRemove) =>
      set(({ bookingCart }) => {
        if (isRemove) {
          const newBookingCart = bookingCart.filter(
            (cartItem) => cartItem.renter !== itemBooking.renter,
          );
          return {
            bookingCart: newBookingCart,
          };
        }

        const isIndex = bookingCart.findIndex(
          (bookingItem) => bookingItem.renter === itemBooking.renter,
        );

        if (isIndex === -1)
          return {
            bookingCart: [...bookingCart, itemBooking],
          };

        return {
          bookingCart: bookingCart.map((bookingItem) => {
            if (bookingItem.renter !== itemBooking.renter) return bookingItem;
            return itemBooking;
          }),
        };
      }),
    resetBookingCart: () => set(() => ({ bookingCart: [] })),
  },
}));

export const useBookingCart = () =>
  useBookingStore((state) => state.bookingCart);

export const useTotalBill = () =>
  useBookingStore((state) => {
    return state.bookingCart.reduce((prevValue, curValue) => {
      return prevValue + curValue.quantity * curValue.price;
    }, 0);
  });

/**
 * Export action
 */
export const useBookingStoreActions = () =>
  useBookingStore((state) => state.actions);
