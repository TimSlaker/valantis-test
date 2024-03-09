import { FC } from "react";

interface IProps {
  value: string | number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
const FieldInput: FC<IProps> = ({ value, onChange }) => {
  return (
    <input
      className="w-full border-2 rounded-lg border-gray-100 p-1 placeholder-gray-300"
      type="text"
      value={value}
      onChange={(e) => onChange(e)}
      placeholder="Искать..."
    />
  );
};
export default FieldInput;
