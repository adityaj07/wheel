import {useState, useEffect} from "react";
import {api} from "@/api";
import {toast} from "sonner-native";
import {Vehicle} from "@/types/vehicle";
import {useTheme} from "@/contexts/ThemeContext";

interface UseVehiclesProps {
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}

const useVehicles = ({
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
}: UseVehiclesProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {theme} = useTheme();

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post("/vehicles/search", {
          startDate: pickupDate,
          endDate: dropoffDate,
          startTime: pickupTime,
          endTime: dropoffTime,
        });

        const fetchedVehicles: Vehicle[] = response.data.data;
        setVehicles(fetchedVehicles);
      } catch (err) {
        console.error("Error fetching vehicles: ", err);
        setError("Failed to fetch vehicles.");
        toast.error("Some error occurred", {
          description: "Couldn't fetch the vehicles",
          style: {backgroundColor: theme.error},
        });
      } finally {
        setLoading(false);
      }
    };

    if (pickupDate && pickupTime && dropoffDate && dropoffTime) {
      fetchVehicles();
    } else {
      toast.info("Fill in all details", {
        description:
          "Couldn't fetch the vehicles, please fill in all the details",
      });
    }
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime, theme.error]);

  return {vehicles, loading, error};
};

export default useVehicles;
