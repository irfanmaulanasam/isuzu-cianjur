export default function FormItem({ 
    label, 
    name, 
    type, 
    formData, 
    handler, 
    required = false, 
    isNumeric = false, 
    options = [], 
    value, 
    disabled, 
    rows = 1,
    placeholder 
}) {
    
    // Ambil nilai dari formData atau dari prop value jika ada
    const inputValue = value !== undefined ? value : formData[name] || '';

    const handleChange = (e) => {
        let val = e.target.value;
        if (isNumeric) val = val.replace(/[^0-9]/g, '');
        // Mengirim balik ke handler utama
        handler({ target: { name: name, value: val, type: e.target.type } });
    };

    const inputClass = "w-full p-2 text-xs border border-gray-400 rounded-sm focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all disabled:bg-gray-100 placeholder:text-gray-400 dark:disabled:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-400 dark:focus:border-red-400";
    const labelClass = "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5";

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select 
                    id={name} 
                    name={name} 
                    value={inputValue} 
                    onChange={handleChange} 
                    required={required} 
                    disabled={disabled}
                    className={inputClass}>
                    <option value="" disabled>Pilih {label}</option>
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            );
        }
        
        if (type === 'textarea') {
            return (
                <textarea
                    id={name}
                    name={name}
                    value={inputValue}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    className={`${inputClass} resize-none`}
                    placeholder={placeholder || `Masukkan ${label}`}
                />
            );
        }

        return (
            <input
                id={name}
                name={name}
                type={isNumeric ? 'tel' : type}
                value={inputValue}
                onChange={handleChange}
                required={required}
                disabled={disabled}
                className={inputClass}
                placeholder={placeholder || `Masukkan ${label}`}
            />
        );
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className={labelClass}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div>
                {renderInput()}
            </div>
        </div>
    );
}