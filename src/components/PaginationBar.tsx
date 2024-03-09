import * as FA from "react-icons/fa6";

import { FC } from "react";

interface IProps {
  changePage(value: number): void;
  page: number;
}
const PaginationBar: FC<IProps> = ({ changePage, page }) => {
  return (
    <div className="flex flex-row">
      <button
        disabled={page === 0}
        onClick={() => changePage(--page)}
        className="bg-gray-100 rounded-lg hover:bg-gray-200 p-1 text-gray-400"
      >
        <FA.FaCircleArrowLeft size={20} />
      </button>
      <h1 className="bg-gray-100 rounded-lg p-1 px-2 mx-2">{page}</h1>
      <button
        onClick={() => changePage(++page)}
        className="bg-gray-100 rounded-lg hover:bg-gray-200 p-1 text-gray-400"
      >
        <FA.FaCircleArrowRight size={20} />
      </button>
    </div>
  );
};
export default PaginationBar;
