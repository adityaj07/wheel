import {api} from "@/api";
import {GetUserBookingsResponse} from "@/types/user";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {toast} from "sonner-native";
import {useAuth} from "./AuthContext";

type Booking = GetUserBookingsResponse["data"][0];

interface Filters {
  status: string | null;
  startDate: string | null;
  endDate: string | null;
}

interface BookingsContextType {
  allBookings: Booking[];
  filteredBookings: Booking[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  setFilters: (updates: Partial<Filters>) => void;
  fetchNextPage: () => Promise<void>;
  hasMore: boolean;
  refreshBookings: () => Promise<void>;
}

const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined,
);

export const BookingsProvider = ({children}: {children: ReactNode}) => {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFiltersState] = useState<Filters>({
    status: null,
    startDate: null,
    endDate: null,
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {isAuthenticated, isLoading} = useAuth();

  const setFilters = (updates: Partial<Filters>) => {
    setFiltersState(prev => ({...prev, ...updates}));
  };

  const fetchBookings = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.get("/users/bookings", {
        params: {page: pageNum, limit: 10},
      });
      const newBookings: Booking[] = res.data.data;

      setAllBookings(prev =>
        pageNum === 1 ? newBookings : [...prev, ...newBookings],
      );
      setHasMore(newBookings.length > 0);
    } catch (err: any) {
      toast.error("Failed to fetch bookings");
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = async () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    await fetchBookings(nextPage);
    setPage(nextPage);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchBookings(1);
    }
  }, [isAuthenticated, isLoading]);

  const refreshBookings = async () => {
    setPage(1);
    await fetchBookings(1);
  };

  // filtering logic
  const filteredBookings = allBookings.filter(b => {
    if (filters.status && b.status !== filters.status) return false;
    if (filters.startDate && b.startDate < filters.startDate) return false;
    if (filters.endDate && b.endDate > filters.endDate) return false;
    return true;
  });

  return (
    <BookingsContext.Provider
      value={{
        allBookings,
        filteredBookings,
        loading,
        error,
        filters,
        setFilters,
        fetchNextPage,
        hasMore,
        refreshBookings,
      }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used inside BookingsProvider");
  return ctx;
};
