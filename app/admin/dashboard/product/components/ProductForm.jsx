// components/ProductForm.jsx
import ImageUploader from "../../components/ImageUploader"; 

export default function ProductForm({ 
  formData, 
  handleChange, 
  handleDetailChange,
  handleItemChange,
  handleSubmit, 
  loading, 
  isEditMode 
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* SECTION 1: Informasi Dasar */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold border-b pb-4 mb-4">Informasi Dasar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Nama Kendaraan</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Slug URL</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Harga</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Kategori</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* SECTION 2: Media */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold border-b pb-4 mb-4">Media (Gambar Kendaraan)</h2>
        <ImageUploader 
          imageUrl={formData.image} 
          onUploadSuccess={(url) => handleChange({ target: { name: "image", value: url } })} 
        />
      </div>

      {/* SECTION 3: Highlight Details (power, seats, engine dll) */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold border-b pb-4 mb-4">Highlight Detail</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(formData.details).map((key) => (
            <div key={key}>
              <label className="block text-sm font-semibold mb-2 capitalize">{key}</label>
              <input 
                type="text" 
                name={key} 
                value={formData.details[key]} 
                onChange={handleDetailChange} 
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Spesifikasi Teknis Lengkap (Render Dinamis) */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold border-b pb-4 mb-6">Spesifikasi Teknis</h2>
        
        {formData.sections.map((section, sIndex) => (
          <div key={section.id || sIndex} className="mb-8 border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">{section.label}</h3>
            
            <div className="space-y-3">
              {section.items.map((item, iIndex) => (
                <div key={item.id || iIndex} className="flex gap-4 items-center">
                  <input 
                    type="text" 
                    value={item.name} 
                    onChange={(e) => handleItemChange(sIndex, iIndex, 'name', e.target.value)}
                    className="w-1/3 px-3 py-2 border rounded-lg dark:bg-slate-700 bg-slate-50 font-medium"
                    placeholder="Nama Spesifikasi (cth: Panjang)"
                  />
                  <input 
                    type="text" 
                    value={item.value} 
                    onChange={(e) => handleItemChange(sIndex, iIndex, 'value', e.target.value)}
                    className="w-2/3 px-3 py-2 border rounded-lg dark:bg-slate-700"
                    placeholder="Nilai (cth: 6,600 mm)"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TOMBOL AKSI */}
      <div className="flex justify-end gap-4 pb-12">
        <button type="submit" disabled={loading} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-md">
          {loading ? "Menyimpan Data..." : "Simpan Perubahan Produk"}
        </button>
      </div>

    </form>
  );
}