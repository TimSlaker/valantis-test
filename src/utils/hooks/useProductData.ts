import { makeRequest } from "../../lib/api/api";
import { useState } from "react";

export interface IProductData {
  id: string;
  product: string;
  price: number;
  brand: string;
}
interface IFetchParams {
  limit?: number;
  offset?: number;
  ids?: string[];
  product?: string;
  price?: number;
  brand?: string;
}

const useProductData = () => {
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState<IProductData[] | null>(null);

  const fetchData = async (action: string, params: IFetchParams) => {
    setLoading(true);
    const body = {
      action: action,
      params: params,
    };
    try {
      const responseIds = await makeRequest("POST", body);
      const dataIds = await responseIds.json();
      const responseItems = await makeRequest("POST", {
        action: "get_items",
        params: { ids: dataIds.result },
      });
      const dataItems = await responseItems.json();
      setProductData(dataItems.result);
    } catch (error) {
      console.log(error);
    } finally {
    }
    setLoading(false);
  };

  return {
    isLoading,
    fetchData,
    productData,
  };
};
export default useProductData;
