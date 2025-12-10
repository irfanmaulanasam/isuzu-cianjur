export default function RadioGroupFormal({ label, name, formData, handler, options }) {
    return (
        <div className="flex items-center h-6 border-b border-gray-300">
            <label className="w-1/3 text-[10px] md:text-xs font-medium text-gray-700 flex-shrink-0">{label}:</label>
            <div className="flex space-x-3 w-2/3">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center text-[10px] md:text-xs">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={formData[name] === opt.value}
                            onChange={handler}
                            className="mr-1 h-3 w-3 text-red-600 focus:ring-red-500"
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
} 