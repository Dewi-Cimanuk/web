import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');
  
  // 1. Kategori
  const catAlam = await prisma.category.upsert({ where: { slug: 'alam' }, update: {}, create: { name: 'Alam', slug: 'alam' } });
  const catEdukasi = await prisma.category.upsert({ where: { slug: 'edukasi' }, update: {}, create: { name: 'Edukasi', slug: 'edukasi' } });
  
  // 2. Destinasi
  const curug = await prisma.destination.upsert({
    where: { slug: 'curug-eksotis-cimanuk' },
    update: {},
    create: {
      name: 'Curug Eksotis Cimanuk',
      slug: 'curug-eksotis-cimanuk',
      description: 'Air terjun tersembunyi dengan air sebening kristal...',
      priceTicket: 15000,
      openHours: '08:00 - 17:00 WIB',
      categoryId: catAlam.id,
      status: 'PUBLISHED',
      images: { create: [{ url: '/images/hero.png', isPrimary: true }] },
      location: { create: { address: 'Dusun Krajan, Desa Cimanuk' } },
      facilities: { create: [{ name: 'Area Parkir' }, { name: 'Toilet' }] }
    }
  });

  const kampoeng = await prisma.destination.upsert({
    where: { slug: 'kampoeng-tani-edukasi' },
    update: {},
    create: {
      name: 'Kampoeng Tani Edukasi',
      slug: 'kampoeng-tani-edukasi',
      description: 'Rasakan pengalaman bertani langsung bersama masyarakat lokal...',
      priceTicket: 25000,
      openHours: '07:00 - 15:00 WIB',
      categoryId: catEdukasi.id,
      status: 'PUBLISHED',
      images: { create: [{ url: '/images/hero.png', isPrimary: true }] },
      location: { create: { address: 'Dusun Sawah Baru, Desa Cimanuk' } },
      facilities: { create: [{ name: 'Gazebo' }, { name: 'Pemandu Lokal' }] }
    }
  });

  // 3. Institution & KKN
  const inst = await prisma.institution.create({ data: { name: 'Universitas Padjadjaran' } });
  await prisma.kKNProgram.upsert({
    where: { slug: 'pengembangan-potensi-agrowisata-cimanuk-2025' },
    update: {},
    create: {
      title: 'Pengembangan Potensi Agrowisata Cimanuk',
      slug: 'pengembangan-potensi-agrowisata-cimanuk-2025',
      batch: 'Angkatan 2025',
      year: 2025,
      description: 'Program kerja berfokus pada pendampingan masyarakat dalam mengelola agrowisata...',
      supervisorName: 'Dr. Ir. Budi Santoso, M.Si',
      institutionId: inst.id,
      status: 'PUBLISHED',
      members: { create: [{ name: 'Andi Saputra', role: 'Ketua', faculty: 'Pertanian' }] },
      workPrograms: {
        create: [{
          title: 'Pelatihan Pemasaran Digital Homestay',
          description: 'Memberikan pelatihan kepada pemilik homestay lokal...',
          outputs: { create: [{ description: 'Modul Panduan Digital Marketing' }] },
          impacts: { create: [{ description: 'Peningkatan visibilitas homestay di internet' }] },
          recommendations: { create: [{ target: 'Pemdes', description: 'Perlu adanya wifi publik' }] }
        }]
      }
    }
  });

  console.log('Seeding finished!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
