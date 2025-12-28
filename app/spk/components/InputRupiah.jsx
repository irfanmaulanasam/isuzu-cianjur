export default function InputRupiah ({ label, name, formData, handler, required = false, disabled = false, showLabel = true }) {
    const formatRupiah = (num) => new Intl.NumberFormat('id-ID').format(num);
    const displayValue = formatRupiah(formData[name] || 0);

    const handleChange = (e) => {
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        const numValue = cleanValue === '' ? 0 : parseInt(cleanValue, 10);
        
        handler({ target: { name: name, value: numValue } });
    };

    return (
        <div className="flex items-center h-6 border-b border-gray-300">
            {showLabel && (
                <label htmlFor={name} className="w-1/3 text-[10px] md:text-xs font-medium text-gray-700 flex-shrink-0 dark:text-gray-100">
                    {label} (Rp): {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={name}
                name={name}
                type="text" 
                value={displayValue}
                onChange={handleChange}
                onBlur={handleChange} 
                className={`h-full p-0.5 text-[10px] md:text-xs border-none focus:ring-0 bg-transparent disabled:bg-gray-100 text-right font-semibold ${showLabel ? 'w-2/3' : 'w-full'}`}
                required={required}
                disabled={disabled}
            />
        </div>
    );
};