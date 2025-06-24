const uploadFile = (req, res) => {
  console.log('req.files:', req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'Nie przeslano zadnego pliku' });
  }

  const file = req.files.file;
  const fileName = file.newFilename;

  res.status(200).json({ filename: fileName });
};

module.exports = {
  uploadFile,
};