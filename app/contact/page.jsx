import ContactCard from "@/app/contact/components/ContactCard";
import contacts from "@/src/data/contacts/data";

export default function ContactPage() {
  const sales = contacts.filter((c) => c.role === "sales");
  const aftersales = contacts.filter((c) => c.role === "aftersales");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Hubungi Kami</h1>

      {/* SALES */}
      <h2 className="text-xl font-semibold mb-4">Sales</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {sales.map((item) => (
          <ContactCard key={item.id} item={item} />
        ))}
      </div>

      {/* AFTERSALES */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Aftersales / Admin Service</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {aftersales.map((item) => (
          <ContactCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
