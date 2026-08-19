import { Construction } from "lucide-react";

export const metadata = {
  title: "Manajemen Konten | DEWI Cimanuk",
};

export default function AdminContentPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
        <Construction className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">Modul Konten (Artikel & Event)</h2>
      <p className="text-slate-500 max-w-md">
        Halaman ini sedang dalam tahap pengembangan. Nantinya Anda dapat menulis artikel blog dan agenda kegiatan (event) desa di sini.
      </p>
    </div>
  );
}
