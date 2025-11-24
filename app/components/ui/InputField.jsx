const InputField = ({ label, name, type, formData, handler, value, rows, required, disabled }) => {
    const isTextarea = type === 'textarea';
    const InputComponent = isTextarea ? 'textarea' : 'input';
    
    // Tentukan nilai input. Jika ada 'value' prop, gunakan itu (misalnya untuk noHp)
    const inputValue = value !== undefined ? value : formData[name] || '';

    return (
        <div>
            <label htmlFor={name} className="block text-xs font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <InputComponent
                id={name}
                name={name}
                type={type === 'textarea' ? undefined : type}
                value={inputValue}
                onChange={handler}
                rows={rows}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200"
                required={required}
                disabled={disabled}
            />
        </div>
    );
};
export default InputField