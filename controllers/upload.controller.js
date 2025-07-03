const path = require('path');

const uploadFile = (req, res) => {
  console.log('req.files:', req.files);

  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: 'Nie przeslano zadnego pliku' });
  }

  const file = req.files.photo;
  const fileName = path.basename(file.path);

  res.status(200).json({ filename: fileName });
};

module.exports = {
  uploadFile,
};
