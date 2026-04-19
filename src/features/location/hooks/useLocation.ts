import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<any>(null);
  const [place, setPlace] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const setAddressFromCoords = async (latitude: number, longitude: number) => {
    const geo = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (geo.length > 0) {
      const g = geo[0];
      setPlace(`${g.district || g.city}, ${g.region}`);
    }
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Permission to access location was denied");
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = current.coords;
      setLocation({ latitude, longitude });
      await setAddressFromCoords(latitude, longitude);

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
        },
        async (loc) => {
          const { latitude, longitude } = loc.coords;

          setLocation({
            latitude,
            longitude,
          });
          await setAddressFromCoords(latitude, longitude);
        },
      );
    })();

    // limpiar el watchPositionAsync cuando el componente se desmonte
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, place, errorMsg: errMsg };
};
