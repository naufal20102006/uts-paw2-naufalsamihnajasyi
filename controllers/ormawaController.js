const Ormawa = require('../models/ormawaModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.create = async (req, res) => {
  // Hanya menerima field yang ditentukan pada soal.
  const { kode, nama } = req.body;
  const data = await Ormawa.create({ kode, nama });
  res.status(201).json(data);
};

exports.getAll = async (req, res) => {
  const data = await Ormawa.find();
  res.status(200).json(data);
};

exports.getById = async (req, res) => {
  const data = await Ormawa.findById(req.params.id);
  if (!data) throw errorHttp(404, 'Data Ormawa tidak ditemukan');
  res.status(200).json(data);
};
