import { FC } from "react";
import { FaImage } from "react-icons/fa6";
import { IProductData } from "../../utils/hooks/useProductData";

interface IProductCardProps {
  item: IProductData;
}
const ProductCard: FC<IProductCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col justify-between aling-middle rounded-xl w-44 p-1 mx-auto my-3 border-2 border-gray-100 max-h-80">
      <div className="flex bg-gray-100 w-auto aspect-square rounded-xl text-gray-300 justify-center text-center align-middle">
        <FaImage size={40} className="my-auto" />
      </div>
      <div className="h-auto">
        <div className="text-sm">{item.product}</div>
        {item.brand && (
          <div className="text-xs text-gray-500">{item.brand}</div>
        )}
      </div>
      <h1 className="flex text-lg">{item.price} руб.</h1>
    </div>
  );
};
export default ProductCard;
