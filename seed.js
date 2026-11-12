require('dotenv').config();
const mongoose = require('mongoose');
const Ormawa = require('./models/ormawaModel');
const Kegiatan = require('./models/kegiatanModel');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  await Kegiatan.deleteMany({});
  await Ormawa.deleteMany({});

  const ormawa = await Ormawa.insertMany([
    { kode: 'BEM', nama: 'BEM Universitas' },
    { kode: 'HIMA-SI', nama: 'Himpunan Mahasiswa Sistem Informasi' },
    { kode: 'UKM-OLAHRAGA', nama: 'Unit Kegiatan Mahasiswa Olahraga' },
  ]);

  await Kegiatan.insertMany([
    {
      kodeKegiatan: 'KGT-01',
      nama: 'Seminar Teknologi Informasi',
      anggaran: 1000000,
      status: 'rencana',
      penanggungJawab: { nama: 'Andi Pratama', nim: '2428240101' },
      ormawaId: ormawa[0]._id,
    },
    {
      kodeKegiatan: 'KGT-02',
      nama: 'Pelatihan Kepemimpinan Mahasiswa',
      anggaran: 750000,
      status: 'berjalan',
      penanggungJawab: { nama: 'Siti Rahma', nim: '2428240102' },
      ormawaId: ormawa[1]._id,
    },
    {
      kodeKegiatan: 'KGT-03',
      nama: 'Turnamen Futsal Antar Kelas',
      anggaran: 500000,
      status: 'selesai',
      penanggungJawab: { nama: 'Budi Santoso', nim: '2428240103' },
      ormawaId: ormawa[2]._id,
    },
  ]);

  console.log('Seed berhasil: 3 ormawa dan 3 kegiatan telah dibuat.');
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Seed gagal:', err.message);
  await mongoose.disconnect();
  process.exit(1);
});
