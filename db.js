// Import Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://madhavd:sbQwGR2BYIWtlPmU@cluster0.gq8vn.mongodb.net/test', { useNewUrlParser: true });
var db = mongoose.connection;