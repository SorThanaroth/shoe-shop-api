const mongoose = require('mongoose');

module.exports = async () => {
  try {
    // mongodb://localhost:27017/e_commerce
    await mongoose.connect('mongodb+srv://sorthanaroth018_db_user:j6LnYUv5Umr1gB1e@cluster0.mbol6gv.mongodb.net/?appName=Cluster0', {
      autoIndex: true,
      serverSelectionTimeoutMS: 30000 // default 30 seconds
    });
    console.log("MongoDB connected~");
  } catch (err) {
    console.log("Mongoose: ",err);
  }
}
