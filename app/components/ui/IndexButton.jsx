export default function IndexButton ({ children, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            // Menerima prop 'isActive' untuk menentukan styling
            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm 
                ${isActive 
                    ? "bg-blue-600 text-white shadow-lg scale-105" // Gaya aktif
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200" // Gaya default
                }
            `}
        >
            {children}
        </button>
    );
};