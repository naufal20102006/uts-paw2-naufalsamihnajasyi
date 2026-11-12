function errorHttp(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function notFoundHandler(req, res) {
  res.status(404).json({
    message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
}

function errorHandler(err, req, res, next) {
  // Body JSON tidak dapat diparsing.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // Nilai unik bertabrakan.
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Kode sudah digunakan' });
  }

  // ID MongoDB salah format: jangan tampilkan nama model.
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID atau referensi tidak valid' });
  }

  // Pelanggaran validasi schema.
  if (err.name === 'ValidationError') {
    const detail = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({
      message: 'Data tidak valid',
      detail,
    });
  }

  const status = err.status || 500;
  if (status >= 500) {
    console.error(err.message);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }

  return res.status(status).json({ message: err.message });
}

module.exports = { errorHttp, notFoundHandler, errorHandler };
