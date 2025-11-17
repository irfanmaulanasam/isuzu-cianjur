// src/components/ui/Button.jsx
export default function Button({ children, variant = "primary" }) {
const base = "px-4 py-2 rounded font-medium";
const variants = {
primary: "bg-blue-600 text-white",
outline: "border border-gray-400 text-gray-800",
};
return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}