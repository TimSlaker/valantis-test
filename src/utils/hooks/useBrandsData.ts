import { useEffect, useState } from "react";

import { makeRequest } from "../../lib/api/api";

const useBrandData = () => {
  const [isLoading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[] | null>(null);

  useEffect(() => {
    const getBrands = async () => {
      const body = {
        action: "get_fields",
        params: { field: "brand" },
      };
      try {
        const responseBrands = await makeRequest("POST", body);
        const dataBrands = await responseBrands.json();
        const filterBrands = dataBrands.result
          .filter((item: string) => item != null)
          .filter((item: string, index: number, self: string[]) => {
            return index === self.findIndex((t) => t === item);
          });
        setBrands(filterBrands);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBrands();
  }, []);
  return {
    isLoading,
    brands,
  };
};

export default useBrandData;
