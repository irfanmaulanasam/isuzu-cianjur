// components/FormRow.jsx

export default function FormRow({ label, name, type, formData, handler, required = false, isNumeric = false, options = [], value, disabled }) {
    
    // Ambil nilai dari formData atau dari prop value jika ada (untuk input disabled/value tetap)
    const inputValue = value !== undefined ? value : formData[name] || '';

    const handleChange = (e) => {
        let val = e.target.value;
        if (isNumeric) val = val.replace(/[^0-9]/g, '');
        // Mengirim balik ke handler utama
        handler({ target: { name: name, value: val, type: e.target.type } });
    };

    const inputClass = "w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-100";
    const labelClass = "w-full md:w-1/3 text-sm font-semibold text-gray-600 mb-1 md:mb-0";

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
        
        return (
            <input
                id={name}
                name={name}
                type={isNumeric ? 'tel' : type} // Menggunakan tel untuk keyboard numerik di HP
                value={inputValue}
                onChange={handleChange}
                required={required}
                disabled={disabled}
                className={inputClass}
                placeholder={`Masukkan ${label}`}
            />
        );
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center py-2">
            <label htmlFor={name} className={labelClass}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="w-full md:w-2/3">
                {renderInput()}
            </div>
        </div>
    );
}