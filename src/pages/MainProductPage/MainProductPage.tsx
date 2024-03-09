import { useEffect, useState } from "react";

import FieldInput from "../../utils/UI/FeildInput";
import PaginationBar from "../../components/PaginationBar";
import ProductList from "../../components/ProductList/ProductList";
import clsx from "clsx";
import useBrandData from "../../utils/hooks/useBrandsData";
import useProductData from "../../utils/hooks/useProductData";

export interface IFilter {
  brand: string;
  name: string;
  price: number;
}
const initialFilterValue: IFilter = {
  brand: "",
  name: "",
  price: 0,
};
const MainProductPage = () => {
  const { fetchData, isLoading, productData } = useProductData();
  const { brands } = useBrandData();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<IFilter>(initialFilterValue);

  const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, name: e.target.value });
  };
  const handleInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, price: +e.target.value });
  };
  function toogleBrand(brand: string) {
    if (filter.brand === brand) {
      setFilter({ ...filter, brand: "" });
      return;
    }
    setFilter({ ...filter, brand: brand });
  }
  function handleChangePage(value: number) {
    setPage(value);
  }
  //сброс фильтров
  function clearFilter() {
    setFilter(initialFilterValue);
  }
  //Запрос данных исходя из фильтров
  useEffect(() => {
    const offset = page * 50;
    const offsetParams = {
      offset: offset,
      limit: 50,
    };
    if (filter.name === "" && filter.brand === "" && filter.price === 0) {
      fetchData("get_ids", offsetParams);
      return;
    }
    if (filter.brand !== "") {
      fetchData("filter", { brand: filter.brand, ...offsetParams });
      return;
    }
    if (filter.price !== 0) {
      fetchData("filter", { price: filter.price, ...offsetParams });
      return;
    }

    const timer = setTimeout(() => {
      fetchData("filter", { product: filter.name, ...offsetParams });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [page, filter]);

  return (
    <div className="flex-col">
      <div className="flex flex-row my-2 w-full">
        <div className="w-1/5 ">
          <h1>По цене</h1>
          <FieldInput value={filter.price} onChange={handleInputPriceChange} />
        </div>
        <div className="w-4/5 ml-2 ">
          <h1>По имени</h1>
          <FieldInput value={filter.name} onChange={handleInputNameChange} />
        </div>
      </div>

      <div className="flex-auto border-2 border-gray-100 rounded-lg h-auto w-auto">
        {brands?.map((brand, index) => (
          <button
            key={index}
            className={clsx(
              "m-1 rounded-lg bg-gray-100 p-1 hover:bg-gray-200",
              { "border-2 border-gray-600": brand === filter.brand }
            )}
            onClick={() => toogleBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
      <button
        className="my-2 rounded-lg bg-gray-100 p-1 hover:bg-gray-200"
        onClick={clearFilter}
      >
        Сброс фильтра
      </button>

      <div className="border-2 border-gray-100 rounded-lg my-2 p-1">
        <PaginationBar page={page} changePage={handleChangePage} />
      </div>

      <ProductList data={productData} isLoading={isLoading} />
    </div>
  );
};
export default MainProductPage;
