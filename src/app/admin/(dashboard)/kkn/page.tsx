import { Construction } from "lucide-react";

export const metadata = {
  title: "Manajemen KKN | DEWI Cimanuk",
};

export default function AdminKKNPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
        <Construction className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">Modul Manajemen KKN</h2>
      <p className="text-slate-500 max-w-md">
        Halaman ini sedang dalam tahap pengembangan. Nantinya Anda dapat menambah dan mengelola data histori KKN dari berbagai universitas di sini.
      </p>
    </div>
  );
}
