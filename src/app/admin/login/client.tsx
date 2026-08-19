"use client";

import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { authenticate } from "./actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Email</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="email" 
            name="email"
            required
            placeholder="admin@cimanuk.desa.id"
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Kata Sandi</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input 
            type="password" 
            name="password"
            required
            placeholder="••••••••"
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-slate-50 focus:bg-white"
          />
        </div>
      </div>
      
      {errorMessage && (
        <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
      )}

      <Button disabled={isPending} type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-md">
        {isPending ? "Memeriksa..." : "Masuk ke Dashboard"}
      </Button>
    </form>
  );
}
