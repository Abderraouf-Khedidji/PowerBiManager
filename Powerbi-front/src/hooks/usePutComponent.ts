import { useState } from "react";
import { activeComponentApi } from "../services/api";

export const usePutComponents = (componentName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const activeComponent = async () => {
    try {
      setLoading(true);
      const data = await activeComponentApi(componentName);
      setData(data);
    } catch (error) {
      console.error("Error putting component:", error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, activeComponent };
};
