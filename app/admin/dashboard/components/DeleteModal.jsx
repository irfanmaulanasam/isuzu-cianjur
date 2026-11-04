export default function DeleteModal({ isOpen, deleteModal, setDeleteModal, adminName, setAdminName, deleteReason, setDeleteReason, isSubmitting, confirmSoftDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-red-600 mb-2">Konfirmasi Arsip / Soft Delete</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Anda akan mengarsipkan artikel: <br />
          <strong className="text-slate-900 dark:text-white">&ldquo;{deleteModal.articleTitle}&rdquo;</strong>
        </p>

        <form onSubmit={confirmSoftDelete} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nama Admin / Penanggung Jawab *
            </label>
            <input
              type="text"
              placeholder="Contoh: Irfan Maulana"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Alasan / Keterangan Penghapusan
            </label>
            <textarea
              placeholder="Contoh: Artikel sudah kedaluwarsa atau salah informasi..."
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              rows="3"
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white disabled:opacity-50"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDeleteModal({ isOpen: false, articleId: null, articleTitle: "" })}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                "Arsipkan Data"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}