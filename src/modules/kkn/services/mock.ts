import prisma from "@/lib/prisma";

export type KKNMember = {
  name: string;
  role: string;
  faculty: string;
};

export type WorkProgram = {
  id: string;
  title: string;
  description: string;
  outputs: string[];
  impacts: string[];
  recommendations: { target: string; description: string }[];
};

export type KKNProgramItem = {
  id: string;
  title: string;
  slug: string;
  batch: string;
  year: number;
  description: string;
  supervisorName: string;
  institution: { name: string; logo?: string };
  members: KKNMember[];
  workPrograms: WorkProgram[];
};

export async function getKKNList(search?: string) {
  const where: any = { status: 'PUBLISHED' };
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { institution: { name: { contains: search, mode: 'insensitive' } } }
    ];
  }
  
  const data = await prisma.kKNProgram.findMany({
    where,
    include: {
      institution: true,
      members: true,
      workPrograms: {
        include: { outputs: true, impacts: true, recommendations: true }
      }
    }
  });

  return data.map(k => ({
    id: k.id,
    title: k.title,
    slug: k.slug,
    batch: k.batch || "",
    year: k.year,
    description: k.description,
    supervisorName: k.supervisorName || "",
    institution: { name: k.institution.name, logo: k.institution.logo || undefined },
    members: k.members.map(m => ({ name: m.name, role: m.role || "", faculty: m.faculty || "" })),
    workPrograms: k.workPrograms.map(wp => ({
      id: wp.id,
      title: wp.title,
      description: wp.description,
      outputs: wp.outputs.map(o => o.description),
      impacts: wp.impacts.map(i => i.description),
      recommendations: wp.recommendations.map(r => ({ target: r.target || "Umum", description: r.description }))
    }))
  }));
}

export async function getKKNBySlug(slug: string) {
  const k = await prisma.kKNProgram.findUnique({
    where: { slug },
    include: {
      institution: true,
      members: true,
      workPrograms: {
        include: { outputs: true, impacts: true, recommendations: true }
      }
    }
  });

  if (!k) return null;

  return {
    id: k.id,
    title: k.title,
    slug: k.slug,
    batch: k.batch || "",
    year: k.year,
    description: k.description,
    supervisorName: k.supervisorName || "",
    institution: { name: k.institution.name, logo: k.institution.logo || undefined },
    members: k.members.map(m => ({ name: m.name, role: m.role || "", faculty: m.faculty || "" })),
    workPrograms: k.workPrograms.map(wp => ({
      id: wp.id,
      title: wp.title,
      description: wp.description,
      outputs: wp.outputs.map(o => o.description),
      impacts: wp.impacts.map(i => i.description),
      recommendations: wp.recommendations.map(r => ({ target: r.target || "Umum", description: r.description }))
    }))
  };
}
