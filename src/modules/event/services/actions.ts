"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!title || !description || !startDateStr) {
    throw new Error("Title, description, and start date are required.");
  }

  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  const existing = await prisma.event.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.event.create({
    data: {
      title,
      slug,
      description,
      startDate: new Date(startDateStr),
      endDate: endDateStr ? new Date(endDateStr) : null,
      location: location || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/event");
  redirect("/admin/event");
}

export async function updateEvent(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!title || !description || !startDateStr) {
    throw new Error("Title, description, and start date are required.");
  }

  await prisma.event.update({
    where: { id },
    data: {
      title,
      description,
      startDate: new Date(startDateStr),
      endDate: endDateStr ? new Date(endDateStr) : null,
      location: location || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/event");
  redirect("/admin/event");
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id }
  });
  
  revalidatePath("/admin/event");
}
