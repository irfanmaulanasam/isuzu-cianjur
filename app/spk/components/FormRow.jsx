export default function FormRow({ label, name, type, formData, handler, value, disabled }) {
    const inputValue = value !== undefined ? value : formData[name] || '';
    return (
        <div className="flex items-center h-6 border-b border-gray-300">
            <label htmlFor={name} className="w-1/3 text-[10px] md:text-xs font-medium text-gray-700 flex-shrink-0">
                {label}:
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={inputValue}
                onChange={handler}
                className="w-2/3 h-full p-0.5 text-[10px] md:text-xs border-none focus:ring-0 bg-transparent disabled:bg-gray-100"
                disabled={disabled}
            />
            </div>
    );
}