import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-xl font-bold tracking-tight text-primary">
            DEWI <span className="text-secondary">CIMANUK</span>
          </div>
          
          <p className="text-muted-foreground text-sm max-w-md">
            Platform Digital Desa Wisata Cimanuk. Temukan keindahan alam, budaya lokal, homestay nyaman, dan potensi ekonomi kami.
          </p>
          
          <div className="flex gap-6 text-sm font-medium text-foreground/80">
            <Link href="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link>
            <Link href="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
            <Link href="/kkn" className="hover:text-primary transition-colors">Info KKN</Link>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-slate-50 py-4 border-t">
        <p className="text-center text-xs text-muted-foreground italic">
          &copy; {currentYear} Desa Wisata Cimanuk. All rights reserved. <br/>
          Dikelola bersama oleh Pemerintah Desa & Tim KKN.
        </p>
      </div>
    </footer>
  );
}
