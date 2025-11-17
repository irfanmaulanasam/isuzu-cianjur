// src/components/ui/Card.jsx
export default function Card({ children }) {
return (
<div className="border rounded-xl p-4 shadow-sm bg-white">
{children}
</div>
);
}