// useGeolocation hook pro detekci polohy uživatele
import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Kontrola podpory geolokace v prohlížeči
    setIsSupported("geolocation" in navigator);
  }, []);

  const getCurrentPosition = () => {
    if (!isSupported) {
      setError("Geolokace není podporována ve vašem prohlížeči");
      return Promise.reject(new Error("Geolocation not supported"));
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 sekund timeout
        maximumAge: 300000, // Cache na 5 minut
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          setLocation(coords);
          setLoading(false);
          resolve(coords);
        },
        (error) => {
          setLoading(false);
          let errorMessage = "Nepodařilo se získat vaši polohu";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Přístup k poloze byl zamítnut. Povolit v nastavení prohlížeče.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Informace o poloze nejsou dostupné";
              break;
            case error.TIMEOUT:
              errorMessage = "Časový limit pro získání polohy vypršel";
              break;
            default:
              errorMessage = "Došlo k neočekávané chybě při získávání polohy";
              break;
          }

          setError(errorMessage);
          reject(new Error(errorMessage));
        },
        options,
      );
    });
  };

  const clearLocation = () => {
    setLocation(null);
    setError(null);
  };

  return {
    location,
    loading,
    error,
    isSupported,
    getCurrentPosition,
    clearLocation,
  };
};
