export default function SpecPage({ data }) {
  if (!data) return <div className="p-8">Spesifikasi tidak ditemukan.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-red-600">{data.title}</h1>
        {data.subtitle && <p className="text-sm text-gray-500 mt-1">{data.subtitle}</p>}
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.sections.map((section, sIdx) => (
          <section key={sIdx} className="bg-white border rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">{section.label}</h3>
            <div className="divide-y">
              {section.items.map((it, idx) => (
                <div key={idx} className="py-3 flex justify-between items-start text-sm">
                  <div className="text-gray-600">{it.name}</div>
                  <div className="text-right text-gray-800 font-medium ml-4">{it.value}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Optional place for Download PDF or more */}
      <footer className="mt-8 text-center">
        {/* <button
          className="inline-block px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
          onClick={() => window.print()}
        >
          Download / Print
        </button> */}
      </footer>
    </div>
  );
}
