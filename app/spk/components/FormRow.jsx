export default function FormRow({ label, name, type, formData, handler, value, disabled, required = false, isAlphabet = false, isNumeric = false, isEmail = false }) {
    const inputValue = value !== undefined ? value : formData[name] || '';

    const handleChange = (e) => {
        let val = e.target.value;
        if (isNumeric) val = val.replace(/[^0-9]/g, '');
        else if (isAlphabet) val = val.replace(/[^a-zA-Z\s.,]/g, ''); 
        handler({ target: { name: name, value: val } });
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center py-2">
            <label htmlFor={name} className="w-full md:w-1/3 text-xs font-semibold text-gray-600 mb-1 md:mb-0">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={isNumeric ? 'tel' : type}
                value={inputValue}
                onChange={handleChange}
                className="w-full md:w-2/3 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-100"
                required={required}
                disabled={disabled}
                placeholder={`Masukkan ${label}`}
            />
        </div>
    );
}