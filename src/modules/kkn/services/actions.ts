"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createKKNProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const batch = formData.get("batch") as string;
  const yearStr = formData.get("year") as string;
  const description = formData.get("description") as string;
  const supervisorName = formData.get("supervisorName") as string;
  const institutionId = formData.get("institutionId") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!title || !description || !institutionId || !yearStr) {
    throw new Error("Title, description, institution, and year are required.");
  }

  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const existing = await prisma.kKNProgram.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.kKNProgram.create({
    data: {
      title,
      slug,
      batch: batch || null,
      year: parseInt(yearStr, 10),
      description,
      supervisorName: supervisorName || null,
      institutionId,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/kkn");
  redirect("/admin/kkn");
}

export async function updateKKNProgram(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const batch = formData.get("batch") as string;
  const yearStr = formData.get("year") as string;
  const description = formData.get("description") as string;
  const supervisorName = formData.get("supervisorName") as string;
  const institutionId = formData.get("institutionId") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!title || !description || !institutionId || !yearStr) {
    throw new Error("Title, description, institution, and year are required.");
  }

  await prisma.kKNProgram.update({
    where: { id },
    data: {
      title,
      batch: batch || null,
      year: parseInt(yearStr, 10),
      description,
      supervisorName: supervisorName || null,
      institutionId,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/kkn");
  redirect("/admin/kkn");
}

export async function deleteKKNProgram(id: string) {
  await prisma.kKNProgram.delete({
    where: { id }
  });
  
  revalidatePath("/admin/kkn");
}
