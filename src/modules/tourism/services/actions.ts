"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createDestination(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const priceTicketStr = formData.get("priceTicket") as string;
  const openHours = formData.get("openHours") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description || !categoryId) {
    throw new Error("Name, description, and category are required.");
  }

  // Create simple slug
  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  
  // Basic unique slug logic (in a real app, check for uniqueness)
  const existing = await prisma.destination.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  await prisma.destination.create({
    data: {
      name,
      slug,
      description,
      categoryId,
      priceTicket: priceTicketStr ? Number(priceTicketStr) : null,
      openHours: openHours || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/wisata");
  redirect("/admin/wisata");
}

export async function updateDestination(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const priceTicketStr = formData.get("priceTicket") as string;
  const openHours = formData.get("openHours") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description || !categoryId) {
    throw new Error("Name, description, and category are required.");
  }

  await prisma.destination.update({
    where: { id },
    data: {
      name,
      description,
      categoryId,
      priceTicket: priceTicketStr ? Number(priceTicketStr) : null,
      openHours: openHours || null,
      status: status || "DRAFT",
    },
  });

  revalidatePath("/admin/wisata");
  redirect("/admin/wisata");
}

export async function deleteDestination(id: string) {
  await prisma.destination.delete({
    where: { id }
  });
  
  revalidatePath("/admin/wisata");
}
