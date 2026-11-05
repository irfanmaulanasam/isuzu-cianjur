exports.productColumns = [
    { 
      key: "title", 
      label: "Nama Kendaraan", 
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
          <div className="text-xs text-slate-500">{item.variant || "Standard"}</div>
        </div>
      )
    },
    { 
      key: "category", 
      label: "Kategori", 
      sortable: true,
      render: (item) => (
        <span className="text-slate-700 dark:text-slate-300 font-semibold tracking-wider">
          {item.category} {/* Misal: GIGA, ELF, TRAGA */}
        </span>
      )
    },
    { 
      key: "price", 
      label: "Harga", 
      sortable: true,
      render: (item) => (
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Rp {item.price ? item.price.toLocaleString('id-ID') : "Hubungi Sales"}
        </div>
      )
    },
    { 
      key: "published", 
      label: "Status Tampil", 
      sortable: false,
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.published ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
          {item.published ? "Live" : "Draf"}
        </span>
      )
    },
  ];