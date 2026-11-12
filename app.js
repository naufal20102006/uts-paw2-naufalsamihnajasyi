require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const kegiatanRoutes = require('./routes/kegiatanRoutes');
const ormawaRoutes = require('./routes/ormawaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'RESTful API Organisasi Mahasiswa berjalan',
    topik: 32,
    endpoints: { kegiatan: '/kegiatan', ormawa: '/ormawa' },
  });
});

app.use('/kegiatan', kegiatanRoutes);
app.use('/ormawa', ormawaRoutes);

// Middleware 404 dan error harus didaftarkan paling akhir.
app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI belum diatur pada file .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
  console.error('Gagal terhubung ke MongoDB!');
  console.error('Nama error:', error.name);
  console.error('Pesan error:', error.message);

  if (error.reason && error.reason.servers) {
    for (const [address, server] of error.reason.servers) {
      console.error('Server:', address);
      console.error(
        'Penyebab:',
        server.error?.message || 'Tidak diketahui'
      );
    }
  }

  process.exit(1);
}
  
}

if (require.main === module) startServer();

module.exports = app;
