import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCheckTime = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const key = "savedTimestamp";
    const savedTime = localStorage.getItem(key);
    const currentTime = Date.now();
    const hours24 = 24 * 60 * 60 * 1000;

    if (!savedTime || currentTime - parseInt(savedTime, 10) >= hours24) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [location.pathname]);

  const updateTimestamp = () => {
    localStorage.setItem("savedTimestamp", Date.now().toString());
    setIsUpdated(false);
  };

  return { isUpdated, updateTimestamp };
};

export default useCheckTime;
