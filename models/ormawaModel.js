const mongoose = require('mongoose');

const ormawaSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'kode wajib diisi'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('Ormawa', ormawaSchema);
