const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bulletinApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Połączono z MongoDB');
  } catch (err) {
    console.error('❌ Błąd połączenia z MongoDB:', err.message);
  }
};

module.exports = connectDB;
