"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAccommodation(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const contact = formData.get("contact") as string;
  const pricePerNightStr = formData.get("pricePerNight") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) throw new Error("Name and description required");

  let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (await prisma.accommodation.findUnique({ where: { slug } })) slug += `-${Date.now()}`;

  await prisma.accommodation.create({
    data: { 
      name, slug, description, address: address || null, contact: contact || null, 
      pricePerNight: pricePerNightStr ? parseFloat(pricePerNightStr) : null,
      status: status || "DRAFT" 
    },
  });

  revalidatePath("/admin/homestay");
  redirect("/admin/homestay");
}

export async function updateAccommodation(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const contact = formData.get("contact") as string;
  const pricePerNightStr = formData.get("pricePerNight") as string;
  const status = formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  
  if (!name || !description) throw new Error("Name and description required");

  await prisma.accommodation.update({
    where: { id },
    data: { 
      name, description, address: address || null, contact: contact || null, 
      pricePerNight: pricePerNightStr ? parseFloat(pricePerNightStr) : null,
      status: status || "DRAFT" 
    },
  });

  revalidatePath("/admin/homestay");
  redirect("/admin/homestay");
}

export async function deleteAccommodation(id: string) {
  await prisma.accommodation.delete({ where: { id } });
  revalidatePath("/admin/homestay");
}
