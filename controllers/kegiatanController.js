const Kegiatan = require('../models/kegiatanModel');
const Ormawa = require('../models/ormawaModel');
const { errorHttp } = require('../middlewares/errorHandler');

const FIELD_UTAMA = [
  'kodeKegiatan', 'nama', 'anggaran', 'status',
  'penanggungJawab', 'ormawaId', 'createdAt',
];

exports.create = async (req, res) => {
  // Field di luar tabel topik diabaikan.
  const payload = {};
  for (const field of FIELD_UTAMA) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      payload[field] = req.body[field];
    }
  }

  // Pastikan Ormawa yang direferensikan memang tersedia.
  const ormawa = await Ormawa.findById(payload.ormawaId);
  if (!ormawa) throw errorHttp(400, 'ormawaId tidak ditemukan');

  const data = await Kegiatan.create(payload);
  res.status(201).json(data);
};

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.status !== undefined) {
    filter.status = req.query.status;
  }

  let query = Kegiatan.find(filter);

  // anggaran merupakan field angka pada model utama.
  if (req.query.sort !== undefined) {
    if (req.query.sort !== 'anggaran') {
      throw errorHttp(400, 'Parameter sort hanya mendukung anggaran');
    }
    query = query.sort({ [req.query.sort]: 1 });
  }

  const data = await query;
  res.status(200).json(data);
};

exports.getById = async (req, res) => {
  const data = await Kegiatan.findById(req.params.id)
    .populate('ormawaId', 'kode nama');
  if (!data) throw errorHttp(404, 'Data kegiatan tidak ditemukan');
  res.status(200).json(data);
};
