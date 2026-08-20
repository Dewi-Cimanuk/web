import Link from "next/link";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <span>DEWI</span>
            <span className="text-secondary">Cimanuk</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/90">
          <Link href="/" className="hover:text-secondary transition-colors">Beranda</Link>
          <Link href="/wisata" className="hover:text-secondary transition-colors">Wisata</Link>
          <Link href="/homestay" className="hover:text-secondary transition-colors">Homestay</Link>
          <Link href="/kuliner" className="hover:text-secondary transition-colors">Kuliner</Link>
          <Link href="/kkn" className="hover:text-secondary transition-colors">KKN</Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <form className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari destinasi..."
              className="h-9 w-48 rounded-full bg-white pl-9 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-secondary"
            />
          </form>
          
          {/* Mobile Menu Toggle (To be implemented later) */}
          <button className="md:hidden text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      

    </header>
  );
}
