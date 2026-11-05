// Konfigurasi kolom untuk DataTable
  exports.articleColumns = [
    // Kolom ID sengaja dibuang dari sini agar tidak dirender ke tabel admin
    { 
      key: "title", 
      label: "Judul Artikel", 
      sortable: true,
      render: (item) => <div className="font-medium text-slate-900 dark:text-white max-w-xs truncate">{item.title}</div>
    },
    { 
      key: "category", 
      label: "Kategori", 
      sortable: true,
      render: (item) => <div className="text-slate-700 dark:text-slate-300 uppercase text-xs font-bold tracking-wider">{item.category}</div>
    },
    { 
      key: "createdAt", 
      label: "Tanggal Dibuat", 
      sortable: true,
      render: (item) => (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </div>
      )
    },
    { 
      key: "published", 
      label: "Status", 
      sortable: false,
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
          {item.published ? "Publik" : "Draf"}
        </span>
      )
    },
  ];