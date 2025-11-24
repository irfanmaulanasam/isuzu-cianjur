const RadioGroup = ({ label, name, formData, handler, options }) => (
    <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex space-x-4 p-2 bg-white border border-gray-300 rounded-md">
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center text-sm">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={formData[name] === opt.value}
                        onChange={handler}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    </div>
);
export default RadioGroup