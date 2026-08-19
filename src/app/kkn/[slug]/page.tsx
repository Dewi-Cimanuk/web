import { notFound } from "next/navigation";
import Link from "next/link";
import { getKKNBySlug } from "@/modules/kkn/services/mock";
import { ChevronLeft, GraduationCap, Building2, Calendar, Target, CheckCircle2, Zap, Lightbulb, Users } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const kkn = await getKKNBySlug(resolvedParams.slug);
  
  if (!kkn) {
    return { title: "Data KKN Tidak Ditemukan | DEWI Cimanuk" };
  }
  
  return {
    title: `${kkn.title} | DEWI Cimanuk`,
  };
}

export default async function KKNDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const kkn = await getKKNBySlug(resolvedParams.slug);

  if (!kkn) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      {/* Header section */}
      <div className="bg-slate-900 text-white pt-10 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-[0.05] bg-cover bg-center" />
        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          <Link href="/kkn" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
            <ChevronLeft className="w-5 h-5 mr-1" /> Kembali ke Daftar KKN
          </Link>

          <div className="flex items-center gap-3 text-primary font-bold mb-4 bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20">
            <Building2 className="w-5 h-5" />
            {kkn.institution.name}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            {kkn.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{kkn.year} — {kkn.batch}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span>DPL: {kkn.supervisorName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-12 relative z-20">
        
        {/* Abstract/Description Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-slate-800">
            <Target className="w-6 h-6 mr-3 text-primary" /> Latar Belakang & Abstrak
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {kkn.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Work Programs */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold font-serif text-slate-800 mb-6">Program Kerja & Implementasi</h2>
            
            {kkn.workPrograms.map((wp, idx) => (
              <div key={wp.id} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{idx + 1}. {wp.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{wp.description}</p>
                
                <div className="space-y-6">
                  {/* Outputs */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" /> Luaran (Output)
                    </h4>
                    <ul className="space-y-2">
                      {wp.outputs.map((out: any, i: number) => (
                        <li key={i} className="flex items-start text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                           <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 shrink-0" />
                           {out}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impacts */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-info" /> Dampak (Impact)
                    </h4>
                    <ul className="space-y-2">
                      {wp.impacts.map((imp: any, i: number) => (
                        <li key={i} className="flex items-start text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                           <span className="w-1.5 h-1.5 bg-info rounded-full mt-2 mr-3 shrink-0" />
                           {imp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" /> Rekomendasi Berkelanjutan
                    </h4>
                    <div className="space-y-3">
                      {wp.recommendations.map((rec: any, i: number) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                          <span className="inline-block px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded mb-2">
                            Untuk: {rec.target}
                          </span>
                          <p className="text-slate-700 text-sm">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Team Members */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold border-b pb-4 mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" /> Susunan Tim KKN
              </h3>
              
              <div className="space-y-4">
                {kkn.members.map((member, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{member.name}</p>
                      <p className="text-xs text-primary font-semibold mb-1">{member.role}</p>
                      <p className="text-xs text-slate-500">{member.faculty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// This allows lucide icons to work if we needed them, but we forgot to import Users in this context, let's fix that.
// Actually Users is imported above but I'll make sure.
