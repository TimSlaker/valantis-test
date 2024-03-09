import { BarLoader } from "react-spinners";
import { FC } from "react";
import { IProductData } from "../../utils/hooks/useProductData";
import ProductCard from "../ProductCard/ProductCard";

interface IProps {
  data: IProductData[] | null;
  isLoading: boolean;
}
const ProductList: FC<IProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center align-middle p-10">
        <BarLoader color="#dedede" />
      </div>
    );
  }
  if (data?.length === 0) return <div>Нет товаров</div>;
  return (
    <div>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 h-screen justify-center">
        {data?.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
