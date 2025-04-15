import { useEffect, useState } from "react";

export const useApiGet = (url) => {
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const apiCall = async () => {
      setTimeout(async () => {
        const rep = await fetch(url);
        const data = await rep.json();
        setEstado(data.image);
      }, 2000);
    };
    apiCall();
  }, []);

  return [estado];
};
