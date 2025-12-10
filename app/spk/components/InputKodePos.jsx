import { useRef } from 'react';
export default function InputKodepos ({ name, formData, handler }) {
    const refs = useRef([]);
    
    const handleKodeposChange = (index, value) => {
        const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 1);
        const newKodepos = [...formData[name]];
        newKodepos[index] = cleanValue;
        
        handler({ target: { name: name, value: newKodepos } });

        if (cleanValue && index < 4) {
            refs.current[index + 1].focus();
        }
    };
    
    const handleKodeposKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !formData[name][index] && index > 0) {
            refs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex space-x-1">
            <p className="w-1/3 text-[10px] md:text-xs font-medium text-gray-700 flex-shrink-0">Kode Pos:</p>
            {formData[name].map((digit, index) => (
                <input
                    key={index}
                    ref={el => refs.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={(e) => handleKodeposChange(index, e.target.value)}
                    onKeyDown={(e) => handleKodeposKeyDown(index, e)}
                    maxLength={1}
                    className="w-8 h-6 text-center border border-gray-400 text-[10px] focus:ring-red-500"
                />
            ))}
        </div>
    );
};