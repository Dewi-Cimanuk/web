import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 0. Admin User (Aman, mengambil dari .env)
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cimanuk.desa.id';
  const adminPasswordText = process.env.ADMIN_PASSWORD || 'cimanuk2026';
  const adminPassword = await bcrypt.hash(adminPasswordText, 10);
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin Cimanuk',
      password: adminPassword,
      role: 'SUPER_ADMIN'
    }
  });

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

  // 4. Culinary
  await prisma.culinary.upsert({
    where: { slug: 'nasi-liwet-ibu-cicih' },
    update: {},
    create: {
      name: 'Warung Nasi Liwet Ibu Cicih',
      slug: 'nasi-liwet-ibu-cicih',
      description: 'Nikmati sajian khas Sunda dengan menu andalan Nasi Liwet yang disajikan hangat dengan lauk pauk tradisional dan sambal khas Cimanuk.',
      address: 'Jalan Utama Desa Cimanuk No. 12',
      openHours: '09:00 - 20:00 WIB',
      status: 'PUBLISHED',
      images: { create: [{ url: '/images/hero.png', isPrimary: true }] },
      menus: {
        create: [
          { name: 'Paket Nasi Liwet Komplit', price: 35000 },
          { name: 'Ayam Bakar Madu', price: 20000 }
        ]
      }
    }
  });

  // 5. UMKM
  await prisma.uMKM.upsert({
    where: { slug: 'kerajinan-bambu-slamet' },
    update: {},
    create: {
      name: 'Kerajinan Bambu Pak Slamet',
      slug: 'kerajinan-bambu-slamet',
      description: 'Pengrajin lokal yang menyulap bambu menjadi berbagai kerajinan bernilai seni tinggi.',
      ownerName: 'Pak Slamet',
      address: 'Dusun Cimanuk Hilir RT 02',
      status: 'PUBLISHED',
      images: { create: [{ url: '/images/hero.png', isPrimary: true }] },
      products: {
        create: [
          { name: 'Lampu Tidur Bambu', price: 75000 },
          { name: 'Gelas Bambu Set', price: 50000 }
        ]
      }
    }
  });

  // 6. Accommodation
  await prisma.accommodation.upsert({
    where: { slug: 'omah-pak-budi' },
    update: {},
    create: {
      name: 'Omah Pak Budi Homestay',
      slug: 'omah-pak-budi',
      description: 'Penginapan nyaman bernuansa pedesaan yang menyatu dengan alam.',
      address: 'Dusun Krajan RT 01',
      pricePerNight: 200000,
      contact: '08123456789',
      status: 'PUBLISHED',
      images: { create: [{ url: '/images/hero.png', isPrimary: true }] },
      facilities: {
        create: [{ name: 'Kamar Mandi Dalam' }, { name: 'Kipas Angin' }]
      }
    }
  });

  // 7. Article
  await prisma.article.upsert({
    where: { slug: '5-alasan-berkunjung-ke-cimanuk' },
    update: {},
    create: {
      title: '5 Alasan Mengapa Anda Harus Berkunjung ke Cimanuk',
      slug: '5-alasan-berkunjung-ke-cimanuk',
      excerpt: 'Dari pemandangan alam yang asri hingga kehangatan warga lokal, temukan daya tarik utama desa wisata ini.',
      content: 'Konten lengkap artikel...',
      image: '/images/hero.png',
      authorName: 'Tim KKN Tematik',
      status: 'PUBLISHED'
    }
  });

  // 8. Event
  await prisma.event.upsert({
    where: { slug: 'festival-budaya-cimanuk-2026' },
    update: {},
    create: {
      title: 'Festival Budaya Cimanuk 2026',
      slug: 'festival-budaya-cimanuk-2026',
      description: 'Perayaan tahunan seni dan budaya yang menampilkan tarian tradisional, pameran produk UMKM lokal, dan kuliner khas desa.',
      startDate: new Date('2026-10-15T08:00:00Z'),
      endDate: new Date('2026-10-17T22:00:00Z'),
      location: 'Alun-alun Desa Cimanuk',
      image: '/images/hero.png',
      status: 'PUBLISHED'
    }
  });

  // 9. Activity
  await prisma.activity.upsert({
    where: { slug: 'paket-edukasi-tani' },
    update: {},
    create: {
      name: 'Paket Edukasi Tani Cimanuk',
      slug: 'paket-edukasi-tani',
      description: 'Kegiatan sehari penuh belajar bertani bersama warga lokal, mulai dari membajak sawah, menanam padi, hingga panen.',
      price: 50000,
      duration: '4 - 5 Jam',
      status: 'PUBLISHED'
    }
  });

  // 10. Gallery
  await prisma.gallery.create({
    data: {
      url: '/images/hero.png',
      caption: 'Pemandangan pagi hari di Bukit Panorama Cimanuk',
      status: 'PUBLISHED'
    }
  });

  console.log('Seeding finished!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
