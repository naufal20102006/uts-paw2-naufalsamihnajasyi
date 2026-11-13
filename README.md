# UTS PAW II – Organisasi Mahasiswa (Topik 32)

RESTful API menggunakan Node.js, Express 5, Mongoose, dan MongoDB. Entity utama adalah **Kegiatan** (`/kegiatan`) dan entity pendukung adalah **Ormawa** (`/ormawa`).

## Persiapan
- Node.js dan npm
- MongoDB Server lokal atau MongoDB Atlas

## Menjalankan aplikasi
1. Jalankan `npm install`.
2. Salin `.env.example` menjadi `.env`.
3. Pastikan `MONGODB_URI` mengarah ke database MongoDB milik Anda.
4. Jalankan `npm start`.
5. Server menerima request setelah koneksi MongoDB berhasil.

Contoh `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/uts_paw2_organisasi_mahasiswa
CORS_ORIGIN=http://localhost:5173
```

Jangan mengunggah file `.env` ke GitHub.

## Endpoint Ormawa
   ## Alasan desain data model
   | Data | Pola | Alasan |
   |---|---|---|
   | `penanggungJawab` (`nama`, `nim`) | Embedding | Selalu dibaca bersama Kegiatan, hanya dua field teks, dan tidak dipakai terpisah dari kegiatannya, sehingga satu query cukup tanpa join. `_id` dimatikan karena bukan dokumen mandiri. |
   | `ormawaId` → Ormawa | Referencing | Satu Ormawa punya banyak Kegiatan dan datanya (`kode`, `nama`) dipakai bersama serta bisa berubah. Disimpan di collection sendiri agar tidak terduplikasi, kode tetap unik, dan di-populate saat `GET /kegiatan/:id`. |
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/ormawa` | Membuat Ormawa dengan `kode` dan `nama` |
| GET | `/ormawa` | Membaca seluruh Ormawa |
| GET | `/ormawa/:id` | Membaca satu Ormawa |

Contoh body POST:
```json
{ "kode": "BEM", "nama": "BEM Universitas" }
```

## Endpoint Kegiatan
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/kegiatan` | Membuat kegiatan |
| GET | `/kegiatan` | Membaca seluruh kegiatan |
| GET | `/kegiatan?status=berjalan` | Filter status dengan nilai sama persis |
| GET | `/kegiatan?sort=anggaran` | Urutkan anggaran menaik |
| GET | `/kegiatan?status=berjalan&sort=anggaran` | Gabungan filter dan sorting |
| GET | `/kegiatan/:id` | Membaca satu kegiatan dan populate Ormawa |

Contoh body POST:
```json
{
  "kodeKegiatan": "KGT-01",
  "nama": "Contoh Kegiatan",
  "anggaran": 1000000,
  "status": "rencana",
  "penanggungJawab": { "nama": "Contoh Nama", "nim": "2428240116" },
  "ormawaId": "ISI_DENGAN_OBJECTID_ORMAWA"
}
```

Field tambahan di luar tabel Topik 32 pada body POST Kegiatan akan diabaikan. `createdAt` otomatis berisi waktu pembuatan jika tidak dikirim.

## Struktur proyek
```text
uts-paw2-naufalsamihnajasyi/
├── app.js
├── package.json
├── .env.example
├── .gitignore
├── controllers/
│   ├── kegiatanController.js
│   └── ormawaController.js
├── middlewares/
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   ├── kegiatanModel.js
│   └── ormawaModel.js
└── routes/
    ├── kegiatanRoutes.js
    └── ormawaRoutes.js
```
