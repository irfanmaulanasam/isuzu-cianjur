const SelectField = ({ label, name, formData, handler, options, required }) => (
    <div>
        <label htmlFor={name} className="block text-xs font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handler}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            required={required}
        >
            <option value="">-- Pilih {label.replace(' *', '')} --</option>
            {options.map((opt, index) => (
                <option key={index} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);
export default SelectField