'use client';
import { allIsuzuModels } from "@/src/data/products/isuzuPrices-utils";

const ModelDatalistInput = ({
  value,
  onChange,
  onBlur,
  id = "model-select",
  datalistId = "model-options",
  placeholder = "Ketik nama model...",
  models = allIsuzuModels,
  className = "",
  label = "Pilih Model Kendaraan",
  showLabel = true,
}) => {
  return (
    <label className="block mb-6">
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
          {label}
        </span>
      )}

      <input
        type="text"
        id={id}
        list={datalistId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={
          className ||
          "w-full px-4 py-2 border border-gray-300 rounded-lg " +
          "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 " +
          "shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        }
      />

      <datalist id={datalistId}>
        {models.map((item) => (
          <option key={item.model} value={item.model} />
        ))}
      </datalist>
    </label>
  );
};

export default ModelDatalistInput;