const mongoose = require('mongoose');

const penanggungJawabSchema = new mongoose.Schema({
  nama: { type: String, trim: true },
  nim: { type: String, trim: true },
}, { _id: false });

const kegiatanSchema = new mongoose.Schema({
  kodeKegiatan: {
    type: String,
    required: [true, 'kodeKegiatan wajib diisi'],
    unique: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true,
  },
  anggaran: {
    type: Number,
    required: [true, 'anggaran wajib diisi'],
    min: [0, 'anggaran minimal 0'],
  },
  status: {
    type: String,
    required: [true, 'status wajib diisi'],
    trim: true,
  },
  penanggungJawab: {
    type: penanggungJawabSchema,
    required: [true, 'penanggungJawab wajib diisi'],
  },
  ormawaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ormawa',
    required: [true, 'ormawaId wajib diisi'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('Kegiatan', kegiatanSchema);
