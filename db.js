// Import Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });
var db = mongoose.connection;